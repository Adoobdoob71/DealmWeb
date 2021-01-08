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

interface PostProps {
  userUID: string;
  title: string;
  body: string;
  imageUrl?: string;
}
export default function PostCard() {
  const [liked, setLiked] = useState<boolean>(false);

  const toggleLike = () => setLiked(!liked);
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
            <span className={styles.timestamp}>34 mins ago</span>
          </div>
        </div>
        <IconButton onClick={() => {}}>
          <MoreVert htmlColor={colors.text} />
        </IconButton>
      </div>
      <div className={styles.middle}>
        <div className={styles.middle_bar}>
          <span className={styles.title}>Why I like pizza</span>
          <span className={styles.read_more_button}>
            <ChevronRight htmlColor={colors.placeholder} fontSize="small" />
          </span>
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
        <img
          src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
          className={styles.image}
        />
      </div>
      <div className={styles.bottom}>
        <Link href="/profile/doritowizard">
          <a className={styles.user_box}>
            <img
              src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
              className={styles.profile_image}
            />
            <span className={styles.nickname}>DoritoWizard</span>
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
