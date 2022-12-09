import React from "react";
import Link from "next/link";

export default function SettingSidebar({
  workspace_id,
}: {
  workspace_id: string;
}) {
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
  icon?: any;
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
        {icon ? (
          <SideBarIcon text={text} icon={icon} />
        ) : (
          <div className="mx-6 my-2">{text}</div>
        )}
      </Link>
    ) : (
      <>
        {icon ? (
          <SideBarIcon text={text} icon={icon} />
        ) : (
          <div className="mx-6 my-2">text</div>
        )}
      </>
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
const Caption = ({ text }: { text: any }) => (
  <div className="sidebar-caption">{text}</div>
);
