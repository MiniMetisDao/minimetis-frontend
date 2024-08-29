import React from "react";

import { type Button } from "components/shared/Button";
import { Slider } from "components/shared/Slider";

interface Button {
  label: string;
  amount: number;
}
const BUTTONS_AMOUNT: Button[] = [
  { label: "25%", amount: 25 },
  { label: "50%", amount: 50 },
  { label: "75%", amount: 75 },
  { label: "MAX", amount: 100 },
];

interface SliderAmountProps {
  value: number;
  updateValue: (value: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SliderAmount({
  onChange,
  updateValue,
  value,
}: SliderAmountProps) {
  return (
    <div className="slider-wrapper">
      <p>Amount</p>
      <p id="text-xl">{`${value}%`}</p>
      <Slider value={value} onChange={onChange} />
      <div className="percentage-wrapper">
        {BUTTONS_AMOUNT.map(({ amount, label }) => (
          <button type="button" key={label} onClick={() => updateValue(amount)}>
            {label}%
          </button>
        ))}
      </div>
    </div>
  );
}
