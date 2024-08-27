import { Button } from "components/shared/Button";
import { useLiquidityStore } from "store/useLiquidityStore";
import { type LiquidityType, type SwapToken } from "types/common";

interface YourPoolsProps {
  liquidityPairs: LiquidityType[];
}

const YourPools = ({ liquidityPairs }: YourPoolsProps) => {
  const { selectLP } = useLiquidityStore();

  const handleCreatePool = () => {
    // Find Metis/MINIME pair
    const MINIME_METIS_LP = liquidityPairs.find(
      (pair) => pair.address === "0x76426327B68c32f5B4Dc136807635F11ebd25d06"
    );
    if (MINIME_METIS_LP) {
      const { tokens } = MINIME_METIS_LP;

      const swapTokens: SwapToken[] = [
        {
          amount: "",
          token: tokens[0],
          estimated: false,
        },
        {
          amount: "",
          token: tokens[1],
          estimated: false,
        },
      ];

      selectLP(MINIME_METIS_LP, swapTokens);
    }
  };

  const handleImportPool = () => {
    console.log("IMPORT POOL");
  };

  return (
    <div className="your-pools-container">
      <div className="your-pools">
        <h3>Dont’ see a pool you joined?</h3>
      </div>
      <div className="buttons-wrapper">
        <Button onClick={handleCreatePool}>CREATE POOL</Button>
        <Button onClick={handleImportPool}>IMPORT POOL</Button>
      </div>
    </div>
  );
};

export default YourPools;
