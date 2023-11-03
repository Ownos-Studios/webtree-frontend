// Import the MagicAuthConnector from the wagmi-magic-connector package
import { MagicAuthConnector } from "@magiclabs/wagmi-connector";
import { Chain } from "wagmi";

// Define the rainbowMagicConnector function that will be used to create the Magic connector
export const rainbowMagicConnector = ({ chains }: { chains: Chain[] }) => ({
	id: "magic",
	name: "Magic",
	iconUrl: "https://svgshare.com/i/pXA.svg",
	iconBackground: "white",
	createConnector: () => ({
		// This can be replaced with the MagicConnectConnector if you want to use the Magic Connect flow
		connector: new MagicAuthConnector({
			chains,
			options: {
				apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
				oauthOptions: {
					providers: ["google",],
				},
				isDarkMode: true,
				magicSdkConfiguration: {
					network: {
						rpcUrl: "https://rpc.ankr.com/eth",
						chainId: 1,
					},
				},
			},
		}),
	}),
});