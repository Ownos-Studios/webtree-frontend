import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// import { WagmiConfig, createConfig } from "wagmi";
// import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  rainbowWallet,
  phantomWallet,
} from "@thirdweb-dev/react";



// const config = createConfig(
//   getDefaultConfig({
//     // Required API Keys
    
//     walletConnectProjectId: "e5b68846a895ba1454361f23780e981a",
//       autoConnect: false,
//     // Required
//     appName: "webtree",
//   }),
// );

export const BE_URL = "https://reclaim-test.onrender.com/"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
    activeChain="mumbai"
    clientId="60524bc2d86f1f8a359d3119262aae2b"
    supportedWallets={[
      metamaskWallet({ recommended: true}),
      coinbaseWallet({ recommended: false }),
      walletConnect({
        projectId: "e5b68846a895ba1454361f23780e981a"
      }),
      localWallet(),
      embeddedWallet(),
      rainbowWallet({ recommended: true }),
      phantomWallet({ recommended: true }),
    ]}
  >

  <Component {...pageProps} />
  </ThirdwebProvider>
  )
}
