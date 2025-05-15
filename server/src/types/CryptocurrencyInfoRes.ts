import { CryptocurrencyInfo } from "./CryptocurrencyInfo";

export type CryptocurrencyInfoRes = {
  data: {
    [key: string]: CryptocurrencyInfo[];
  }
}