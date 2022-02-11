import * as axios from "axios";

import { SUCCESS_RES_CODE } from "utils/constants";

const instance = axios.create({
  baseURL: "https://freecurrencyapi.net/api/v2/",
});

export const ratesDataAPI = {
  getRates() {
    return instance.get(`latest?apikey=${process.env.API_KEY}`).then((res) => {
      if (res.status === SUCCESS_RES_CODE) {
        const { EUR, RUB, UAH } = res.data.data;

        return { EUR, RUB, UAH };
      }
      throw new Error("Request failed. Rates were not updated 🥲");
    });
  },
};
