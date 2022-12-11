import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const messages = res_messages.data.data;
  // get workspace channel
  const res_workspace_channels = await WorkspaceChannelService.findAll(
    workspace_id,
    context
  );
  const workspace_channels = res_workspace_channels.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      conversations: conversations,
      messages: messages,
      workspace_channels: workspace_channels,
    },
  };
};

export default function Message({
  workspace_id,
  conversations,
  messages,
  workspace_channels,
}: {
  workspace_id: string;
  conversations: [];
  messages: [];
  workspace_channels: [];
}) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const handleContactDialog = () => {
    setShowDialog(true);
  };

  const handleContact = async (e: any) => {
    e.preventDefault();
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const phone_number = e.target.phone_number.value;
    const country_id = e.target.country_id.value;
    const assignee_id = e.target.assignee_id.value;

    const data = {
      fname: fname,
      lname: lname,
      email: email,
      phone_number: phone_number,
      country_id: country_id,
      assignee_id: assignee_id,
    };
    try {
      const contactService = await ContactService.create(workspace_id, data);
      // router.refresh();
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
                <select className="input" name="workspace_channel">
                  {workspace_channels.map((channel: any) => {
                    return (
                      <option key={channel.id} value={channel.id}>
                        {channel.channel_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <form action="" method="post">
                <div className="flex flex-row">
                  <div className="m-4 w-full">
                    <input
                      className="input"
                      type="text"
                      name="message"
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
