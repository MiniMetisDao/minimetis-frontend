import { METIS_CONTRACT_ADDRESS } from "config";

export const isMetis = (address: string) => {
  return address.toLowerCase() === METIS_CONTRACT_ADDRESS.toLowerCase();
};
