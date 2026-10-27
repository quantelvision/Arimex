import generated from "./stock.generated.json";

export type StockItem = {
  thickness: number;
  width: number;
  length: number | null;
  quantity: number | null;
  grade: string;
};

type StockList = {
  asOf: string | null;
  location: string | null;
  pine: StockItem[];
  spruce: StockItem[];
};

export const stockList: StockList = generated;
