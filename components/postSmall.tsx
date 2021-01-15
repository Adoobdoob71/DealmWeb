import { IconButton } from "@material-ui/core";
import Link from "next/link";
import { useState } from "react";
import { Favorite, FavoriteBorder, MoreVert } from "@material-ui/icons";
import { colors } from "../styles/colors";
import styles from "../styles/PostSmall.module.css";
import { Post } from "../interfaces";
import * as firebase from "firebase";

export default function PostSmall(props: Post) {
  const [liked, setLiked] = useState<boolean>(false);

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
    <div className={styles.main_div}>
      {/* <img
        src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
        className={styles.image}
      /> */}
      <div className={styles.post_content}>
        <div className={styles.post_details}>
          <span className={styles.title}>{props.title}</span>
          <span className={styles.timestamp}>{timestamp()}</span>
          <div style={{ flex: 1 }}></div>
          <IconButton onClick={() => setLiked(!liked)}>
            {liked ? (
              <Favorite htmlColor={colors.like} fontSize="small" />
            ) : (
              <FavoriteBorder htmlColor={colors.like} fontSize="small" />
            )}
          </IconButton>
          <IconButton>
            <MoreVert htmlColor={colors.text} fontSize="small" />
          </IconButton>
        </div>
        <span className={styles.body}>{props.body}</span>
        <span
          className={styles.likes}
          style={{ color: liked ? colors.like : undefined, marginTop: 8 }}>
          1,342 likes
        </span>
      </div>
    </div>
  );
}
