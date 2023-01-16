import React from "react";
import AppHeader from "../../../../components/header/app/Header";
import Meta from "../../../../components/header/Meta";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { getUser } from "../../../../hooks/useUser";

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const workspace_id = query.workspace_id;

  const userDetails = await getUser(context);

  return {
    props: {
      workspace_id: workspace_id,
      userDetails,
    },
  };
};
export default function Dashboard({
  userDetails,
  workspace_id,
}: {
  userDetails: any;
  workspace_id: string;
}) {
  return (
    <div>
      <AppHeader customer_trial_end_at={userDetails.tenant.trial_end_at} />
      <Meta />
      <Sidebar />
      <main className="flex justify-center h-screen">
        <h1>Hello world</h1>
      </main>
    </div>
  );
}
