import axios, { AxiosRequestConfig } from "axios";
import { AppConfig } from "../config/app.config";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Custom fetch class
 */
export class Fetch {
  private static _baseUrl = `${AppConfig().app.apiUrl}`;

  /**
   * get request
   * @param url
   * @param header
   * @returns
   */
  static async get(url: string, header?: AxiosRequestConfig) {
    return await axios.get(`${this._baseUrl}${url}`, header);
  }

  /**
   * post request
   * @param url
   * @param data
   * @param header
   * @returns
   */
  static async post(url: string, data: any, header?: AxiosRequestConfig) {
    return await axios.post(`${this._baseUrl}${url}`, data, header);
  }

  /**
   * put request
   * @param url
   * @param data
   * @param header
   * @returns
   */
  static async put(url: string, data: any, header?: AxiosRequestConfig) {
    return await axios.put(`${this._baseUrl}${url}`, data, header);
  }

  /**
   * delete request
   * @param url
   * @param header
   * @returns
   */
  static async delete(url: string, header?: AxiosRequestConfig) {
    return await axios.delete(`${this._baseUrl}${url}`, header);
  }
}
