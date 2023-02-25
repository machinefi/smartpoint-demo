import Head from "next/head";
import styles from "../styles/Home.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import axios from "axios";
import { useEffect } from "react";

function Home() {
  const store = useLocalObservable(() => ({
    img: "",
    async getQRCode() {
      const res = await axios.get(process.env["NEXT_PUBLIC_QRCODE_WEBHOOK"]);
      store.img = res.data.data;
    },
  }));

  useEffect(() => {
    store.getQRCode();
  }, []);

  return (
    <div className={styles.container}>
      <img src={store.img} />
      <button onClick={store.getQRCode}>Load QRCode</button>
    </div>
  );
}

export default observer(Home);
