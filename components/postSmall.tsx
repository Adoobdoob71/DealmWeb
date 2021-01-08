import { IconButton } from "@material-ui/core";
import Link from "next/link";
import { useState } from "react";
import { Favorite, FavoriteBorder, MoreVert } from "@material-ui/icons";
import { colors } from "../styles/colors";
import styles from "../styles/PostSmall.module.css";

export default function PostSmall() {
  const [liked, setLiked] = useState<boolean>(false);
  return (
    <div className={styles.main_div}>
      {/* <img
        src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
        className={styles.image}
      /> */}
      <div className={styles.post_content}>
        <div className={styles.post_details}>
          <span className={styles.title}>Why I love pizza</span>
          <span className={styles.timestamp}>34 mins ago</span>
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
        <span className={styles.body}>
          Pizza is a delicious snack to finish your day after hard work, I
          really recommend it if you haven't tried it alreadyPizza is a
          delicious snack to finish your day after hard work, I really recommend
          it if you haven't tried it alreadyPizza is a delicious snack to finish
          your day after hard work, I really recommend it if you haven't tried
          it alreadyPizza is a delicious snack to finish your day after hard
          work, I really recommend it if you haven't tried it alreadyPizza is a
          delicious snack to finish your day after hard work, I really recommend
          it if you haven't tried it already
        </span>
        <span
          className={styles.likes}
          style={{ color: liked ? colors.like : undefined, marginTop: 8 }}>
          1,342 likes
        </span>
      </div>
    </div>
  );
}
