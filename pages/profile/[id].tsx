import Head from "next/head";
import Link from "next/link";
import Header from "../../components/header";
import styles from "../../styles/Profile.module.css";
import { HiPencil } from "react-icons/hi";
import { BsCardText } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { colors } from "../../styles/colors";
import { useState, Component } from "react";
import PostCard from "../../components/postCard";
import PostSmall from "../../components/postSmall";
import * as firebase from "firebase";
import { withRouter } from "next/router";
import { User, Post } from "../../interfaces";

interface state {
  posts: firebase.default.firestore.QueryDocumentSnapshot<Post>[];
  tab: string;
}

class Profile extends Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      // posts: props.posts_array,
      posts: [],
      tab: "posts",
    };
  }

  fetchPosts = async () => {
    let result = await firebase.default
      .firestore()
      .collection("users")
      .doc(this.props.router.query.id)
      .collection("posts")
      .limitToLast(10)
      .orderBy("time", "desc")
      .get();
    const posts_array = result.docs as firebase.default.firestore.QueryDocumentSnapshot<Post>[];
    this.setState({ posts: posts_array });
  };

  componentDidMount() {
    this.fetchPosts();
  }
  render() {
    const toggleTab = () =>
      this.setState({ tab: this.state.tab === "posts" ? "likes" : "posts" });
    return (
      <>
        <Head>
          <title>{this.props.nickname}'s Profile</title>
          <meta property="og:title" content="Dealm" />
          <meta
            property="og:title"
            content={this.props.nickname + "'s Profile"}
          />
          <meta property="og:url" content="" />
          <meta property="og:image" content={this.props.profilePicture} />
        </Head>
        <Header />
        <div className={styles.mainDiv}>
          <div className={styles.top}>
            <img
              src={
                this.props.profilePicture
                  ? this.props.profilePicture
                  : "https://images4.alphacoders.com/100/thumb-350-1008904.png"
              }
              className={styles.profile_image}
            />
            <div className={styles.user_box}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className={styles.nickname}>{this.props.nickname}</span>
                <span
                  className="custom_button"
                  style={{ marginLeft: 8, padding: 2, height: 20 }}>
                  <HiPencil size={14} />
                </span>
              </div>
              <span className={styles.description}>
                {this.props.description}
              </span>
            </div>
            <div className={styles.follow_details}>
              <div className={styles.follow_details_child}>
                <span className={styles.follow_details_title}>Following</span>
                <span className={styles.follow_details_number}>179</span>
              </div>
              <div className={styles.follow_details_child}>
                <span className={styles.follow_details_title}>Followers</span>
                <span className={styles.follow_details_number}>5,568</span>
              </div>
            </div>
          </div>
          <div className={styles.nav_bar}>
            <div className={styles.nav_bar_item} onClick={toggleTab}>
              <BsCardText color={colors.text} size={16} />
              <span className={styles.posts_tab}>Posts</span>
            </div>
            <div className={styles.nav_bar_item} onClick={toggleTab}>
              <MdFavoriteBorder color={colors.text} size={16} />
              <span className={styles.posts_tab}>Likes</span>
            </div>
          </div>
          {this.state.tab === "posts" ? (
            <div className={styles.posts_div}>
              {this.state.posts.map((item, index) => (
                <PostSmall {...item.data()} key={index} />
              ))}
            </div>
          ) : (
            <h3>likes</h3>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Profile);

export async function getServerSideProps(context) {
  let result = await firebase.default
    .firestore()
    .collection("users")
    .doc(context.params.id)
    .get();
  let user: User = result.data() as User;
  // let resultPosts = await firebase.default
  //   .firestore()
  //   .collection("users")
  //   .doc(context.params.id)
  //   .collection("posts")
  //   .limitToLast(10)
  //   .orderBy("time", "desc")
  //   .get();
  // const posts_array = resultPosts.docs as firebase.default.firestore.QueryDocumentSnapshot<Post>[];
  return {
    props: {
      ...user,
      // posts_array,
    },
  };
}
