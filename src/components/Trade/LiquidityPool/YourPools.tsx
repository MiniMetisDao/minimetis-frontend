import { Button } from "components/shared/Button";

const YourPools = () => {
  return (
    <div className="your-pools-container">
      <div className="your-pools">
        <h3>Dont’ see a pool you joined?</h3>
      </div>
      <div className="buttons-wrapper">
        <Button>CREATE POOL</Button>
        <Button>IMPORT POOL</Button>
      </div>
    </div>
  );
};

export default YourPools;
