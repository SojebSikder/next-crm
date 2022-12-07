import React from "react";
import { BsGearFill, BsMailbox, BsPerson, BsCircle } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
    bg-[#ededed] dark:bg-gray-900 shadow-lg"
    >
      <SideBarIcon text="My new workspace" icon={<BsCircle size="28" />} />
      <SideBarIcon text="Messages" icon={<BsMailbox size="32" />} />
      <SideBarIcon text="Contacts" icon={<BsPerson size="32" />} />
      {/* <Divider /> */}
      <SideBarIcon text="Settings" icon={<BsGearFill size="22" />} />
    </div>
  );
}

const SideBarIcon = ({
  icon,
  text,
}: {
  /**
   * Icon element
   */
  icon: any;
  /**
   * Tooltip
   */
  text?: string;
}) => (
  <div className="sidebar-icon group">
    {icon}
    {text && (
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    )}
  </div>
);
const Divider = () => <hr className="sidebar-hr" />;
