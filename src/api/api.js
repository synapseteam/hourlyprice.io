import * as axios from "axios";

const API_KEY = "6d3e6140-413a-11ec-8fa2-6b878c6b77da";

const instance = axios.create({
  baseURL: "https://freecurrencyapi.net/api/v2/",
});

export const ratesDataAPI = {
  getRates() {
    return instance.get(`latest?apikey=${API_KEY}`).then((res) => {
      if (res.status === 200) {
        const { EUR, RUB, UAH } = res.data.data;

        return { EUR, RUB, UAH };
      }
      throw new Error("Request failed. Rates were not updated 🥲");
    });
  },
};
