import React, { useState } from "react";
import Meta from "../../../../../components/header/Meta";
import Dialog from "../../../../../components/reusable/Dialog";
import WorkspaceSettingSidebar from "../../../../../components/sidebar/WorkspaceSettingSidebar";
import Sidebar from "../../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../../config/app.config";
import CustomImage from "../../../../../components/reusable/CustomImage";
import Link from "next/link";
import { WorkspaceChannelService } from "../../../../../service/space/workspaceChannel.service";
import { RoleService } from "../../../../../service/space/role.service";
import { Alert } from "../../../../../components/alert/Alert";
import { useRouter } from "next/navigation";
import { WorkspaceUserService } from "../../../../../service/space/workspaceUser.service";
import { UserService } from "../../../../../service/user/user.service";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  const res_users = await UserService.findAll(context);
  const users = res_users.data.data;

  // const res_users = await WorkspaceUserService.findAll(
  //   workspace_id,
  //   context
  // );
  // const users = res_users.data.data;

  return {
    props: {
      workspace_id: workspace_id,
      users: users,
    },
  };
};
export default function Index({
  workspace_id,
  users,
}: {
  workspace_id: string;
  users: any;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUserDelete = async (id: number) => {
    if (confirm("Are you sure, want to delete this user?")) {
      setMessage(null);
      setErrorMessage(null);
      setLoading(true);

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
      <Meta title={`Users | Settings - ${AppConfig().app.name}`} />
      <Sidebar />
      <WorkspaceSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div>
            <Link href={`/space/${workspace_id}/settings/users/create`}>
              <div className="m-4 w-[20%] btn primary">Create user</div>
            </Link>
          </div>

          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}

          {users.map((user: any) => {
            return (
              <div
                key={user.id}
                className="flex justify-between m-4 p-4 border-solid shadow-sm border-[1px] border-b-slate-500"
              >
                <div>
                  <div>
                    {user.fname} {user.lname}
                  </div>
                </div>

                <div>
                  <Link
                    href={`/space/${workspace_id}/settings/users/${user.id}/edit`}
                    className="btn warning mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleUserDelete(user.id)}
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
