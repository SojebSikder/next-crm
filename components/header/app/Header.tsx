import React from "react";
import { AppConfig } from "../../../config/app.config";

export default function AppHeader({
  customer_trial_end_at,
}: {
  customer_trial_end_at: string;
}) {
  const trial_end_at = new Date(customer_trial_end_at).getTime();
  const now = new Date().getTime();
  const is_trial_end = trial_end_at < now ? true : false;

  return (
    <>
      <header className="bg-orange-300">
        <nav>
          <div className="flex justify-center p-2">
            <ul className="navbar-container mx-auto overflow-hidden">
              {is_trial_end && (
                <div>
                  Your 14-day free trial of {AppConfig().app.name} has ended.
                  Select a Plan to continue using the app. Need help?
                </div>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
