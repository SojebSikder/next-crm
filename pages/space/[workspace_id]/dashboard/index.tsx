import React from "react";
import Meta from "../../../../components/header/Meta";
import Sidebar from "../../../../components/sidebar/Sidebar";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  return {
    props: {
      workspace_id: workspace_id,
    },
  };
};
export default function Dashboard({ workspace_id }: { workspace_id: string }) {
  return (
    <div>
      <Meta />
      <Sidebar />
      <main className="flex justify-center h-screen">
        <h1>Hello world</h1>
      </main>
    </div>
  );
}
