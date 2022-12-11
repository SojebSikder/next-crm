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

  const res_conversations = await ConversationService.findAll(
    workspace_id,
    context
  );
  const conversations = res_conversations.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      conversations: conversations,
    },
  };
};

export default function Message({
  workspace_id,
  conversations,
}: {
  workspace_id: string;
  conversations: [];
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
                  <div className="text-right m-2 p-3 rounded-md w-auto inline bg-gray-200">
                    message
                  </div>
                  <div className="m-2 p-3 rounded-md w-auto inline bg-gray-400">
                    message
                  </div>
                </div>
              </div>
              <div className="m-4">
                <select className="input" name="" id="">
                  <option value="">Whatsapp channel 1</option>
                </select>
              </div>
              <div className="flex flex-row">
                <div className="m-4 w-full">
                  <input
                    className="input"
                    type="text"
                    placeholder="Message sojebsikder"
                  />
                </div>
                <div className="m-4">
                  <button className="btn-primary">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
