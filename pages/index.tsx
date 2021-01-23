import Head from "next/head";
import Header from "../components/header";
import PostCard from "../components/postCard";
import styles from "../styles/Home.module.css";
import SideBar from "../components/sideBar";
import { Component } from "react";
import * as firebase from "firebase";
import { User, Contact, Post } from "../interfaces";

interface state {
  posts: firebase.default.firestore.QueryDocumentSnapshot<Post>[];
}

export default class Home extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  sortPosts = () => {
    this.state.posts.sort(
      (a, b) => a.data().time.nanoseconds - b.data().time.nanoseconds
    );
  };

  fetchPosts = async () => {
    let user = await firebase.default.auth().currentUser;
    if (user) {
      let result = await firebase.default
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("contacts")
        .get();
      let contactsData = result.docs as firebase.default.firestore.QueryDocumentSnapshot<Contact>[];
      contactsData.forEach(async (item) => {
        const recentPostsData = await firebase.default
          .firestore()
          .collection("users")
          .doc(item.data().userUID)
          .collection("posts")
          .limitToLast(5)
          .orderBy("time")
          .get();
        const recentPosts = recentPostsData.docs as firebase.default.firestore.QueryDocumentSnapshot<Post>[];
        this.setState({ posts: [...this.state.posts, ...recentPosts] });
      });
    }
    this.sortPosts();
  };

  componentDidMount() {
    this.fetchPosts();
  }
  render() {
    return (
      <>
        <Head>
          <title>Home screen</title>
        </Head>
        <Header />
        <div className={styles.mainDiv}>
          <div className={styles.postsDiv}>
            {this.state.posts.map((item, index) => (
              <PostCard {...item.data()} key={index} />
            ))}
          </div>
          <SideBar />
        </div>
      </>
    );
  }
}

// export async function getServerSideProps(context){
//   let user = await firebase.default.auth().currentUser;
//   const posts_array = [];
//   if (user){
//     let result = await firebase.default.firestore().collection("users").doc(user.uid).collection("contacts").get();
//     let contactsData = result.docs as firebase.default.firestore.QueryDocumentSnapshot<Contact>[];
//     for(const contact of contactsData){
//       try {
//         const recentPostsData = await firebase.default.firestore().collection("users").doc(contact.data().userUID).collection("posts").limitToLast(5).orderBy("time").get();
//         const recentPosts = recentPostsData.docs as firebase.default.firestore.QueryDocumentSnapshot<Post>[];
//         posts_array.push(recentPosts);
//       }catch(error){
//         console.error(error.message);
//       }
//     }
//   }
//   return {
//     props: {
//       posts: posts_array
//     }
//   }
// }
