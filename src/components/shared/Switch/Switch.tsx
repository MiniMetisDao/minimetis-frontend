import ReactSwitch from "react-switch";

import { styles } from "./styles";

type SwitchProps = {
  onChange: (checked: boolean) => void;
  checked: boolean;
};

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => (
  <ReactSwitch
    css={styles}
    onChange={onChange}
    checkedIcon={false}
    uncheckedIcon={false}
    checked={checked}
    boxShadow="0 0 5px #606060"
    activeBoxShadow="0 0 5px #008800"
  />
);
