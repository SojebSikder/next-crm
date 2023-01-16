import React from "react";
import { useRouter } from "next/router";
import { Caption, SideBarItem } from "./Sidebar";

export default function OrgSettingSidebar() {
  const router = useRouter();
  return (
    <div
      className="fixed top-0 left-[64px] h-screen w-[230px] flex flex-col
    bg-[#f1f1f1] dark:bg-gray-900"
    >
      <Caption text={"Organization"} />
      <SideBarItem href={`/settings/general`} text="General" />
      <SideBarItem href={`/settings/channels`} text="Channels" />
      <SideBarItem href={`/settings/users`} text="User" />
      <SideBarItem href={`/settings/roles`} text="Role" />
    </div>
  );
}
