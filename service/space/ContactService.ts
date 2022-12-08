import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ContactService = {
  findAll: async (workspace_id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/space/${workspace_id}/contact`, _config);
  },

  create: async (
    workspace_id: string,
    {
      fname,
      lname,
      email,
      phone_number,
      country_id,
    }: {
      fname: string;
      lname: string;
      email: string;
      phone_number: string;
      country_id: number;
    },
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      fname: fname,
      lname: lname,
      email: email,
      phone_number: phone_number,
      country_id: country_id,
    };

    return await Fetch.post(`/space/${workspace_id}/contact`, data, _config);
  },
};
