import React from "react";
import ChipSlider from "@/components/chipSlider";
import Zoom from "@/components/zoom";
import desk from "@/assets/images/bet/desk.png";
import { chips, keyframes } from "../../views/Bet/data";
import styled from "styled-components";

const Top = styled.div`
  width: 100%;
  height: 200px;
  background: yellowgreen;
`;

const Bottom = styled.div`
  width: 100%;
  height: 200px;
  background: pink;
`;

const Index = () => {
  return (
    // <div className="test11" style={{ height: "100vh" }}>
    <Zoom {...{ width: 1000, height: 400 }}>
      <Top>{/* <img src={desk} alt="" width={1920} /> */}</Top>
      <Bottom></Bottom>
    </Zoom>
    // </div>

    // <div style={{ width: "100%" }} className="test">
    //   <ChipSlider
    //     {...{ chipWidth: 64, chipHeight: 52, chips, displayNum: 6, gap: 25 }}
    //   />
    // </div>
  );
};

export default Index;
