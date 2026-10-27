import generated from "./stock.generated.json";

export type StockSize = {
  thickness: number;
  width: number;
};

type StockSizes = {
  pine: StockSize[];
  spruce: StockSize[];
};

// TODO(client): stock.xlsx holds dummy sizes from the reference site, replace them with the AriMex list (open question 11)
export const stockSizes: StockSizes = generated;
