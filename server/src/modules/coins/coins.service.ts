import { getCoinsDetails, getCoinsPrices } from '../../api/api';

export const getCoinsDetailsForTickers = async (tickers: string) => {
  return (await getCoinsDetails(tickers)).data;
};

export const getCoinsPricesForTickers = async (tickers: string) => {
  return (await getCoinsPrices(tickers)).data;
};