//@ts-nocheck
import * as React from "react";
import protobuf from "protobufjs";
import {
  createLightNode,
  waitForRemotePeer,
  createDecoder,
  bytesToUtf8,
} from "@waku/sdk";

import { useAccount } from "wagmi";

const ContentTopic = "/toy-chat/2/huilong/proto";
const decoder = createDecoder(ContentTopic);

const ProtoChatMessage = new protobuf.Type("ChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("hello", 2, "string"))
  .add(new protobuf.Field("text", 3, "bytes"));

function App() {
  const [waku, setWaku] = React.useState(undefined);
  const [wakuStatus, setWakuStatus] = React.useState("None");
  const { address } = useAccount();
  const [messages, setMessages] = React.useState<any>([]);
  // set Messages in the local storage
        React.useEffect(() => {
        if (messages.length > 0) {
        localStorage.setItem("messages", JSON.stringify(messages));
        }
        }, [messages]);
        

        // load Messages from the local storage
        React.useEffect(() => {
        const messages = localStorage.getItem("messages");
        if (messages) {
        setMessages(JSON.parse(messages));
        }
        }
        , []);
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    if (wakuStatus !== "None") return;

    setWakuStatus("Starting");

    createLightNode({ defaultBootstrap: true }).then((waku) => {
      waku.start().then(() => {
        //@ts-ignore
        setWaku(waku);
        setWakuStatus("Connecting");
      });
    });
  }, [waku, wakuStatus]);

  React.useEffect(() => {
    if (!waku) return;

    // We do not handle disconnection/re-connection in this example
    if (wakuStatus === "Connected") return;

    waitForRemotePeer(waku, ["store"]).then(() => {
      // We are now connected to a store node
      setWakuStatus("Connected");
    });
  }, [waku, wakuStatus]);

  React.useEffect(() => {
    if (wakuStatus !== "Connected") return;

    (async () => {
      const startTime = new Date();
      // 7 days/week, 24 hours/day, 60min/hour, 60secs/min, 100ms/sec
      startTime.setTime(startTime.getTime() - 7 * 24 * 60 * 60 * 1000);

      // TODO: Remove this timeout once https://github.com/status-im/js-waku/issues/913 is done
      await new Promise((resolve) => setTimeout(resolve, 200));

      try {
        for await (const messagesPromises of waku.store.queryGenerator(
          [decoder],
          {
            timeFilter: { startTime, endTime: new Date() },
            pageDirection: "forward",
          }
        )) {
          const messages = await Promise.all(
            messagesPromises.map(async (p) => {
              const msg = await p;
              return decodeMessage(msg);
            })
          );

          setMessages((currentMessages) => {
            return currentMessages.concat(messages.filter(Boolean).reverse());
          });
        }
      } catch (e) {
        console.log("Failed to retrieve messages", e);
        setWakuStatus("Error Encountered");
      }
    })();
  }, [waku, wakuStatus]);

  return (
        <div className="flex flex-col w-full md:w-3/4 mx-auto min-h-screen gap-4">
     <Nav />
        <h2>{wakuStatus}</h2>
        <h3>Messages</h3>
        <ul>
          <Messages messages={messages} />
        </ul>
        <div className="flex flex-row gap-4">
        <input 
        
        onChange={(e) => {
                setText(e.target.value);
        }}
        value={text}
        type="text"
                className="border-2 border-black rounded-md p-2 w-full"
        />
        <button 
        onClick={() => {
                setMessages((currentMessages: any) => {
                        return currentMessages.concat({
                        text,
                        timestamp: new Date(),
                        nick: address && address?.length > 0 ? address?.slice(0, 6) : "Me",
                        });
                        });
                setText("");
        }}
        
        className="border-2 border-black rounded-md p-2">Send</button>
        </div>

    </div>
  );
}

export default App;

function decodeMessage(wakuMessage) {
  if (!wakuMessage.payload) return;

  const { timestamp, nick, text } = ProtoChatMessage.decode(
    wakuMessage.payload
  );

  if (!timestamp || !text || !nick) return;

  const time = new Date();
  time.setTime(Number(timestamp));

  const utf8Text = bytesToUtf8(text);

  return {
    text: utf8Text,
    timestamp: time,
    nick,
    timestampInt: wakuMessage.timestamp,
  };
}

function Messages(props) {
  return props.messages.map(({ text, timestamp, nick, timestampInt }) => {
    return (
      <li key={timestampInt}>
        ({formatDate(timestamp)}) {nick}: {text}
      </li>
    );
  });
}

function formatDate(timestamp) {
  return timestamp.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

const Nav = () => {
        return (
                <span className="flex mt-[25px] w-[1048px]  max-[512px]:px-2 max-[1070px]:w-full max-[1070px]:max-w-[500px] mx-auto mb-[36px]">
                <span className="flex justify-between w-full items-center">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="112"
                height="26"
                fill="none"
                viewBox="0 0 112 26"
              >
                <path
                  fill="#000"
                  d="M97.967 25.596V0h8.118v3.532h2.519v3.492h2.547v11.508h-2.547v3.532h-2.519v3.532h-8.118zm3.079-4.445h4.507V17.58h2.491V7.976h-2.491V4.484h-4.507v16.667zM83.922 25.596v-3.532h-2.519V3.532h2.52V0h8.116v3.532h2.547v7.937H91.48V4.484h-6.997v16.667h6.997v-7.103h3.107v8.016H92.04v3.532h-8.117zM70.724 25.596V11.469h-2.52V7.976h-2.518V0h3.079v7.024h2.49v3.571h2.016V7.024h2.491V0h3.107v7.976h-2.547v3.493h-2.52v14.127h-3.078zM49.969 25.596V3.532h2.519V0h3.05v4.484h-2.49v6.111h1.959V7.024h2.547V3.532h2.491V0h3.107v4.484h-2.547v3.492h-2.52v3.493H55.54v2.579h2.547v3.532h2.519v3.571h2.547v4.445h-3.107v-3.532h-2.49v-3.532h-2.548V15h-1.96v10.596H49.97zM35.923 25.596v-3.532h-2.519V3.532h2.52V0h8.117v3.532h2.547v7.937H43.48V4.484h-6.998v16.667h6.998v-7.103h3.107v8.016H44.04v3.532h-8.118zM22.443 25.596V21.15h2.52V4.484h-2.52V0h8.117v4.484h-2.547v16.667h2.547v4.445h-8.117zM3.368 25.596v-3.532H.85V0h3.08v21.151h1.959v-7.103h2.547V3.532h3.05v10.516h2.548v7.103h1.959V0h3.05v22.064h-2.49v3.532h-3.08v-3.532h-2.546V15h-1.96v7.064H6.42v3.532H3.37z"
                ></path>
              </svg>
              </span>
              </span>
        );
      };