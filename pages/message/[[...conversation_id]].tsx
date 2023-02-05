import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { EmojiClickData } from "emoji-picker-react";
import AppHeader from "../../components/header/app/Header";
import Meta from "../../components/header/Meta";
import Sidebar from "../../components/sidebar/Sidebar";
import { AppConfig } from "../../config/app.config";
import { DateHelper } from "../../helper/date.helper";
import { getUser } from "../../hooks/useUser";
import { ConversationService } from "../../service/space/conversation.service";
import { MessageService } from "../../service/space/message.service";
import { PopupMenu, PopupMenuItem } from "../../components/reusable/PopupMenu";
import Accordion from "../../components/reusable/Accordion";
import { DynamicVariableService } from "../../service/dynamic-variable/dynamic-variable.service";
import { SnippetService } from "../../service/space/snippet.service";
import { BsEmojiLaughing } from "react-icons/bs";
import { NotificationManager } from "../../util/NotificationManager/NotificationManager";

// import in client side to avoid "document is not defined"
const EmojiPicker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const open = query.open ? query.open : true;

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

  let conversations = [];
  let messageDatas = [];
  let workspace_channels = [];

  let dynamic_variables = [];
  let snippets = [];

  if (workspace_users.length > 0) {
    if (workspace_channel_id) {
      // get conversation
      const resConversations = await ConversationService.findAll({
        open: open,
        workspace_channel_id,
        workspace_id,
        context,
      });
      conversations = resConversations.data;
    }

    // get messages
    let res_messages;
    if (conversation_id) {
      // fetch other things
      const dynamic_variablesService = await DynamicVariableService.findAll(
        context
      );
      dynamic_variables = dynamic_variablesService.data;
      //
      const snippetsService = await SnippetService.findAll(
        workspace_id,
        context
      );
      snippets = snippetsService.data.data;

      // fetch messages
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
  }

  return {
    props: {
      workspaceId: workspace_id,
      conversationId: conversation_id,
      conversationDatas: conversations,
      messageDatas: messageDatas,
      workspace_channel_id: workspace_channel_id,
      userDetails: userDetails,
      workspaceUsers: workspace_users,
      open: open,
      dynamic_variables: dynamic_variables,
      snippets: snippets,
    },
  };
};

// initialize socket
const socket = io(AppConfig().app.url);

export default function Message({
  workspaceId,
  conversationId,
  conversationDatas,
  messageDatas,
  // workspace_channels,
  workspace_channel_id,
  userDetails,
  workspaceUsers,
  open,
  dynamic_variables,
  snippets,
}: {
  workspaceId: number;
  conversationId: number;
  conversationDatas: any[];
  messageDatas: any[];
  // workspace_channels: any;
  workspace_channel_id: number;
  userDetails: any;
  workspaceUsers: any[];
  open: string;
  dynamic_variables: any[];
  snippets: any[];
}) {
  const router = useRouter();

  const [workspace_id, setWorkspace_id] = useState(workspaceId);
  const [conversation_id, setConversation_id] = useState(
    conversationId ? conversationId : null
  );
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState(messageDatas.reverse());
  const [workspace_users, setWorkspace_users] = useState(workspaceUsers);
  const [conversations, setConversations] = useState(conversationDatas);
  const [currentConversation, setCurrentConversation] = useState(
    conversationDatas.length > 0
      ? conversationDatas.find((con) => con.id == conversation_id)
      : {}
  );
  const [lastMessageId, setLastMessageId] = useState(0);

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
  const handleVariable = (text: string) => {
    setMessageBox((prev) => prev + " " + text);
  };

  function onEmojiClick(emojiData: EmojiClickData, event: MouseEvent) {
    handleVariable(emojiData.emoji);
  }

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

  const handleCloseConversation = async (isOpen: number) => {
    if (!conversation_id) {
      return alert("Please select a conversation");
    }

    const data = {
      is_open: isOpen ? true : false,
      workspace_id: workspace_id,
    };
    try {
      const conversationService = await ConversationService.update(
        conversation_id,
        data
      );
      if (conversationService.data.success == true) {
        // TODO remove conversation from side panel
        if (isOpen == 0) {
          const data = conversations.filter((con: any) => {
            return [con.id != conversation_id];
          });
          setConversations((state: any) => [data]);
        }
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
    setWorkspaceChannelId(workspace_channel_id);
    setConversations(conversationDatas);
  }, [workspace_channel_id]);

  useEffect(() => {
    setConversations(conversationDatas);
  }, [open]);

  useEffect(() => {
    setWorkspace_id(workspaceId);
    socket.on("conversation", ({ conversation, workspace }) => {
      if (workspace.id == workspaceId) {
        setConversations((state: any) => [conversation, ...state]);
      }
    });
    return () => {
      socket.off("conversation");
    };
  }, [workspaceId]);

  const notify = () => {
    // notify using desktop notification
    const notification = NotificationManager.desktop().notify({
      title: "New notification",
      body: "Click to see notifications",
    });
    if (notification) {
      notification.onclick = function () {
        console.log("notification clicked");
      };
    }
  };

  useEffect(() => {
    setConversation_id(conversationId);
    // set message
    setMessages(messageDatas);

    // handle websocket events
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", ({ message }) => {
      if (message.conversation_id == conversationId) {
        setLastMessageId(message.id); // set last message id
        setMessages((state: any) => [...state, message]);
      }
    });
    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, [conversationId]);

  const getMessage = (last_message_id: number) => {
    console.log(last_message_id);

    console.log("fetch messages");
  };

  const handleMessageContainerScroll = (e: any) => {
    let element = e.target;
    if (element.scrollTop === 0) {
      //fetch messages
      getMessage(lastMessageId);
    }
  };

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
                    id={`workspace-${workspace_user.workspace.id}`}
                    key={workspace_user.workspace.id}
                    label={workspace_user.workspace.name}
                    active={
                      workspace_id == workspace_user.workspace.id ? true : false
                    }
                  >
                    {workspace_user.workspace.workspace_channels.length > 0 ? (
                      workspace_user.workspace.workspace_channels.map(
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
                      )
                    ) : (
                      <>
                        <div className="p-4">No channels</div>
                      </>
                    )}
                  </Accordion>
                );
              })}
            </div>
            {/* conversations */}
            <div className="ml-[10px] w-[200px] border-solid border-[1px]">
              <div className="m-4">
                {workspace_id && workspace_channel_id ? (
                  <PopupMenu label={`${open == "true" ? "Open" : "Close"}`}>
                    <PopupMenuItem
                      href={`${workspace_id}/${workspace_channel_id}/?open=true`}
                    >
                      Open
                    </PopupMenuItem>
                    <PopupMenuItem
                      href={`${workspace_id}/${workspace_channel_id}/?open=false`}
                    >
                      Close
                    </PopupMenuItem>
                  </PopupMenu>
                ) : (
                  <></>
                )}
              </div>

              {conversations.map((conversation: any) => {
                return (
                  <div key={conversation.id}>
                    <Link
                      href={`/message/${
                        conversation.workspace_id
                      }/${workspace_channel_id}/${conversation.id}${
                        open == "false" ? "?open=false" : ""
                      }`}
                    >
                      <div
                        className={`p-4 hover:text-white hover:bg-[var(--primary-hover-color)] ${
                          (conversation_id == conversation.id) == true
                            ? "bg-slate-400 text-white"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            {conversation.contact.fname}{" "}
                            {conversation.contact.lname}
                          </div>
                          <div>
                            <span className="text-[10px]">
                              {DateHelper.format(
                                conversation.updated_at,
                                "MMM DD"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <hr />
                  </div>
                );
              })}
            </div>

            <div className="ml-[50px] w-[430px] border-solid border-[1px]">
              {conversation_id ? (
                <div className="flex flex-col">
                  <div className="m-4 h-[38rem]">
                    <div className="border-b-gray-200 border-b-[1px] flex justify-between">
                      <div>Select agent </div>
                      <div>
                        {currentConversation.is_open ? (
                          <button
                            onClick={() => handleCloseConversation(0)}
                            className={`mb-4 btn danger`}
                          >
                            Close Conversation
                          </button>
                        ) : (
                          <button
                            onClick={() => handleCloseConversation(1)}
                            className={`mb-4 btn primary`}
                          >
                            Open Conversation
                          </button>
                        )}
                      </div>
                    </div>
                    <div
                      id="message_container"
                      onScroll={handleMessageContainerScroll}
                      className="flex flex-col h-[95%] overflow-y-scroll border-b-gray-200 border-b-[1px]"
                    >
                      {messages.map((msg: any) => {
                        if (msg.message_from_workspace) {
                          return (
                            <div
                              key={msg.message_id}
                              data-time={DateHelper.formatDate(msg.created_at)}
                              className="msg sent m-2 p-3 rounded-md w-auto inline bg-gray-200"
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
                    <div className="flex">
                      <div className="ml-4">
                        <PopupMenu
                          element={<BsEmojiLaughing size={24} />}
                          label={"Emoji"}
                        >
                          <EmojiPicker onEmojiClick={onEmojiClick} />
                        </PopupMenu>
                      </div>
                      <div className="ml-4">
                        <PopupMenu label={"Variables"}>
                          {dynamic_variables.map((variable, i) => {
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
                      <div className="ml-4">
                        <PopupMenu label={"Snippets"}>
                          {snippets.map((snippet) => {
                            return (
                              <PopupMenuItem
                                key={snippet.id}
                                onClick={() => handleVariable(snippet.message)}
                              >
                                {snippet.name}
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
