import { Global } from "@emotion/react";
import React from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import ReactTooltip from "react-tooltip";

import { styles, tooltipStyles } from "./styles";

type TooltipProps = {
  id: string;
  content: React.ReactNode | string;
  children: React.ReactElement;
  infoIcon?: never;
};

type TooltipInfoIconProps = {
  id: string;
  content: React.ReactNode | string;
  children?: never;
  infoIcon: boolean;
};

export const Tooltip: React.FC<TooltipProps | TooltipInfoIconProps> = ({
  children,
  content,
  id,
  infoIcon,
}) => {
  const tooltipTargetProps = { "data-tip": true, "data-for": id };

  return (
    <div css={styles}>
      <Global styles={tooltipStyles} />
      {infoIcon ? (
        <span className="info-icon">
          <IoIosHelpCircleOutline {...tooltipTargetProps} />
        </span>
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        React.cloneElement(children!, tooltipTargetProps)
      )}

      <ReactTooltip id={id} place="right" effect="solid">
        {content}
      </ReactTooltip>
    </div>
  );
};
