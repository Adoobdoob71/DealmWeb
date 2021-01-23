import styles from "../styles/SideBarItem.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as firebase from "firebase";
import { User } from "../interfaces";

interface SideBarItemProps {
  userUID: string;
  nickname?: string;
  description?: string;
  profilePicture?: string;
  roomID: string;
  linkToProfile?: boolean;
  onClick?: () => void;
}

export default function SideBarItem(props: SideBarItemProps) {
  const [userDetails, setUserDetails] = useState<User | null>({ ...props });

  useEffect(() => {
    firebase.default
      .firestore()
      .collection("users")
      .doc(props.userUID)
      .get()
      .then((result) => {
        setUserDetails(result.data());
      });
  }, []);
  return props.linkToProfile ? (
    <Link href={"/profile/" + props.userUID}>
      <a>
        <div className={styles.side_bar_item}>
          <img
            src={userDetails.profilePicture}
            className={styles.profile_image}
          />
          <div className={styles.user_box}>
            <span className={styles.nickname}>{userDetails.nickname}</span>
            <span className={styles.description}>
              {userDetails.description}
            </span>
          </div>
          <Link href="/explore">
            <a>
              <span className="follow_button">Follow</span>
            </a>
          </Link>
        </div>
      </a>
    </Link>
  ) : (
    <a onClick={props.onClick}>
      <div className={styles.side_bar_item}>
        <img
          src={userDetails.profilePicture}
          className={styles.profile_image}
        />
        <div className={styles.user_box}>
          <span className={styles.nickname}>{userDetails.nickname}</span>
          <span className={styles.description}>{userDetails.description}</span>
        </div>
        <Link href="/explore">
          <a>
            <span className="follow_button">Follow</span>
          </a>
        </Link>
      </div>
    </a>
  );
}

export type { SideBarItemProps };
