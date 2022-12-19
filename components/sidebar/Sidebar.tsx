import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsGearFill, BsMailbox, BsPerson, BsCircle } from "react-icons/bs";
import { FaLockOpen } from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();
  const { workspace_id } = router.query;

  const handler = () => {
    alert("Hello world");
  };

  return (
    <>
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
        <SideBarItem
          onClick={handler}
          text="Logout"
          icon={<FaLockOpen size="22" />}
        />
      </div>
    </>
  );
}

export const SideBarItem = ({
  icon,
  text,
  href,
  onClick,
}: {
  /**
   * Icon element
   */
  icon?: any;
  /**
   * Tooltip
   */
  text?: string;
  /**
   * url
   */
  href?: string;
  onClick?: () => void;
}) => (
  <>
    {href ? (
      <Link href={`${href}`}>
        {icon ? (
          <div onClick={onClick}>
            <SideBarIcon text={text} icon={icon} />
          </div>
        ) : (
          <div className="mx-6 my-2">{text}</div>
        )}
      </Link>
    ) : (
      <>
        {icon ? (
          <div onClick={onClick}>
            <SideBarIcon text={text} icon={icon} />
          </div>
        ) : (
          <div onClick={onClick} className="mx-6 my-2">
            {text}
          </div>
        )}
      </>
    )}
  </>
);

export const SideBarIcon = ({
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
export const Divider = () => <hr className="sidebar-hr" />;
export const Caption = ({ text }: { text: any }) => (
  <div className="sidebar-caption">{text}</div>
);
