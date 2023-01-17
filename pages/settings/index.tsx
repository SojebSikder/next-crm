import React, { useState } from "react";
import Meta from "../../components/header/Meta";
import Dialog from "../../components/reusable/Dialog";
import WorkspaceSettingSidebar from "../../components/sidebar/WorkspaceSettingSidebar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AppConfig } from "../../config/app.config";
import CustomImage from "../../components/reusable/CustomImage";
import Link from "next/link";
import { WorkspaceChannelService } from "../../service/space/workspaceChannel.service";
import { useRouter } from "next/navigation";
import { Alert } from "../../components/alert/Alert";
import OrgSettingSidebar from "../../components/sidebar/OrgSettingSidebar";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;

  return {
    props: {},
  };
};
export default function Index({}: {}) {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Meta title={`Channels | Settigs - ${AppConfig().app.name}`} />
      <Sidebar />
      <OrgSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center">
        <div className="w-full shadow-md sm:rounded-lg"></div>
      </main>
    </div>
  );
}
