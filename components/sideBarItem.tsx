import styles from "../styles/SideBarItem.module.css";
import Link from "next/link";

interface SideBarItem {
  userUID: string;
  nickname: string;
  description: string;
  profilePicture: string;
}

export default function SideBarItem(props: SideBarItem) {
  return (
    <Link href={"/profile/" + props.userUID}>
      <a>
        <div className={styles.side_bar_item}>
          <img src={props.profilePicture} className={styles.profile_image} />
          <div className={styles.user_box}>
            <span className={styles.nickname}>{props.nickname}</span>
            <span className={styles.description}>{props.description}</span>
          </div>
          <Link href="/explore">
            <a>
              <span className="follow_button">Follow</span>
            </a>
          </Link>
        </div>
      </a>
    </Link>
  );
}
