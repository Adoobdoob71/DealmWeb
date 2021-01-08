import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import SideBarItem from "../../components/sideBarItem";
import styles from "../../styles/Chat.module.css";
import { colors } from "../../styles/colors";
import { GrAttachment } from "react-icons/gr";
import { MdSend } from "react-icons/md";
import Head from "next/head";
import Header from "../../components/header";
import MessageItem from "../../components/messageItem";

export default function Chat() {
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
                  src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
                  className={styles.profile_image}
                />
                <div className={styles.user_box}>
                  <span className={styles.nickname}>DotWiz</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={styles.status_color}></div>
                    <span className={styles.status}>Online</span>
                  </div>
                </div>
              </div>
              <IconButton onClick={() => {}}>
                <MoreVert htmlColor={colors.text} fontSize="small" />
              </IconButton>
            </div>
            <div className={styles.chat_window_messages}>
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
              <MessageItem />
            </div>
            <div className={styles.chat_window_bottom}>
              <a style={{ display: "flex", alignItems: "center" }}>
                <GrAttachment color={colors.accent} size={16} />
              </a>
              <input
                type="text"
                className={styles.chat_window_text_box}
                placeholder="Say something..."
              />
              <a style={{ display: "flex", alignItems: "center" }}>
                <MdSend color={colors.primary} size={16} />
              </a>
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.contacts_window}>
            <div className={styles.contacts_top}>
              <span className={styles.contacts_top_title}>Your contacts</span>
            </div>
            <div className={styles.contacts_rest}>
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
              <SideBarItem />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
