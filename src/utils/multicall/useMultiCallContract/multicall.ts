import { Contract, Provider } from "ethcall";

import { ERC20Abi, METIS_RPC_URL } from "config";
import { ethers } from "ethers";
import { QueryInfo } from "utils";

const ethcallProvider = new Provider();
const provider = new ethers.providers.StaticJsonRpcProvider(METIS_RPC_URL);

export const multicall = async (queryInfos: readonly QueryInfo[]) => {
  try {
    const calls = queryInfos.map(
      ({ address, method, abi = ERC20Abi, params = [] }) => {
        const contract = new Contract(address, abi);
        const balanceCall = contract[method](...params);

        return balanceCall;
      }
    );

    await ethcallProvider.init(provider);

    const data = await ethcallProvider?.all(calls);

    // TODO: Is this formatting fine this way?
    return data?.map((record: any) => record?.toString());
  } catch (err) {
    console.error(err);
  }

  return [];
};
