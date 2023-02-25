import Head from "next/head";
import styles from "../styles/Home.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

function Test() {
  const router = useRouter();
  const store = useLocalObservable(() => ({
    user: "",
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

  const { address } = useAccount();

  useEffect(() => {
    console.log(123);
    if (address) {
      store.user = address;
    } else {
      store.user = "";
    }
  }, [address]);
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: "16px" }}>
        <ConnectButton />
      </div>

      <div style={{ marginBottom: "16px" }}>Wallet Address:</div>
      <input
        value={store.user}
        onChange={(e) => (store.user = e.target.value)}
        style={{ marginBottom: "16px", width: "500px" }}
      ></input>
      <div style={{ marginBottom: "16px" }}>Token: {store.token}</div>
      <button onClick={() => store.mintNFT()}>Mint NFT</button>
    </div>
  );
}

export default observer(Test);
