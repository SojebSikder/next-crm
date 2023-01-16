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
import { ContactService } from "../../service/space/ContactService";
import { ConversationService } from "../../service/space/ConversationService";
import { MessageService } from "../../service/space/MessageService";
import { WorkspaceChannelService } from "../../service/space/WorkspaceChannelService";
import { WorkspaceUserService } from "../../service/space/WorkspaceUserService";
import { PopupMenu, PopupMenuItem } from "../../components/reusable/PopupMenu";
import Accordion from "../../components/reusable/Accordion";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  // const workspace_id = query.workspace_id;
  // const organization_id = query.organization_id;
  let conversation_id = query.conversation_id ? query.conversation_id : null;

  // get user details
  const userDetails = await getUser(context);
  const workspace_users = userDetails.workspace_users;

  // get conversation
  // const res_conversations = await ConversationService.findAll(
  //   workspace_id,
  //   context
  // );
  // const conversations = res_conversations.data.data;
  const conversations = workspace_users[0].workspace.conversations;

  const workspace_id = workspace_users[0].workspace.id;
  const organization_id = conversations[0].id;
  // get messages
  let res_messages;
  let messageDatas = [];
  if (conversation_id) {
    res_messages = await MessageService.findAll(
      workspace_id,
      conversation_id,
      context
    );
  }
  if (res_messages) {
    messageDatas = res_messages.data.data;
  }

  // get workspace channel
  const res_workspace_channels = await WorkspaceChannelService.findAll(
    workspace_id,
    context
  );
  const workspace_channels = res_workspace_channels.data.data;

  return {
    props: {
      workspaceId: workspace_id,
      organization_id: organization_id,
      conversationId: conversation_id,
      conversationDatas: conversations,
      messageDatas: messageDatas,
      workspace_channels: workspace_channels,
      userDetails: userDetails,
      workspace_users: workspace_users,
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
  organization_id,
  conversationId,
  conversationDatas,
  messageDatas,
  workspace_channels,
  userDetails,
  workspace_users,
}: {
  workspaceId: string;
  organization_id: string;
  conversationId: string;
  conversationDatas: any;
  messageDatas: any;
  workspace_channels: any;
  userDetails: any;
  workspace_users: any;
}) {
  const router = useRouter();

  const [workspace_id, setWorkspace_id] = useState(workspaceId);
  const [conversation_id, setConversation_id] = useState(
    conversationId ? conversationId : null
  );
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState(messageDatas);

  const [conversations, setConversations] = useState(conversationDatas);
  const [workspaceChannelId, setWorkspaceChannelId] = useState(
    workspace_channels.length > 0 ? workspace_channels[0].id : 0
  );
  const [showDialog, setShowDialog] = useState(false);
  const [messageBox, setMessageBox] = useState("");

  const handleWorkspaceChannelIdChange = (e: any) => {
    setWorkspaceChannelId(e.target.value);
  };

  const handleMessageBox = (e: any) => {
    setMessageBox(e.target.value);
  };

  const handleDialog = () => {
    setShowDialog(true);
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
    const workspace_channel_id = workspaceChannelId;

    // reset message box
    e.target.body_text.value = "";
    setMessageBox("");

    const data = {
      body_text: body_text,
      workspace_channel_id: workspace_channel_id,
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

  const handleConversationSelect = (id: string) => {
    setWorkspace_id(id);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setConversation_id(conversationId);
  }, [conversationId]);

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
    socket.on("conversation", ({ conversation, workspace }) => {
      if (workspace.id == workspace_id) {
        setConversations((state: any) => [conversation, ...state]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("message");
      socket.off("conversation");
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
            {/* channels */}
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
                    {workspace_user.workspace.conversations.map(
                      (conversation: any) => {
                        return (
                          <div key={conversation.id}>
                            <Link
                              onClick={() =>
                                handleConversationSelect(
                                  workspace_user.workspace.id
                                )
                              }
                              href={`/message/${conversation.id}`}
                            >
                              {conversation.contact.fname}{" "}
                              {conversation.contact.lname}
                            </Link>
                          </div>
                        );
                      }
                    )}
                  </Accordion>
                );
              })}
            </div>
            <div className="ml-[150px] w-[430px] border-solid border-[1px]">
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
