import { Button } from "components/shared/Button";
import { useTradeNavigation } from "store/useTradeNavigation";

const YourPools = () => {
  const { setOption } = useTradeNavigation();

  return (
    <div className="your-pools-container">
      <div className="your-pools">
        <h3>Dont’ see a pool you joined?</h3>
      </div>
      <div className="buttons-wrapper">
        <Button onClick={() => setOption("create")}>CREATE POOL</Button>
        <Button onClick={() => setOption("import")}>IMPORT POOL</Button>
      </div>
    </div>
  );
};

export default YourPools;
