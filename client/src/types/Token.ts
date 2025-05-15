export interface Token {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  price: number;
  amount: number;
  description: string;
  favourite: boolean;
  updatedAt: Date;
  priceUpdatedAt: Date;
};
