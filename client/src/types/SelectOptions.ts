export interface SelectOption {
  unit: string;
  value: number;
};

export interface SelectOptions {
  [ticker: string]: SelectOption[];
}