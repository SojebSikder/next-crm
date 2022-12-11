import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Meta from "../../../../components/header/Meta";
import Dialog from "../../../../components/reusable/Dialog";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
import { DateHelper } from "../../../../helper/date.helper";
import { CountryService } from "../../../../service/country/country.service";
import { ContactService } from "../../../../service/space/ContactService";
import { ConversationService } from "../../../../service/space/ConversationService";
import { MessageService } from "../../../../service/space/MessageService";
import { WorkspaceChannelService } from "../../../../service/space/WorkspaceChannelService";
import { WorkspaceUserService } from "../../../../service/space/WorkspaceUserService";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;
  const conversation_id = query.conversation_id;

  // get conversation
  const res_conversations = await ConversationService.findAll(
    workspace_id,
    context
  );
  const conversations = res_conversations.data.data;
  // get messages
  const res_messages = await MessageService.findAll(
    workspace_id,
    conversation_id,
    context
  );
  const messageDatas = res_messages.data.data;
  // get workspace channel
  const res_workspace_channels = await WorkspaceChannelService.findAll(
    workspace_id,
    context
  );
  const workspace_channels = res_workspace_channels.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      conversation_id: conversation_id,
      conversations: conversations,
      messageDatas: messageDatas,
      workspace_channels: workspace_channels,
    },
  };
};

const socket = io(AppConfig().app.url);
export default function Message({
  workspace_id,
  conversation_id,
  conversations,
  messageDatas,
  workspace_channels,
}: {
  workspace_id: string;
  conversation_id: string;
  conversations: [];
  messageDatas: any;
  workspace_channels: any;
}) {
  const router = useRouter();

  const [messages, setMessages] = useState(messageDatas);
  const [workspaceChannelId, setWorkspaceChannelId] = useState(
    workspace_channels.length > 0 ? workspace_channels[0].id : 0
  );
  const [showDialog, setShowDialog] = useState(false);

  const handleWorkspaceChannelIdChange = (e: any) => {
    setWorkspaceChannelId(e.target.value);
  };

  const handleDialog = () => {
    setShowDialog(true);
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    const body_text = e.target.body_text.value;
    const workspace_channel_id = workspaceChannelId;

    const data = {
      body_text: body_text,
      workspace_channel_id: workspace_channel_id,
      conversation_id: conversation_id,
      workspace_id: workspace_id,
    };
    try {
      const messageService = await MessageService.create(data);

      setMessages((state: any) => [...state, messageService.data.data]);
    } catch (error: any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        // setErrorMessage(error.response.data.message);
        // setLoading(false);
        console.log(error.response.data.message);
      } else {
        // setErrorMessage(error.message);
        // setLoading(false);
        console.log(error.message);
      }
    }
    // reset message box
    e.target.body_text.value = "";
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (message) => {
      setMessages((state: any) => [...state, message]);
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <div className="flex">
      <Meta title={`Message - ${AppConfig().app.name}`} />
      <Sidebar />
      <main className="mt-5 ml-[80px] flex justify-center h-screen">
        <div className="flex">
          <div className="w-[130px] border-solid border-[1px]">
            {conversations.map((conversation: any) => {
              return (
                <Link
                  key={conversation.id}
                  href={`/space/${workspace_id}/message/${conversation.id}`}
                >
                  <div
                    className="cursor-pointer bg-[#eeeeee] transition-all 
                    ease-linear hover:bg-[#a19e9e] h-[80px]"
                  >
                    <h5 className="m-4 font-[500]">
                      {conversation.contact.fname} {conversation.contact.lname}
                    </h5>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="ml-[150px] w-[430px] border-solid border-[1px]">
            <div className="flex flex-col">
              <div className="m-4 h-screen">
                <div className="flex flex-col">
                  {messages.map((msg: any) => {
                    if (msg.message_from_workspace) {
                      return (
                        <div
                          key={msg.id}
                          className="text-right m-2 p-3 rounded-md w-auto inline bg-gray-200"
                        >
                          {msg.body_text}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={msg.id}
                          className="m-2 p-3 rounded-md w-auto inline bg-gray-400"
                        >
                          {msg.body_text}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="m-4">
                <select
                  onChange={handleWorkspaceChannelIdChange}
                  className="input"
                  name="workspace_channel_id"
                >
                  {workspace_channels.map((channel: any) => {
                    return (
                      <option key={channel.id} value={channel.id}>
                        {channel.channel_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <form onSubmit={handleSendMessage} method="post">
                <div className="flex flex-row">
                  <div className="m-4 w-full">
                    <input
                      className="input"
                      type="text"
                      name="body_text"
                      placeholder="Message sojebsikder"
                    />
                  </div>
                  <div className="m-4">
                    <button type="submit" className="btn-primary">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
