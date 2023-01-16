import React, { useState } from "react";
import Meta from "../../../../../components/header/Meta";
import Dialog from "../../../../../components/reusable/Dialog";
import WorkspaceSettingSidebar from "../../../../../components/sidebar/WorkspaceSettingSidebar";
import Sidebar from "../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../config/app.config";
import CustomImage from "../../../../../components/reusable/CustomImage";
import Link from "next/link";
import { WorkspaceChannelService } from "../../../../../service/space/WorkspaceChannelService";
import { RoleService } from "../../../../../service/space/RoleService";
import { Alert } from "../../../../../components/alert/Alert";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoleDelete = async (id: number) => {
    if (confirm("Are you sure, want to delete this role?")) {
      try {
        const roleService = await RoleService.remove(id, workspace_id);
        const resRole = roleService.data;

        if (resRole.error) {
          setErrorMessage(resRole.message);
          setLoading(false);
        } else {
          setMessage(resRole.message);
          setLoading(false);
          router.refresh();
        }
      } catch (error: any) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
          setLoading(false);
          console.log(error.response.data.message);
        } else {
          setErrorMessage(error.message);
          setLoading(false);
          console.log(error.message);
        }
      }
    }
  };

  return (
    <div>
      <Meta title={`Roles | Settigs - ${AppConfig().app.name}`} />
      <Sidebar />
      <WorkspaceSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div>
            <Link href={`/space/${workspace_id}/settings/roles/create`}>
              <div className="m-4 w-[20%] btn primary">Create role</div>
            </Link>
          </div>

          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}

          {roles.map((role: any) => {
            return (
              <div
                key={role.id}
                className="flex justify-between m-4 p-4 border-solid shadow-sm border-[1px] border-b-slate-500"
              >
                <div>
                  <div>{role.title}</div>
                </div>

                <div>
                  <Link
                    href={`/space/${workspace_id}/settings/roles/${role.id}/edit`}
                    className="btn warning mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleRoleDelete(role.id)}
                    className="btn danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
