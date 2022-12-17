import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const ConversationService = {
  findAll: async (workspace_id: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/space/${workspace_id}/conversation`, _config);
  },

  update: async ({
    is_open,
    workspace_id,
    context = null,
  }: {
    is_open: boolean;
    workspace_id: string;
    context?: any;
  }) => {
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

    return await Fetch.put(
      `/space/${workspace_id}/conversation`,
      data,
      _config
    );
  },
};
