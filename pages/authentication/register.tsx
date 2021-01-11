import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { colors } from "../../styles/colors";
import styles from "../../styles/Register.module.css";
import * as Realm from "realm-web";
import Head from "next/head";
import Header from "../../components/header";
import * as firebase from "firebase";
import router from "next/router";

export default function Register() {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      <Header />
      <div className={styles.main_div}>
        <span className={styles.title}>Register to Dealm</span>
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
          <MdCheck color={colors.text} size={16} style={{ marginRight: 12 }} />
          Submit
        </button>
        {message && <span className="alert_message">{message}</span>}
      </div>
    </>
  );
}
