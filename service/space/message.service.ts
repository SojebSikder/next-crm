import { CookieHelper } from "../../helper/cookie.helper";
import { Fetch } from "../../util/Fetch";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const MessageService = {
  findAll: async ({
    last_message_id,
    workspace_id,
    workspace_channel_id,
    conversation_id,
    context = null,
  }: {
    last_message_id?: number;
    workspace_id: number;
    workspace_channel_id: number;
    conversation_id: number;
    context?: any;
  }) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    if (last_message_id) {
      return await Fetch.get(
        `/space/${workspace_id}/message/${conversation_id}?workspace_channel_id=${workspace_channel_id}&last_message_id=${last_message_id}`,
        _config
      );
    } else {
      return await Fetch.get(
        `/space/${workspace_id}/message/${conversation_id}?workspace_channel_id=${workspace_channel_id}`,
        _config
      );
    }
  },

  create: async ({
    workspace_id,
    body_text,
    workspace_channel_id,
    conversation_id,
    context = null,
  }: {
    body_text: string;
    workspace_channel_id: number;
    workspace_id: number;
    conversation_id: number;
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
      body_text: body_text,
      workspace_channel_id: workspace_channel_id,
    };

    return await Fetch.post(
      `/space/${workspace_id}/message/${conversation_id}`,
      data,
      _config
    );
  },
};
