import { AxiosRequestConfig } from "axios";
import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const CheckoutService = {
  create: async ({ plan_id }: { plan_id: number }, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      plan_id: plan_id,
    };

    return await Fetch.post(`/checkout`, data, _config);
  },
};
