import minimetisFace from "assets/images/minimetisFace.png";

const LiquidityDetails = ({ liquidity }: { liquidity: boolean }) => {
  if (!liquidity)
    return (
      <div className="flex-col-center">
        <img src={minimetisFace} alt="not-liquidity" />
        <h2>No liquidity found</h2>
      </div>
    );

  return <div>LiquidityDetails</div>;
};

export default LiquidityDetails;
