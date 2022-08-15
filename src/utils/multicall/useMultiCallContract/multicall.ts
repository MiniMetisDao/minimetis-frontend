import { ERC20Abi, RPC_URL } from "config";
import { ethers } from "ethers";
import { QueryInfo } from "utils";
import { Contract, Provider } from "utils/multicall/ethcall";

const ethcallProvider = new Provider();
const provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL);

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

    const data = await ethcallProvider?.tryAll(calls);

    // TODO: Is this formatting fine this way?
    return data?.map((record: any) => record?.toString());
  } catch (err) {
    console.error(err);
  }

  return [];
};
