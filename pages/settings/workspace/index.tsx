import React, { useState } from "react";
import Link from "next/link";
import Meta from "../../../components/header/Meta";
import Sidebar from "../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../config/app.config";
import { Alert } from "../../../components/alert/Alert";
import { useRouter } from "next/navigation";
import { WorkspaceService } from "../../../service/space/workspace.service";
import OrgSettingSidebar from "../../../components/sidebar/OrgSettingSidebar";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;

  const resWorkspaces = await WorkspaceService.findAll(context);
  const workspaces = resWorkspaces.data;

  return {
    props: {
      workspaces: workspaces,
    },
  };
};
export default function Index({ workspaces }: { workspaces: any[] }) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoleDelete = async (id: number) => {
    if (confirm("Are you sure, want to delete?")) {
      try {
        const workspaceService = await WorkspaceService.remove(id);
        const resWorkspace = workspaceService;

        if (resWorkspace.error) {
          setErrorMessage(resWorkspace.message);
          setLoading(false);
        } else {
          setMessage(resWorkspace.message);
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
      <Meta title={`Workspaces | Settings - ${AppConfig().app.name}`} />
      <Sidebar />
      <OrgSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          <div>
            <Link href={`/settings/workspace/create`}>
              <div className="m-4 w-[20%] btn primary">Create workspace</div>
            </Link>
          </div>

          {loading && <div>Please wait...</div>}
          {message && <Alert type={"success"}>{message}</Alert>}
          {errorMessage && <Alert type={"danger"}>{errorMessage}</Alert>}

          {workspaces.map((workspace) => {
            return (
              <div
                key={workspace.id}
                className="flex justify-between m-4 p-4 border-solid shadow-sm border-[1px] border-b-slate-500"
              >
                <div>
                  <div>{workspace.name}</div>
                </div>

                <div>
                  <Link
                    href={`/settings/workspace/${workspace.id}/edit`}
                    className="btn warning mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleRoleDelete(workspace.id)}
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
