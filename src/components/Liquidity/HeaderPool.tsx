import { useNavigate } from "@tanstack/react-location";
import { IoIosArrowBack } from "react-icons/io";

import { useLiquidityStore } from "store/useLiquidityStore";

export default function HeaderPool() {
  const { selectLP } = useLiquidityStore();
  const nagigate = useNavigate();

  const onReturn = () => {
    selectLP(null, []);
    nagigate({ to: "/pool", replace: true });
  };

  return (
    <div
      className="flex-row-start w-full"
      style={{ cursor: "pointer" }}
      onClick={onReturn}
    >
      <IoIosArrowBack size={24} />
      <h2>Pools</h2>
    </div>
  );
}
