import React, { useState } from "react";
import Link from "next/link";
import Meta from "../../../../components/header/Meta";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { AppConfig } from "../../../../config/app.config";
import { Alert } from "../../../../components/alert/Alert";
import { useRouter } from "next/navigation";
import OrgSettingSidebar from "../../../../components/sidebar/OrgSettingSidebar";
import { PlanService } from "../../../../service/plan/plan.service";

export const getServerSideProps = async (context: {
  query: any;
  req?: any;
  res?: any;
  asPath?: any;
  pathname?: any;
}) => {
  const { req, query, res, asPath, pathname } = context;

  const planService = await PlanService.findAll(context);
  const plans = planService.data.data;

  return {
    props: {
      plans: plans,
    },
  };
};

type Props = {
  plans: any[];
};

export default function Index({ plans }: Props) {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Meta title={`Billing | Settings - ${AppConfig().app.name}`} />
      <Sidebar />
      <OrgSettingSidebar />
      <main className="mt-5 ml-[300px] flex justify-center h-screen">
        <div className="w-full shadow-md sm:rounded-lg">
          {/* plans */}
          <div className="flex justify-center">
            {plans.map((plan) => {
              return (
                <div
                  key={plan.id}
                  className="w-[20%] m-4 p-4 shadow-md sm:rounded-lg"
                >
                  <div className="flex justify-center flex-col">
                    <div className="text-[20px] text-center">{plan.name}</div>
                    <div className="text-[25px] text-center">
                      ${plan.price_per_month} / month
                    </div>
                    {/* <div className="text-center">$99 / month</div> */}
                    <div className="m-2">
                      {/* <Link href={`/settings/billing/plans`}> */}
                      <div className="w-[100%] btn primary">Subscribe Now</div>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* end plans */}
        </div>
      </main>
    </div>
  );
}
