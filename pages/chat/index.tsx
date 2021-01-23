import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import SideBarItem, { SideBarItemProps } from "../../components/sideBarItem";
import styles from "../../styles/Chat.module.css";
import { colors } from "../../styles/colors";
import { GrAttachment } from "react-icons/gr";
import { MdSend } from "react-icons/md";
import Head from "next/head";
import Header from "../../components/header";
import MessageItem, { MessageProps } from "../../components/messageItem";
import * as React from "react";
import * as firebase from "firebase";
import { Contact, User } from "../../interfaces";

interface state {
  contacts: firebase.default.firestore.QueryDocumentSnapshot<Contact>[];
  activeContactRoomID: string | null;
  activeContactUID: string | null;
  activeContactUserDetails: User | null;
  messages: firebase.default.firestore.QueryDocumentSnapshot<MessageProps>[];
  text: string;
  userDetails: User | null;
}

export default class Chat extends React.Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      contacts: [],
      activeContactRoomID: null,
      activeContactUID: null,
      messages: [],
      activeContactUserDetails: null,
      text: "",
      userDetails: null,
    };
  }

  unsub: any;

  messageHandler = () => {
    this.unsub = firebase.default
      .firestore()
      .collection("rooms")
      .doc(this.state.activeContactRoomID)
      .collection("messages")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        let msgs = snapshot.docs as firebase.default.firestore.QueryDocumentSnapshot<MessageProps>[];
        this.setState({ messages: msgs });
      });
  };

  loadContacts = async () => {
    let user = await firebase.default.auth().currentUser;
    let result = await firebase.default
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("contacts")
      .get();
    this.setState({
      contacts: result.docs as firebase.default.firestore.QueryDocumentSnapshot<Contact>[],
    });
  };

  loadActiveContactDetails = async () => {
    let result = await firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.activeContactUID)
      .get();
    this.setState({ activeContactUserDetails: result.data() as User });
  };

  changeChat = async (roomID: string, userUID: string) => {
    if (this.state.activeContactRoomID) this.unsub();
    await this.setState({
      activeContactRoomID: roomID,
      activeContactUID: userUID,
      messages: [],
    });
    this.loadActiveContactDetails();
    this.messageHandler();
  };

  loadUserDetails = async () => {
    let user = await firebase.default.auth().currentUser;
    let result = await firebase.default
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();
    this.setState({ userDetails: result.data() as User });
  };
  sendMessage = async () => {
    let message: MessageProps = {
      text: this.state.text,
      time: firebase.default.firestore.Timestamp.now(),
      userUID: this.state.userDetails.userUID,
      nickname: this.state.userDetails.nickname,
      profilePicture: this.state.userDetails.profilePicture,
    };
    await firebase.default
      .firestore()
      .collection("rooms")
      .doc(this.state.activeContactRoomID)
      .collection("messages")
      .add(message);
    this.setState({ text: "" });
  };

  componentDidMount() {
    this.loadUserDetails();
    this.loadContacts();
  }

  render() {
    return (
      <>
        <Head>
          <title>Chat Screen</title>
        </Head>
        <Header />
        <div className={styles.main_div}>
          <div className={styles.whole_window}>
            <div className={styles.chat_window}>
              <div className={styles.chat_window_top}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      this.state.activeContactUserDetails
                        ? this.state.activeContactUserDetails.profilePicture
                        : "https://images4.alphacoders.com/100/thumb-350-1008904.png"
                    }
                    className={styles.profile_image}
                  />
                  <div className={styles.user_box}>
                    <span className={styles.nickname}>
                      {this.state.activeContactUserDetails
                        ? this.state.activeContactUserDetails.nickname
                        : "DotWiz"}
                    </span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        className={styles.status_color}
                        style={{
                          backgroundColor: this.state.activeContactUserDetails
                            ? this.state.activeContactUserDetails.online
                              ? "#77ff77"
                              : "#757575"
                            : "#757575",
                        }}></div>
                      <span className={styles.status}>
                        {this.state.activeContactUserDetails
                          ? this.state.activeContactUserDetails.online
                            ? "Online"
                            : "Offline"
                          : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
                <IconButton onClick={() => {}}>
                  <MoreVert htmlColor={colors.text} fontSize="small" />
                </IconButton>
              </div>
              <div className={styles.chat_window_messages}>
                {this.state.activeContactRoomID ? (
                  this.state.messages.map((item, index) => (
                    <MessageItem {...item.data()} key={index} />
                  ))
                ) : (
                  <div></div>
                )}
              </div>
              <div className={styles.chat_window_bottom}>
                {/* <a style={{ display: "flex", alignItems: "center" }}>
                  <GrAttachment color={colors.accent} size={16} />
                </a> */}
                <input
                  type="text"
                  className={styles.chat_window_text_box}
                  placeholder="Say something..."
                  value={this.state.text}
                  onChange={(event) =>
                    this.setState({ text: event.target.value })
                  }
                />
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={this.sendMessage}>
                  <MdSend color={colors.primary} size={18} />
                </a>
              </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.contacts_window}>
              <div className={styles.contacts_top}>
                <span className={styles.contacts_top_title}>Your contacts</span>
              </div>
              <div className={styles.contacts_rest}>
                {this.state.contacts.map((item, index) => (
                  <SideBarItem
                    {...item.data()}
                    key={index}
                    linkToProfile={false}
                    onClick={() =>
                      this.changeChat(item.data().roomID, item.data().userUID)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
