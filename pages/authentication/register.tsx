import { useEffect, useState } from "react";
import { MdCheck, MdClose, MdChevronLeft } from "react-icons/md";
import { colors } from "../../styles/colors";
import styles from "../../styles/Register.module.css";
import * as Realm from "realm-web";
import Head from "next/head";
import Header from "../../components/header";
import * as firebase from "firebase";
import router from "next/router";
import { IconButton } from "@material-ui/core";

export default function Register() {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>("");
  const images = [
    "https://i.pinimg.com/originals/e3/dc/ab/e3dcab0829e56f4f1c9d58099f080de9.png",
    "https://i.pinimg.com/originals/76/f2/3e/76f23ef08dc1ebabf4589ca0daa1fc14.jpg",
    "https://i.pinimg.com/originals/8a/74/6d/8a746d8eb265ab3ef533fa491e93f8b4.jpg",
    "https://wallpaperstock.net/wallpapers/thumbs1/6898.jpg",
    "https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg",
    "https://media-cdn.tripadvisor.com/media/photo-s/0a/fc/ff/66/kayuputi-at-st-regis.jpg",
  ];

  useEffect(() => {
    setInterval(() => {
      setActiveImage(images[Math.floor(Math.random() * 6)]);
    }, 10000);
  }, []);

  const register = async () => {
    setLoading(true);
    try {
      let result = await firebase.default
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim());
      await firebase.default
        .firestore()
        .collection("users")
        .doc(result.user.uid)
        .set({
          nickname: nickname,
          online: true,
          description: "Default Description",
          email: email.trim(),
          lastOnline: "",
        });
      setLoading(false);
      router.back();
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <IconButton
        onClick={() => router.back()}
        style={{ marginBlock: 24, marginInline: "12vw" }}>
        <MdChevronLeft color={colors.text} size={24} />
      </IconButton>
      <div className={styles.main_div}>
        <div className={styles.form_div}>
          <span className={styles.title}>Dealm</span>
          <span className={styles.instruction}>Create account</span>
          <input
            inputMode="text"
            name="username"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="Nickname"
            className={styles.input}
          />
          <input
            inputMode="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className={styles.input}
          />
          <input
            inputMode="text"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className={styles.input}
          />
          <button
            className="custom_button"
            style={{
              marginTop: 16,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
            }}
            onClick={register}
            disabled={loading}>
            <MdCheck
              color={colors.text}
              size={16}
              style={{ marginRight: 12 }}
            />
            Submit
          </button>
        </div>
        <div
          className={styles.picture_div}
          style={{ backgroundImage: `url(${activeImage})` }}>
          <span className={styles.motto_text}>Explore the realm of Dealm</span>
          <div style={{ flex: 1 }}></div>
          <span className={styles.bottom_text}>Developed by Elad Mekonen</span>
        </div>
        {message && <span className="alert_message">{message}</span>}
      </div>
    </>
  );
}
