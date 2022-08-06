import { Global } from "@emotion/react";
import React from "react";
import Rodal from "rodal";

import "rodal/lib/rodal.css";
import { styles } from "./styles";

type ModalProps = {
  title?: string;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ children, title, onClose }) => {
  const [isOpen, setIsOpen] = React.useState(true);

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
        animation="slideUp"
        onAnimationEnd={handleAnimationEnd}
        closeOnEsc
        width={500}
        customStyles={{ height: "90%" }}
      >
        <>
          {title && <h2>{title}</h2>}
          <div className="content">{children}</div>
        </>
      </Rodal>
    </>
  );
};
