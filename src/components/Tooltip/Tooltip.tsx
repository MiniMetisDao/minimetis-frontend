import React from "react";
import { usePopper } from "react-popper";

import { styles } from "./styles";

type TooltipProps = {
  content: React.ReactNode | string;
  children: React.ReactElement;
};

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [refElement, setRefElement] = React.useState<HTMLDivElement | null>(
    null
  );

  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  );

  const { styles: popperStyles, attributes } = usePopper(
    refElement,
    popperElement,
    {
      modifiers: [{ name: "arrow", options: { element: arrowElement } }],
    }
  );

  return (
    <>
      {React.cloneElement(children, { ref: setRefElement })}

      <div
        css={styles}
        ref={setPopperElement}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        {content}
        <div
          className="arrow"
          ref={setArrowElement}
          style={popperStyles.arrow}
        />
      </div>
    </>
  );
};
