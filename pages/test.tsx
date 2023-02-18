import Head from "next/head";
import styles from "../styles/Home.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Test() {
  const router = useRouter();
  const store = useLocalObservable(() => ({
    user: "0xdc04F179e51a3CE2CB89aa78fdf0469378FCe033",
    token: "",
    async mintNFT() {
      try {
        const res = await axios.post(
          process.env["NEXT_PUBLIC_MINTNFT_WEBHOOK"],
          {
            user: store.user,
            token: store.token,
          }
        );
        if (res.data.ok) {
          alert("Minted NFT successfully");
        }
      } catch (error) {
        alert("Mint NFT failed: " + error.response?.data?.message);
      }
    },
  }));

  useEffect(() => {
    store.token = router.query.token as string;
  }, [router]);

  return (
    <div className={styles.container}>
      <div>
        Wallet Address:
        <input
          value={store.user}
          onChange={(e) => (store.user = e.target.value)}
        ></input>
      </div>
      <div>Token: {store.token}</div>
      <button onClick={() => store.mintNFT()}>Mint NFT</button>
    </div>
  );
}

export default observer(Test);
