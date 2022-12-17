import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Meta from "../../../../components/header/Meta";
import Dialog from "../../../../components/reusable/Dialog";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
import { ContactService } from "../../../../service/space/ContactService";
import { ConversationService } from "../../../../service/space/ConversationService";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  // get conversation
  const res_conversations = await ConversationService.findAll(
    workspace_id,
    context
  );
  const conversations = res_conversations.data.data;

  try {
    if (conversations && conversations.length > 0) {
      const url = `/space/${workspace_id}/message/${conversations[0].id}`;
      return {
        redirect: {
          destination: url,
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function Message() {
  return (
    <div className="flex">
      <Meta title={`Message - ${AppConfig().app.name}`} />
      <Sidebar />
      <main className="mt-5 ml-[80px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div className="w-[130px]">No conversation</div>
        </div>
      </main>
    </div>
  );
}
