import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import Link from "next/link";
import styles from "../styles/SideBar.module.css";
import { colors } from "../styles/colors";
import SideBarItem, { SideBarItemProps } from "./sideBarItem";
import * as firebase from "firebase";
import { useState, useEffect, Component } from "react";
import { User, Contact } from "../interfaces";

interface state {
  loading: boolean;
  recommendedUsers: SideBarItemProps[];
}
export default class SideBar extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      recommendedUsers: [],
    };
  }

  fetchRecommendedUsers = async () => {
    const user = await firebase.default.auth().currentUser;
    this.setState({ loading: true, recommendedUsers: [] });
    if (user) {
      try {
        const result = await firebase.default
          .firestore()
          .collection("users")
          .doc(user.uid)
          .collection("contacts")
          .get();
        let contactsResult = result.docs as firebase.default.firestore.QueryDocumentSnapshot<Contact>[];
        let randomizedFriendIndex = Math.floor(
          Math.random() * contactsResult.length - 1
        );
        if (contactsResult[randomizedFriendIndex].data().userUID === user.uid)
          randomizedFriendIndex++;
        const contactData = await firebase.default
          .firestore()
          .collection("users")
          .doc(contactsResult[randomizedFriendIndex].data().userUID)
          .collection("contacts")
          .get();
        let contactDetails = contactData.docs as firebase.default.firestore.QueryDocumentSnapshot<Contact>[];
        contactDetails.forEach(async (item_two) => {
          const friendOfFriendData = await firebase.default
            .firestore()
            .collection("users")
            .doc(item_two.data().userUID)
            .get();
          const friendOfFriend = friendOfFriendData.data() as SideBarItemProps;
          friendOfFriend.roomID = item_two.data().roomID;
          if (friendOfFriend.userUID === user.uid) return;
          this.setState({
            recommendedUsers: [...this.state.recommendedUsers, friendOfFriend],
          });
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.fetchRecommendedUsers();
  }

  render() {
    return (
      <div className={styles.sideBar}>
        <div className={styles.top}>
          <span className={styles.description}>Might be interested</span>
          <IconButton onClick={() => {}}>
            <MoreVert htmlColor={colors.text} />
          </IconButton>
        </div>
        <div className={styles.middle}>
          {this.state.recommendedUsers.map((item, index) => (
            <SideBarItem {...item} key={index} linkToProfile={true} />
          ))}
        </div>
        <div className={styles.bottom} onClick={this.fetchRecommendedUsers}>
          <span className={styles.show_more}>Reload</span>
        </div>
      </div>
    );
  }
}
