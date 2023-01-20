import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ConversationService = {
  findAll: async (
    workspace_channel_id: number,
    workspace_id: number,
    context: any = null
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const res = await Fetch.get(
      `/space/${workspace_id}/conversation?workspace_channel_id=${workspace_channel_id}`,
      _config
    );

    return res.data;
  },

  update: async (
    id: number,
    {
      is_open,
      workspace_id,
      context = null,
    }: {
      is_open: boolean;
      workspace_id: number;
      context?: any;
    }
  ) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };
    const data = {
      is_open: is_open,
    };

    return await Fetch.patch(
      `/space/${workspace_id}/conversation/${id}`,
      data,
      _config
    );
  },
};
