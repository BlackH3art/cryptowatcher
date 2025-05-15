import { CryptocurrencyPrice } from "./CryptocurrencyPrice";

export type CryptocurrencyPriceRes = {
  data: {
    [key: string]: CryptocurrencyPrice[];
  }
};