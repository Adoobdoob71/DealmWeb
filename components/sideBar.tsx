import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import Link from "next/link";
import styles from "../styles/SideBar.module.css";
import { colors } from "../styles/colors";
import SideBarItem from "./sideBarItem";

export default function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.top}>
        <span className={styles.description}>Might be interested</span>
        <IconButton onClick={() => {}}>
          <MoreVert htmlColor={colors.text} />
        </IconButton>
      </div>
      <div className={styles.middle}>
        <SideBarItem />
        <SideBarItem />
        <SideBarItem />
      </div>
      <div className={styles.bottom}>
        <span className={styles.show_more}>More</span>
      </div>
    </div>
  );
}
