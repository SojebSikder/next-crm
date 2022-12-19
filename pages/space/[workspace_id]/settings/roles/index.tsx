import React, { useState } from "react";
import Meta from "../../../../../components/header/Meta";
import Dialog from "../../../../../components/reusable/Dialog";
import SettingSidebar from "../../../../../components/sidebar/SettingSidebar";
import Sidebar from "../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../config/app.config";
import CustomImage from "../../../../../components/reusable/CustomImage";
import Link from "next/link";
import { WorkspaceChannelService } from "../../../../../service/space/WorkspaceChannelService";
import { RoleService } from "../../../../../service/space/RoleService";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  const res_roles = await RoleService.findAll(workspace_id, context);
  const roles = res_roles.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      roles: roles,
    },
  };
};
export default function Index({
  workspace_id,
  roles,
}: {
  workspace_id: string;
  roles: [];
}) {
  const [showDialog, setShowDialog] = useState(false);
  const handleChannelDialog = () => {
    setShowDialog(true);
  };
  const handleChannel = () => {
    setShowDialog(true);
  };

  return (
    <div>
      <Meta title={`Channels | Settigs - ${AppConfig().app.name}`} />
      <Sidebar />
      <SettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <Link href={`/space/${workspace_id}/settings/roles/create`}>
            <div className="m-4 w-[20%] btn-primary">Create role</div>
          </Link>
          {roles.map((role: any) => {
            return (
              <div
                key={role.id}
                className="m-4 p-4 border-solid shadow-sm border-[1px] border-b-slate-500"
              >
                <div>{role.title}</div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
