import { Global } from "@emotion/react";
import { useState } from "react";
import Rodal from "rodal";

import "rodal/lib/rodal.css";
import { styles } from "./styles";

type ModalProps = {
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <>
      <Global styles={styles} />
      <Rodal
        visible={isOpen}
        onClose={handleClose}
        onAnimationEnd={handleAnimationEnd}
        closeOnEsc
      >
        <div>{children}</div>
      </Rodal>{" "}
    </>
  );
};
