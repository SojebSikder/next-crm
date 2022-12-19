import React from "react";
import { useRouter } from "next/router";
import { Caption, SideBarItem } from "./Sidebar";

export default function SettingSidebar() {
  const router = useRouter();
  const { workspace_id } = router.query;
  return (
    <div
      className="fixed top-0 left-[64px] h-screen w-[230px] flex flex-col
    bg-[#f1f1f1] dark:bg-gray-900"
    >
      <Caption text={"Workspace Settings"} />
      <SideBarItem
        href={`/space/${workspace_id}/settings/general`}
        text="General"
      />
      <SideBarItem
        href={`/space/${workspace_id}/settings/channels`}
        text="Channels"
      />
      <SideBarItem href={`/space/${workspace_id}/settings/roles`} text="Role" />
    </div>
  );
}
