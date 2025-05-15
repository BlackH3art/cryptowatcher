import axios from 'axios';
import { CryptocurrencyInfoRes } from '../types/CryptocurrencyInfoRes';
import { CryptocurrencyPriceRes } from '../types/CryptocurrencyPriceRes';

export const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v2',
});

api.interceptors.request.use((config) => {
  config.headers['X-CMC_PRO_API_KEY'] = process.env.CMC_API_KEY;
  return config;
});

export const getCoinsDetails = (tickers: string) =>
  api.get<CryptocurrencyInfoRes>('/cryptocurrency/info', {
    params: {
      symbol: tickers,
    },
  });
export const getCoinsPrices = (tickers: string) => 
  api.get<CryptocurrencyPriceRes>('/cryptocurrency/quotes/latest', {
    params: {
      symbol: tickers,
    },
  });