import { connectorsForWallets, DisclaimerComponent, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import {
    argentWallet,
    coinbaseWallet,
    imTokenWallet,
    injectedWallet,
    ledgerWallet,
    metaMaskWallet,
    omniWallet,
    rainbowWallet,
    trustWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import '@rainbow-me/rainbowkit/styles.css';
import { Chain, configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { ParticleNetwork } from '@particle-network/auth';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';

import { particleWallet } from '@particle-network/rainbowkit-ext';
import { rainbowMagicConnector } from '@/lib/rainbowMagicConnector';
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";



new ParticleNetwork({
    projectId: "6e9f1995-12bd-4fc7-bb4f-9ac5a17764c5",
    clientKey: "cXMAWBIWenpw7WK4QxLZC3RKgY3we61mTfEydAUh",
    appId: "a0ef3f11-e636-4f5f-9043-e7a28ba9369b",
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [publicProvider()]
);

const particleWallets = [
    particleWallet({ chains, authType: 'google', }),
];
const web3AuthInstance = new Web3Auth({
    clientId: "BHiQFiHO56SVUb3eZLjYt-0e0dlXDeIRnayA8ZKpSedUapfKuJrb9bMHqbAPn_xrZPLQEBMB24FjJ8etKdL0e6o",
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x" + chains[0].id.toString(16),
      rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol,
      blockExplorer: chains[0]?.blockExplorers.default?.url,
    },
    web3AuthNetwork: "testnet",
    authMode: "WALLET",


    
    uiConfig: {
         loginMethodsOrder: ["google", "twitter"],
         mode: "light",
         appName: "Webtree",
        primaryButton: "socialLogin",
        modalZIndex: "21474836460"
    }
  });
  
  const wagmiWeb3 = ({ chains }: { chains: Chain[] }) => ({
	id: "web3Auth",
	name: "Web3Auth",
	iconUrl: "https://web3auth.io/images/BrandLogo.png",
	iconBackground: "white",
	createConnector: () => ({
		// This can be replaced with the MagicConnectConnector if you want to use the Magic Connect flow
		connector: new Web3AuthConnector({
            chains,
            options: {
              web3AuthInstance,
              modalConfig: {
                [WALLET_ADAPTERS.OPENLOGIN]: {
                    label: "openlogin",
                    loginMethods: {
                    // Disable and sms_passwordless
                    sms_passwordless: {
                    name: "sms_passwordless",
                    showOnModal: false,
                    },

                }
              }
            
            },
            },
          }),
	}),
});



const popularWallets = {
    groupName: 'Popular',
    wallets: [
        ...particleWallets,
        wagmiWeb3({ chains }),
        rainbowMagicConnector({ chains, }),
        injectedWallet({ chains }),
        rainbowWallet({ chains, projectId: "e5b68846a895ba1454361f23780e981a" }),
        coinbaseWallet({ appName: 'webtreee', chains }),
        metaMaskWallet({ chains, projectId: "e5b68846a895ba1454361f23780e981a" }),
        walletConnectWallet({ chains, projectId: "e5b68846a895ba1454361f23780e981a" }),
    ],
};

const connectors = connectorsForWallets([
    popularWallets,

]);

const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

  
function WagmiProvider(props: any) {
    return (
        <>
            {config && (
                <WagmiConfig config={config}>
                    <RainbowKitProvider
                    appInfo={{
                        appName: 'Webtree',
                        
                    }}
                    modalSize='compact'
                    
                    chains={chains}>{props.children}</RainbowKitProvider>
                </WagmiConfig>
            )}
        </>
    );
}

export default WagmiProvider;