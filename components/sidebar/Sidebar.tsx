import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsGearFill, BsMailbox, BsPerson, BsCircle } from "react-icons/bs";

export default function Sidebar() {
  const router = useRouter();
  const { workspace_id } = router.query;
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
    bg-[#ededed] dark:bg-gray-900 shadow-lg"
    >
      <SideBarItem text="My new workspace" icon={<BsCircle size="28" />} />
      <SideBarItem
        href={`/space/${workspace_id}/message`}
        text="Messages"
        icon={<BsMailbox size="32" />}
      />
      <SideBarItem
        href={`/space/${workspace_id}/contact`}
        text="Contacts"
        icon={<BsPerson size="32" />}
      />
      {/* <Divider /> */}
      <SideBarItem
        href={`/space/${workspace_id}/settings/channels`}
        text="Settings"
        icon={<BsGearFill size="22" />}
      />
    </div>
  );
}

const SideBarItem = ({
  icon,
  text,
  href,
}: {
  /**
   * Icon element
   */
  icon: any;
  /**
   * Tooltip
   */
  text?: string;
  /**
   * url
   */
  href?: string;
}) => (
  <>
    {href ? (
      <Link href={`${href}`}>
        <SideBarIcon text={text} icon={icon} />
      </Link>
    ) : (
      <SideBarIcon text={text} icon={icon} />
    )}
  </>
);
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
