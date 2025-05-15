export type CryptocurrencyPrice = {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
    }
  }
};