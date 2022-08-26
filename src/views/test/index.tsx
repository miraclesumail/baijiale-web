import React from "react";
import ChipSlider from "@/components/chipSlider";
import { chips, keyframes } from "../../views/Bet/data";

const Index = () => {
  return (
    <div style={{ width: "100%" }}>
      <ChipSlider
        {...{ chipWidth: 64, chipHeight: 52, chips, displayNum: 6, gap: 25 }}
      />
    </div>
  );
};

export default Index;
