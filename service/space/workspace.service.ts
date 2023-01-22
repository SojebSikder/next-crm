import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const WorkspaceService = {
  findAll: async (context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const res = await Fetch.get(`/workspace`, _config);

    return res.data;
  },

  findOne: async (id: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const res = await Fetch.get(`/workspace/${id}`, _config);

    return res.data;
  },

  create: async (
    {
      name,
    }: {
      name: string;
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
    };

    const res = await Fetch.post(`/workspace`, data, _config);
    return res.data;
  },

  update: async (
    id: string,
    {
      name,
    }: {
      name: string;
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
    };

    const res = await Fetch.patch(`/workspace/${id}`, data, _config);

    return res.data;
  },

  remove: async (id: number, context: any = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const res = await Fetch.delete(`/workspace/${id}`, _config);
    return res.data;
  },
};
