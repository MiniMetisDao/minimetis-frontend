import { BatchQueue, Options, QueryInfo } from "./types";

// Based on dataloader from here - https://github.com/graphql/dataloader.
export class Batch {
  private _batchQueue?: BatchQueue;

  constructor(private options: Options) {}

  public load(queryInfo: QueryInfo | QueryInfo[]) {
    if (!Array.isArray(queryInfo)) {
      return this._process(queryInfo);
    }

    const promises = [];
    for (const query of queryInfo) {
      promises.push(this._process(query));
    }

    return Promise.all(promises);
  }

  private _process(queryInfo: QueryInfo) {
    if (
      this._batchQueue &&
      !this._batchQueue.hasDispatched &&
      this._batchQueue.queryInfos.length < this.options.batchSize
    ) {
      return this._pushToBatchQueue(queryInfo);
    }

    const newBatch = { hasDispatched: false, queryInfos: [], callbacks: [] };
    this._batchQueue = newBatch;

    setTimeout(() => void this._dispatchBatch(newBatch), 1000);

    return this._pushToBatchQueue(queryInfo);
  }

  private _pushToBatchQueue(queryInfo: QueryInfo) {
    this._batchQueue?.queryInfos.push(queryInfo);

    const promise = new Promise<any>((resolve, reject) => {
      this._batchQueue?.callbacks.push({ resolve, reject });
    });

    return promise;
  }

  private async _dispatchBatch(batchInfo: BatchQueue) {
    batchInfo.hasDispatched = true;

    if (batchInfo.queryInfos.length === 0) {
      return;
    }

    try {
      const values = await this.options.multiCallFn(batchInfo.queryInfos);

      if (values.length !== batchInfo.queryInfos.length) {
        throw new TypeError(
          "The results length should match the query infos length"
        );
      }

      for (let i = 0; i < batchInfo.callbacks.length; i++) {
        batchInfo.callbacks[i].resolve(values[i]);
      }
    } catch (error) {
      for (let i = 0; i < batchInfo.callbacks.length; i++) {
        batchInfo.callbacks[i].reject(error);
      }
    }
  }
}
