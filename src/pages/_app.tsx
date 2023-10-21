import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    
    walletConnectProjectId: "e5b68846a895ba1454361f23780e981a",
      autoConnect: false,
    // Required
    appName: "webtree",
  }),
);

export const BE_URL = "https://reclaim-test.onrender.com/"

export default function App({ Component, pageProps }: AppProps) {
  return (
  <WagmiConfig config={config}>
  <ConnectKitProvider>
  <Component {...pageProps} />
  </ConnectKitProvider>
    </WagmiConfig>
  )
}
