import styles from "../styles/Message.module.css";
import * as firebase from "firebase";

interface MessageProps {
  userUID: string;
  text: string;
  imageUrl?: string;
  time: firebase.default.firestore.Timestamp;
}

export default function MessageItem(props: MessageProps) {
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
    <div
      className={
        firebase.default.auth().currentUser.uid === props.userUID
          ? styles.main_div
          : styles.main_div_guest
      }
      style={{
        backgroundColor:
          firebase.default.auth().currentUser.uid === props.userUID
            ? undefined
            : "#5555ff",
      }}>
      <div className={styles.message_bubble}>
        <span
          className={styles.message_text}
          style={{
            color:
              firebase.default.auth().currentUser.uid === props.userUID
                ? "#000000"
                : "#FFFFFF",
          }}>
          {props.text}
        </span>
      </div>
      <span className={styles.timestamp}>{timestamp()}</span>
    </div>
  );
}

export type { MessageProps };
