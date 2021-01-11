import "../styles/globals.css";
import * as firebase from "firebase";

let firebaseConfig = {
  apiKey: "AIzaSyChey4oljhd6lxuyd_VfbvFcPW6MwfZPTE",
  authDomain: "dealm-85e42.firebaseapp.com",
  projectId: "dealm-85e42",
  storageBucket: "dealm-85e42.appspot.com",
  messagingSenderId: "891093598191",
  appId: "1:891093598191:web:18777dd9d7de0bb5ce001a",
  measurementId: "G-LVPRQYHN21",
};

if (firebase.default.apps.length === 0)
  firebase.default.initializeApp(firebaseConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
