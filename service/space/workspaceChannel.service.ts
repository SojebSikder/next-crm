import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const WorkspaceChannelService = {
  findAll: async (workspace_id: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/space/${workspace_id}/channel`, _config);
  },

  create: async (
    workspace_id: string,
    {
      phone_number,
      access_token,
      account_id,
    }: { phone_number: string; access_token: string; account_id: string },
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
      phone_number: phone_number,
      access_token: access_token,
      account_id: account_id,
    };

    return await Fetch.post(`/space/${workspace_id}/channel`, data, _config);
  },

  remove: async (id: number, workspace_id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.delete(`/space/${workspace_id}/channel/${id}`, _config);
  },
};
