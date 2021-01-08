import styles from "../styles/SideBarItem.module.css";
import Link from "next/link";

interface SideBarItem {
  userUID: string;
  nickname: string;
  description: string;
  profilePicture: string;
}

export default function SideBarItem() {
  return (
    <div className={styles.side_bar_item}>
      <img
        src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
        className={styles.profile_image}
      />
      <div className={styles.user_box}>
        <span className={styles.nickname}>DoritoWizard</span>
        <span className={styles.description}>
          I like to program and watch movies
        </span>
      </div>
      <Link href="/explore">
        <a>
          <span className="follow_button">Follow</span>
        </a>
      </Link>
    </div>
  );
}
