import generated from "./stock.generated.json";

export type StockSize = {
  thickness: number;
  width: number;
  quantity: number | null;
  grade: string | null;
};

type StockSizes = {
  pine: StockSize[];
  spruce: StockSize[];
};

// TODO(client): stock.xlsx holds dummy sizes, quantities and grades from the reference site, replace them with the AriMex list (open question 11)
export const stockSizes: StockSizes = generated;
