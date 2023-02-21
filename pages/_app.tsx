import "../styles/globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { iotex, iotexTestnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';

const { chains, provider, webSocketProvider } = configureChains(
  [iotex, iotexTestnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: 'My IoTeX App',
//   chains,
// });

const connectors = connectorsForWallets([
  {
    groupName: 'WalletConnect',
    wallets: [
      metaMaskWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  connectors
})


function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
