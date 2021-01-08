import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/header";
import styles from "../../styles/Profile.module.css";
import { HiPencil } from "react-icons/hi";
import { BsCardText } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { colors } from "../../styles/colors";
import { useState } from "react";
import PostCard from "../../components/postCard";
import PostSmall from "../../components/postSmall";

export default function Profile() {
  const [tab, setTab] = useState<string>("posts");
  const router = useRouter();
  const { id } = router.query;
  const toggleTab = () => setTab("posts");
  return (
    <>
      <Head>
        <title>Profile: {id}</title>
      </Head>
      <Header />
      <div className={styles.mainDiv}>
        <div className={styles.top}>
          <img
            src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
            className={styles.profile_image}
          />
          <div className={styles.user_box}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className={styles.nickname}>DoritoWizard</span>
              <span
                className="custom_button"
                style={{ marginLeft: 8, padding: 2, height: 20 }}>
                <HiPencil size={14} />
              </span>
            </div>
            <span className={styles.description}>
              I like to program and watch movies
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
        {tab === "posts" ? (
          <div className={styles.posts_div}>
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
            <PostSmall />
          </div>
        ) : (
          <h3>likes</h3>
        )}
      </div>
    </>
  );
}
