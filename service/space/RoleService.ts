import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const RoleService = {
  findAll: async (workspace_id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/space/${workspace_id}/role`, _config);
  },

  create: async (
    workspace_id: string,
    {
      title,
      permission_ids,
    }: {
      title: string;
      permission_ids: number[];
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
      title: title,
      permission_ids: permission_ids,
    };

    return await Fetch.post(`/space/${workspace_id}/role`, data, _config);
  },

  remove: async (id: number, workspace_id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.delete(`/space/${workspace_id}/role/${id}`, _config);
  },
};
