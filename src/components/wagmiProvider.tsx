import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

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
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { ParticleNetwork } from '@particle-network/auth';
import { arbitrum, mainnet, optimism, polygon } from 'wagmi/chains';

import { particleWallet } from '@particle-network/rainbowkit-ext';

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
    particleWallet({ chains, authType: 'google' }),
    particleWallet({ chains, authType: 'facebook' }),
    particleWallet({ chains, authType: 'apple' }),
    particleWallet({ chains }),
];

const popularWallets = {
    groupName: 'Popular',
    wallets: [
        ...particleWallets,
        injectedWallet({ chains }),
        rainbowWallet({ chains, projectId: "e5b68846a895ba1454361f23780e981a" }),
        coinbaseWallet({ appName: 'RainbowKit demo', chains }),
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
                    <RainbowKitProvider chains={chains}>{props.children}</RainbowKitProvider>
                </WagmiConfig>
            )}
        </>
    );
}

export default WagmiProvider;