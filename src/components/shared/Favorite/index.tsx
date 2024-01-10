import type { LiquidityType } from "utils/types";

import star_empty from "assets/images/star-empty.webp";
import star_full from "assets/images/star.webp";
import { useLiquidityStore } from "store/useLiquidityStore";

const Favorite = ({ data }: { data: LiquidityType }) => {
  const { pools, deleteLP, saveLP } = useLiquidityStore();
  const isFavorite = pools.some((pool) => pool.name === data.name);

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteLP(data);
    } else {
      saveLP(data);
    }
  };

  return (
    <div onClick={toggleFavorite} style={{ cursor: "pointer" }}>
      {isFavorite ? (
        <img src={star_full} alt="add" />
      ) : (
        <img src={star_empty} alt="remove" />
      )}
    </div>
  );
};

export default Favorite;
