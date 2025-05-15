export interface TokenData {
  amount: number;
  unit: string;
  description: string;
};

export type UpdateTokenData = Omit<TokenData, 'unit'> & { id: string };