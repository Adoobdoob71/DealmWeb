import Head from "next/head";
import Header from "../components/header";
import PostCard from "../components/postCard";
import styles from "../styles/Home.module.css";
import SideBar from "../components/sideBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home screen</title>
      </Head>
      <Header />
      <div className={styles.mainDiv}>
        <div className={styles.postsDiv}>
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <SideBar />
      </div>
    </>
  );
}
