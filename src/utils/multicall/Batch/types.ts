import { Provider } from "ethcall";

export type QueryInfo = {
  address: string;
  method: string;
  params?: string[];
};

export type Options = {
  batchSize: number;
  multiCallFn: (queries: QueryInfo[]) => Promise<any[]>;
};

export type Callback = {
  resolve: (value: any) => void;
  reject: (value: any) => void;
};

export type BatchQueue = {
  hasDispatched: boolean;
  queryInfos: QueryInfo[];
  callbacks: Callback[];
};
