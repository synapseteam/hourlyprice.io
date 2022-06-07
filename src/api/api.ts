import * as axios from "axios";

import { SUCCESS_RES_CODE } from "utils/constants";

const exchangeInstance = axios.default.create({
  baseURL: "https://v6.exchangerate-api.com/v6/",
});

const apiKey = "faa4770c50dbd8f947f43e45";

export const ratesDataAPI = {
  getRates(): Promise<Record<string, string>> {
    return exchangeInstance.get(`${apiKey}/latest/USD`).then((res) => {
      if (res.status === SUCCESS_RES_CODE) {
        const { EUR, UAH } = res.data.conversion_rates;

        return { EUR, UAH };
      }
      throw new Error("Request failed. Rates were not updated 🥲");
    });
  },
};