import React from "react";
import { useRouter } from "next/router";
import { Caption, SideBarItem } from "./Sidebar";

export default function WorkspaceSettingSidebar() {
  const router = useRouter();
  const { workspace_id } = router.query;
  return (
    <div
      className="fixed top-0 left-[64px] h-screen w-[230px] flex flex-col
    bg-[#f1f1f1] dark:bg-gray-900"
    >
      {/* <Caption text={"Organization"} />
      <Caption text={"General"} /> */}
      <Caption text={"Workspace"} />
      <SideBarItem
        href={`/space/${workspace_id}/settings/general`}
        text="General"
      />
      <SideBarItem
        href={`/space/${workspace_id}/settings/channels`}
        text="Channels"
      />
      <SideBarItem
        href={`/space/${workspace_id}/settings/workspace-user`}
        text="Workspace user"
      />
      <SideBarItem href={`/space/${workspace_id}/settings/users`} text="User" />
      <SideBarItem href={`/space/${workspace_id}/settings/roles`} text="Role" />
    </div>
  );
}
