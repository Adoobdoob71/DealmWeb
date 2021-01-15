import { IconButton } from "@material-ui/core";
import {
  ChevronRight,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "../styles/Post.module.css";
import { colors } from "../styles/colors";
import Link from "next/link";
import { Post } from "../interfaces";
import * as firebase from "firebase";

export default function PostCard(props: Post) {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLike = () => setLiked(!liked);

  const timestamp = () => {
    let differenceInMins =
      (firebase.default.firestore.Timestamp.now().toMillis() -
        props.time.toMillis()) /
      60000;
    let smallerThan60: boolean = differenceInMins < 60;
    let smallerThan1400: boolean = differenceInMins < 1440;
    if (smallerThan60) return differenceInMins.toFixed(0) + " mins ago";
    if (smallerThan1400)
      return (differenceInMins / 60).toFixed(0) + " hours ago";
    return (differenceInMins / 1440).toFixed(0) + " days ago";
  };
  return (
    <div className={styles.card} style={{ backgroundColor: colors.surface }}>
      <div className={styles.top}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={toggleLike}>
            {liked ? (
              <Favorite htmlColor={colors.like} />
            ) : (
              <FavoriteBorder htmlColor={colors.like} />
            )}
          </IconButton>
          <div className={styles.post_details}>
            <span
              className={styles.likes}
              style={{ color: liked ? colors.like : undefined }}>
              1,423 likes
            </span>
            <span className={styles.timestamp}>{timestamp()}</span>
          </div>
        </div>
        <IconButton onClick={() => {}}>
          <MoreVert htmlColor={colors.text} />
        </IconButton>
      </div>
      <div className={styles.middle}>
        <div className={styles.middle_bar}>
          <span className={styles.title}>{props.title}</span>
          <span className={styles.read_more_button}>
            <ChevronRight htmlColor={colors.placeholder} fontSize="small" />
          </span>
        </div>
        <span className={styles.body}>{props.body}</span>
        <img src={props.imageUrl} className={styles.image} />
      </div>
      <div className={styles.bottom}>
        <Link href={"/profile/" + props.userUID}>
          <a className={styles.user_box}>
            <img src={props.profilePicture} className={styles.profile_image} />
            <span className={styles.nickname}>{props.nickname}</span>
          </a>
        </Link>
        <Link href="/explore">
          <a>
            <span className="follow_button">Follow</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
