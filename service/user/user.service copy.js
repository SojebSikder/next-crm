import axios from "axios";
import { AppConfig } from "../../config/app.config";
import { CookieHelper } from "../../helper/cookie.helper";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const UserService = {
  login: async ({ email, password }) => {
    const data = {
      email: email,
      password: password,
    };
    return await axios.post(`${AppConfig.apiUrl}/user/login`, data, config);
  },

  // logout user
  logout: async (context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await axios.get(`${AppConfig.apiUrl}/user/logout`, _config);
  },

  register: async ({ fname, lname, email, password, mailing }) => {
    const data = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      mailing: mailing,
    };
    return await axios.post(`${AppConfig.apiUrl}/user/register`, data, config);
  },

  // get user details
  getUserDetails: async (context = null) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    return await axios.get(`${AppConfig.apiUrl}/user`, _config);
  },

  updateUser: async ({
    fname,
    lname,
    email,
    phone,
    birth,
    gender,
    context = null,
  }) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      fname,
      lname,
      email,
      phone,
      birth,
      gender,
    };

    return await axios.put(`${AppConfig.apiUrl}/user/update`, data, _config);
  },

  forgotPassword: async ({ email }) => {
    const data = {
      email: email,
    };
    return await axios.post(
      `${AppConfig.apiUrl}/forgot-password`,
      data,
      config
    );
  },

  recoverPassword: async ({ code, password }) => {
    const data = {
      code: code,
      password: password,
    };
    return await axios.post(
      `${AppConfig.apiUrl}/recover-password`,
      data,
      config
    );
  },

  // social auth
  socialAuth: async (provider) => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await axios.get(
      `${AppConfig.apiUrl}/auth/${provider}/redirect`,
      _config
    );
  },

  // social auth callback
  socialAuthCallback: async ({ provider, query }) => {
    const _config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    return await axios.post(
      `${AppConfig.apiUrl}/auth/${provider}/callback${query}`,
      _config
    );
  },

  // phone number verification
  /**
   * Send otp for phone number verification
   * @param {*} context
   * @returns
   */
  sendPhoneVerificationOtp: async ({ phone, dial_code, context = null }) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      phone: phone,
      dial_code: dial_code,
    };

    return await axios.post(
      `${AppConfig.apiUrl}/verify/phone/send-otp`,
      data,
      _config
    );
  },

  /**
   * Verify phone number
   * @param {*} context
   * @returns
   */
  verifyPhoneVerification: async ({
    phone,
    dial_code,
    code,
    context = null,
  }) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      phone: phone,
      dial_code: dial_code,
      code: code,
    };

    return await axios.post(
      `${AppConfig.apiUrl}/verify/phone/verify`,
      data,
      _config
    );
  },

  // email verification
  /**
   * Send otp for email verification
   * @param {*} context
   * @returns
   */
  sendEmailVerificationOtp: async ({ email, context = null }) => {
    const userToken = CookieHelper.get({ key: "token", context });

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    const data = {
      email: email,
    };

    return await axios.post(
      `${AppConfig.apiUrl}/verify/email/send-otp`,
      data,
      _config
    );
  },
};
