import React from "react";
import { Caption, SideBarItem } from "./Sidebar";

export default function OrgSettingSidebar() {
  return (
    <div
      className="fixed top-0 left-[64px] h-screen w-[230px] flex flex-col
    bg-[#f1f1f1] dark:bg-gray-900"
    >
      <Caption text={"Organization"} />
      <SideBarItem href={`/settings/general`} text="General" />
      <SideBarItem href={`/settings/workspace`} text="Workspace" />
    </div>
  );
}
