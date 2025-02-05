import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const WorkspaceUserService = {
  findAll: async (workspace_id: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/space/${workspace_id}/workspace-user`, _config);
  },

  create: async (
    workspace_id: number,
    {
      user_id,
    }: {
      user_id: number;
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
      user_id: user_id,
    };

    return await Fetch.post(
      `/space/${workspace_id}/workspace-user`,
      data,
      _config
    );
  },
};
