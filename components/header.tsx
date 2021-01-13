import styles from "../styles/Header.module.css";
import { Explore, ExploreOutlined, Search } from "@material-ui/icons";
import { colors } from "../styles/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiHomeLine, RiHomeFill } from "react-icons/ri";
import { BsPersonFill, BsPerson } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { useEffect, useState } from 'react';
import * as firebase from 'firebase';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<firebase.default.User | null>(null);
  const fetchUser = async () => {
    let result: firebase.default.User = await firebase.default.auth().currentUser;
    setUser(result);
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.header} style={{ backgroundColor: colors.surface }}>
      <span style={{ fontSize: 24, color: colors.text }}>Dealm</span>
      <div className={styles.header_buttons}>
        <div style={{ marginRight: 21, height: 24 }}>
          <Link href="/">
            <a>
              {router.pathname === "/" ? (
                <RiHomeFill
                  color={colors.text}
                  size={24}
                  className={styles.header_button}
                />
              ) : (
                <RiHomeLine
                  color={colors.text}
                  size={24}
                  className={styles.header_button}
                />
              )}
            </a>
          </Link>
        </div>
        <div style={{ marginRight: 21, height: 24 }}>
          <Link href="/chat">
            <a>
              {router.pathname === "/chat" ? (
                <BsPersonFill
                  color={colors.text}
                  size={24}
                  className={styles.header_button}
                />
              ) : (
                <BsPerson
                  color={colors.text}
                  size={24}
                  className={styles.header_button}
                />
              )}
            </a>
          </Link>
        </div>
        <div style={{ marginRight: 21, height: 24 }}>
          <Link href="/explore">
            <a>
              {router.pathname === "/explore" ? (
                <Explore
                  fontSize="default"
                  htmlColor={colors.text}
                  className={styles.header_button}
                />
              ) : (
                <ExploreOutlined
                  fontSize="default"
                  htmlColor={colors.text}
                  className={styles.header_button}
                />
              )}
            </a>
          </Link>
        </div>
        <div style={{ height: 24, marginRight: 21 }}>
          <Link href="/search">
            <a>
              <Search
                htmlColor={colors.text}
                className={styles.header_button}
              />
            </a>
          </Link>
        </div>
        <div style={{ height: 24 }}>
          <Link href={user ? "/profile/" + user.uid : "/authentication"}>
            <a className={styles.profile_button_background}>
            <BsPerson
              color={colors.text}
              size={18}
              className={styles.header_button}
            />
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
