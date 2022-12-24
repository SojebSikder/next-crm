import axios, { AxiosRequestConfig } from "axios";
import { AppConfig } from "../config/app.config";
// TODO implement fetch
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

type AdapterOption = "fetch" | "axios";
/**
 * Custom fetch class
 */
export class Fetch {
  private static _baseUrl = `${AppConfig().app.apiUrl}`;
  private static _adapter: AdapterOption = "axios";

  static setAdapter(adapter: AdapterOption) {
    this._adapter = adapter;
  }
  /**
   * get request
   * @param url
   * @param header
   * @returns
   */
  static async get(url: string, header?: any) {
    if (this._adapter == "axios") {
      return await axios.get(`${this._baseUrl}${url}`, header);
    } else {
      const res = await fetch(`${this._baseUrl}${url}`, header);
      return await res.json();
    }
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
   * patch request
   * @param url
   * @param data
   * @param header
   * @returns
   */
  static async patch(url: string, data: any, header?: AxiosRequestConfig) {
    return await axios.patch(`${this._baseUrl}${url}`, data, header);
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
