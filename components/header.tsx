import styles from "../styles/Header.module.css";
import { Explore, ExploreOutlined, Search } from "@material-ui/icons";
import { colors } from "../styles/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiHomeLine, RiHomeFill } from "react-icons/ri";
import { BsPersonFill, BsPerson } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { useEffect, useState } from 'react';
import { Modal, Popover } from '@material-ui/core';
import * as firebase from 'firebase';
import { User } from '../interfaces';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<firebase.default.User | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [showCreatePostWindow, setShowCreatePostWindow] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchUser = async () => {
    let result: firebase.default.User = await firebase.default.auth().currentUser;
    setUser(result);
    if (result != null){
      let data = await firebase.default.firestore().collection("users").doc(result.uid).get();
      let processedData = data.data() as User;
      setUserDetails(processedData);
    }
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
          <a className={styles.profile_button_background} onClick={event => {
            setAnchorEl(event.currentTarget);
            setShowUserMenu(true);
          }}>
            <BsPerson
              color={colors.text}
              size={18}
              className={styles.header_button}
            />
          </a>
        </div>
        <Popover
          open={showUserMenu}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
            setShowUserMenu(false);
          }}>
          <div className={styles.menu_popup}>
            {userDetails ? (
              <Link href={"/profile/" + user.uid}>
                <a>
                  <div className={styles.user_box}>
                    <img src={userDetails.profilePicture} className={styles.user_box_profile_picture} />
                    <div className={styles.user_box_user_data}>
                      <span className={styles.user_box_nickname}>{userDetails.nickname}</span>
                      <span className={styles.user_box_description}>{userDetails.description}</span>
                    </div>
                  </div>
                </a>
              </Link>  
              ) : (
                <div style={{ padding: 10 }}>
                  <span>Signed out</span>
                </div>
            )}
            <div className={styles.menu_options}>
              <div className={styles.menu_options_button}>
                <span className={styles.menu_options_button_text}>Settings</span>
              </div>
              <Link href={user ? "/" : "/authentication"}>
                <a>
                  <div className={styles.menu_options_button}>
                    <span className={styles.menu_options_button_text}>{user ? "Sign out" : "Sign in"}</span>
                  </div>
                </a>
              </Link>
            </div>    
          </div>
        </Popover>
      </div>
    </div>
  );
}
