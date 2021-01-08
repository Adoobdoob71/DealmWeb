import styles from "../styles/Message.module.css";

interface MessageProps {
  userUID: string;
  text: string;
  imageUrl?: string;
  time: number;
}

export default function MessageItem() {
  return (
    <div className={styles.main_div}>
      <div className={styles.message_bubble}>
        {/* <img
          src="https://images4.alphacoders.com/100/thumb-350-1008904.png"
          className={styles.image}
        /> */}
        <span className={styles.message_text}>Well hello there!</span>
      </div>
      <span className={styles.timestamp}>2 mins ago</span>
    </div>
  );
}
