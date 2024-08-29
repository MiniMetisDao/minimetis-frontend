import { css } from "@emotion/react";
import React from "react";

type Props = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Slider: React.FC<Props> = ({ onChange, value }) => {
  return (
    <div css={sliderContainerStyles}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        css={sliderStyles}
      />
    </div>
  );
};

// Estilos para el contenedor del slider
const sliderContainerStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
`;

// Estilos para el slider
const sliderStyles = css`
  -webkit-appearance: none; /* Eliminar estilos por defecto */
  appearance: none;
  width: 100%;
  height: 3px;
  background: #d3d3d3;
  outline: none;
  border-radius: 5px;
  cursor: pointer;

  /* Estilos para el thumb (selector) */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: gray;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: gray;
    cursor: pointer;
  }
`;
