import React, { useState } from "react";
import Meta from "../../components/header/Meta";
import Dialog from "../../components/reusable/Dialog";
import WorkspaceSettingSidebar from "../../components/sidebar/WorkspaceSettingSidebar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AppConfig } from "../../config/app.config";
import CustomImage from "../../components/reusable/CustomImage";
import Link from "next/link";
import { WorkspaceChannelService } from "../../service/space/WorkspaceChannelService";
import { useRouter } from "next/navigation";
import { Alert } from "../../components/alert/Alert";
import { getUser } from "../../hooks/useUser";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;

  // get user details
  const userDetails = await getUser(context);
  const workspace_users = userDetails.workspace_users;

  return {
    props: {
      workspace_users: workspace_users,
    },
  };
};
export default function Index({ workspace_users }: { workspace_users: any }) {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Meta title={`Channels | Settigs - ${AppConfig().app.name}`} />
      <Sidebar />
      <main className="mt-5 flex justify-center">
        <div className="shadow-md sm:rounded-lg">
          <div className="w-[165px] border-solid border-[1px]">
            {workspace_users.map((workspace_user: any) => {
              return (
                <div key={workspace_user.workspace.id}>
                  <Link
                    href={`/space/${workspace_user.workspace.id}/settings/channels`}
                  >
                    <div
                      className={`p-4 hover:text-white hover:bg-[var(--primary-hover-color)]`}
                    >
                      {workspace_user.workspace.name}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
