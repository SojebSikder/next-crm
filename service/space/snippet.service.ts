import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const SnippetService = {
  findAll: async (workspace_id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/space/${workspace_id}/snippet`, _config);
  },

  findOne: async (id: number, workspace_id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.get(`/space/${workspace_id}/snippet/${id}`, _config);
  },

  create: async (
    workspace_id: string,
    {
      name,
      message,
    }: {
      name: string;
      message: string;
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
      name: name,
      message: message,
    };

    return await Fetch.post(`/space/${workspace_id}/snippet`, data, _config);
  },

  update: async (
    id: string,
    workspace_id: string,
    {
      name,
      message,
    }: {
      name: string;
      message: string;
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
      name: name,
      message: message,
    };

    return await Fetch.patch(
      `/space/${workspace_id}/snippet/${id}`,
      data,
      _config
    );
  },

  remove: async (id: number, workspace_id: string, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await Fetch.delete(`/space/${workspace_id}/snippet/${id}`, _config);
  },
};
