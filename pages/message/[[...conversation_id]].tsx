import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import AppHeader from "../../components/header/app/Header";
import Meta from "../../components/header/Meta";
import Dialog from "../../components/reusable/Dialog";
import Sidebar from "../../components/sidebar/Sidebar";
import { AppConfig } from "../../config/app.config";
import { DateHelper } from "../../helper/date.helper";
import { getUser } from "../../hooks/useUser";
import { CountryService } from "../../service/country/country.service";
import { ContactService } from "../../service/space/contact.service";
import { ConversationService } from "../../service/space/conversation.service";
import { MessageService } from "../../service/space/message.service";
import { WorkspaceChannelService } from "../../service/space/workspaceChannel.service";
import { WorkspaceUserService } from "../../service/space/workspaceUser.service";
import { PopupMenu, PopupMenuItem } from "../../components/reusable/PopupMenu";
import Accordion from "../../components/reusable/Accordion";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  // const workspace_id = query.workspace_id;
  // const organization_id = query.organization_id;

  let queries = query.conversation_id ? query.conversation_id : null;
  let workspace_id = queries && queries[0] ? queries[0] : null;
  let workspace_channel_id = queries && queries[1] ? queries[1] : null;
  let conversation_id = queries && queries[2] ? queries[2] : null;

  // get user details
  const userDetails = await getUser(context);
  let workspace_users = [];
  if (userDetails) {
    workspace_users = userDetails.workspace_users;
  }

  // get conversation
  // const res_conversations = await ConversationService.findAll(
  //   workspace_id,
  //   context
  // );
  // const conversations = res_conversations.data.data;
  let conversations = [];
  let messageDatas = [];
  let workspace_channels = [];

  if (workspace_users.length > 0) {
    if (workspace_channel_id) {
      // get conversation
      const resConversations = await ConversationService.findAll(
        workspace_channel_id,
        workspace_id,
        context
      );
      conversations = resConversations.data;
    }

    // conversations = workspace_users[0].workspace.conversations;
    // workspace_id = workspace_users[0].workspace.id;

    // get messages
    let res_messages;
    if (conversation_id) {
      res_messages = await MessageService.findAll({
        workspace_id,
        workspace_channel_id,
        conversation_id,
        context,
      });
    }
    if (res_messages) {
      messageDatas = res_messages.data.data;
    }

    // get workspace channel
    // const res_workspace_channels = await WorkspaceChannelService.findAll(
    //   workspace_id,
    //   context
    // );
    // workspace_channels = res_workspace_channels.data.data;
  }

  return {
    props: {
      workspaceId: workspace_id,
      conversationId: conversation_id,
      conversationDatas: conversations,
      messageDatas: messageDatas,
      // workspace_channels: workspace_channels,
      workspace_channel_id: workspace_channel_id,
      userDetails: userDetails,
      workspaceUsers: workspace_users,
    },
  };
};

const socket = io(AppConfig().app.url);
const dynamic_variables_list = [
  "${contact.name}",
  "${contact.fname}",
  "${contact.lname}",
  "${contact.email}",
  "${contact.phone_number}",
  "${contact.country}",
];
export default function Message({
  workspaceId,
  conversationId,
  conversationDatas,
  messageDatas,
  // workspace_channels,
  workspace_channel_id,
  userDetails,
  workspaceUsers,
}: {
  workspaceId: number;
  conversationId: number;
  conversationDatas: any;
  messageDatas: any;
  // workspace_channels: any;
  workspace_channel_id: number;
  userDetails: any;
  workspaceUsers: any;
}) {
  const router = useRouter();

  const [workspace_id, setWorkspace_id] = useState(workspaceId);
  const [conversation_id, setConversation_id] = useState(
    conversationId ? conversationId : null
  );
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState(messageDatas);
  const [workspace_users, setWorkspace_users] = useState(workspaceUsers);
  const [conversations, setConversations] = useState(conversationDatas);
  // const [workspaceChannelId, setWorkspaceChannelId] = useState(
  //   workspace_channels.length > 0 ? workspace_channels[0].id : 0
  // );
  const [workspaceChannelId, setWorkspaceChannelId] =
    useState(workspace_channel_id);
  const [messageBox, setMessageBox] = useState("");

  const handleWorkspaceChannelIdChange = (e: any) => {
    setWorkspaceChannelId(e.target.value);
  };
  const handleMessageBox = (e: any) => {
    setMessageBox(e.target.value);
  };
  const handleVariable = (variable: string) => {
    setMessageBox((prev) => prev + " " + variable);
  };
  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    if (!conversation_id) {
      return alert("Please select a conversation");
    }

    const body_text = e.target.body_text.value;
    // const workspace_channel_id = workspaceChannelId;
    const _workspace_channel_id = workspace_channel_id;

    // reset message box
    e.target.body_text.value = "";
    setMessageBox("");

    const data = {
      body_text: body_text,
      workspace_channel_id: _workspace_channel_id,
      conversation_id: conversation_id,
      workspace_id: workspace_id,
    };

    try {
      const messageService = await MessageService.create(data);

      // setMessages((state: any) => [...state, messageService.data.data]);
      socket.emit("send_message", messageService.data.data);
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
  };

  const handleCloseConversation = async () => {
    if (!conversation_id) {
      return alert("Please select a conversation");
    }

    const data = {
      is_open: false,
      workspace_id: workspace_id,
    };
    try {
      const conversationService = await ConversationService.update(
        conversation_id,
        data
      );
      if (conversationService.data.success == true) {
        // TODO remove conversation from side panel
        const data = conversations.filter((con: any) => {
          return [con.id != conversation_id];
        });
        setConversations((state: any) => [data]);
      }
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
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setConversation_id(conversationId);
  }, [conversationId]);

  useEffect(() => {
    setWorkspace_id(workspaceId);
  }, [workspaceId]);

  useEffect(() => {
    setWorkspaceChannelId(workspace_channel_id);
    setConversations(conversationDatas);
  }, [workspace_channel_id]);

  useEffect(() => {
    socket.on("conversation", ({ conversation, workspace }) => {
      console.log("workspace", workspace_id);
      if (workspace.id == workspace_id) {
        setConversations((state: any) => [conversation, ...state]);
      }
    });
    return () => {
      socket.off("conversation");
    };
  }, [workspace_id]);

  useEffect(() => {
    // set message
    setMessages(messageDatas);

    // handle websocket events
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", ({ message }) => {
      if (message.conversation_id == conversation_id) {
        setMessages((state: any) => [...state, message]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, [conversation_id]);

  return (
    <>
      <AppHeader customer_trial_end_at={userDetails.tenant.trial_end_at} />
      <div className="flex">
        <Meta title={`Message - ${AppConfig().app.name}`} />
        <Sidebar />
        <main className="mt-5 ml-[80px] flex justify-center">
          <div className="flex">
            {/* workspaces */}
            <div className="w-[165px] border-solid border-[1px]">
              {workspace_users.map((workspace_user: any) => {
                return (
                  <Accordion
                    key={workspace_user.id + 1}
                    label={workspace_user.workspace.name}
                    active={
                      workspace_id == workspace_user.workspace.id ? true : false
                    }
                  >
                    {workspace_user.workspace.workspace_channels.map(
                      (workspace_channel: any) => {
                        return (
                          <div key={workspace_channel.id}>
                            <Link
                              href={`/message/${workspace_user.workspace.id}/${workspace_channel.id}`}
                            >
                              <div className="p-4 hover:text-white hover:bg-[var(--primary-hover-color)]">
                                {workspace_channel.channel_name}
                              </div>
                            </Link>
                          </div>
                        );
                      }
                    )}
                  </Accordion>
                );
              })}
            </div>
            {/* conversations */}
            <div className="ml-[10px] w-[165px] border-solid border-[1px]">
              {conversations.map((conversation: any) => {
                return (
                  <div key={conversation.id}>
                    <Link
                      href={`/message/${conversation.workspace_id}/${workspace_channel_id}/${conversation.id}`}
                    >
                      <div
                        className={`p-4 hover:text-white hover:bg-[var(--primary-hover-color)] ${
                          (conversation_id == conversation.id) == true
                            ? "bg-slate-400"
                            : "bg-white"
                        }`}
                      >
                        {conversation.contact.fname}{" "}
                        {conversation.contact.lname}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="ml-[50px] w-[430px] border-solid border-[1px]">
              {conversation_id ? (
                <div className="flex flex-col">
                  <div className="m-4 h-[38rem]">
                    <div className="border-b-gray-200 border-b-[1px] flex justify-between">
                      <div>Select agent</div>
                      <div>
                        <button
                          onClick={handleCloseConversation}
                          className="mb-4 btn primary"
                        >
                          Close Conversation
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col h-[95%] overflow-y-scroll border-b-gray-200 border-b-[1px]">
                      {messages.map((msg: any) => {
                        if (msg.message_from_workspace) {
                          return (
                            <div
                              key={msg.message_id}
                              data-time={DateHelper.formatDate(msg.created_at)}
                              className="msg sent text-right m-2 p-3 rounded-md w-auto inline bg-gray-200"
                            >
                              {msg.body_text}
                              <p className="msg_time">
                                {DateHelper.format(msg.created_at)}
                              </p>
                            </div>
                          );
                        } else {
                          return (
                            <div
                              key={msg.message_id}
                              data-time={DateHelper.formatDate(msg.created_at)}
                              className="msg rcvd m-2 p-3 rounded-md w-auto inline bg-gray-400"
                            >
                              {msg.body_text}
                              <p className="msg_time">
                                {DateHelper.format(msg.created_at).toString()}
                              </p>
                            </div>
                          );
                        }
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <div>
                    <div className="m-4">
                      {/* <select
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
                      </select> */}
                    </div>
                    <form onSubmit={handleSendMessage} method="post">
                      <div className="flex flex-row">
                        <div className="ml-4 mr-1 mb-2 w-full">
                          <input
                            onChange={handleMessageBox}
                            value={messageBox}
                            className="input"
                            type="text"
                            name="body_text"
                            placeholder={`Message`}
                          />
                        </div>
                        <div className="mr-4">
                          <button type="submit" className="btn primary">
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
                    <div>
                      <div className="ml-4">
                        <PopupMenu label="Variables">
                          {dynamic_variables_list.map((variable, i) => {
                            return (
                              <PopupMenuItem
                                key={i}
                                onClick={() => handleVariable(variable)}
                              >
                                {variable}
                              </PopupMenuItem>
                            );
                          })}
                        </PopupMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="m-4 flex justify-center">
                  Select a conversation
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
