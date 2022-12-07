import React from "react";
import { BsGearFill, BsMailbox, BsPerson, BsCircle } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
    bg-white dark:bg-gray-900 shadow-lg"
    >
      <SideBarIcon icon={<BsCircle size="28" />} />
      <Divider />
      <SideBarIcon icon={<BsMailbox size="32" />} />
      <SideBarIcon icon={<BsPerson size="32" />} />
      <Divider />
      <SideBarIcon icon={<BsGearFill size="22" />} />
    </div>
  );
}

const SideBarIcon = ({
  icon,
  text = "tooltip 💡",
}: {
  icon: any;
  text?: string;
}) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);
const Divider = () => <hr className="sidebar-hr" />;
