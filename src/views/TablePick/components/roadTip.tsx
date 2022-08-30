import React, { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import classnames from "classnames";
import { Column, Row } from "@/components/flex";
import RoadMap from "@/components/roadMap";
import CircleProgress from "@/components/circleProgress";
import setting from "@/assets/images/bet/setting.svg";
import right from "@/assets/images/bet/rightIcon.svg";
import left from "@/assets/images/bet/leftIcon.svg";
import { useState } from "react";
import { roundData } from "@/views/Bet/data";
import { formatResultList, initCanvas } from "@/utils/tool";
import { drawBigEyeWay, Options } from "@/utils/dewdrop11";

const Container = styled(Row)`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 1030px;
  height: 180px;
  background: #0d0d0d;
  transition: transform 0.3s;
  transition-timing-function: ease-in;

  &.hide {
    transform: translate(-980px);
  }

  img {
    width: 20px;
  }
`;

const RoadWrap = styled(Row)`
  width: 930px;
  height: 180px;
  background: #f0f0f0;
`;

const Side = styled(Row)`
  width: 50px;
  height: 180px;
`;

const Right = styled(Row)`
  width: 50px;
  height: 180px;
  border-left: 1px solid #fff;
  background: #171717;
  cursor: pointer;

  img {
    width: 24px;
  }
`;

const Table = styled(Column)`
  width: 280px;
  height: 160px;
  background: #191919;
`;

const Top = styled(Row)`
  width: 100%;
  height: 106px;

  > div {
    height: 106px;
    width: 140px;
    color: #fff;

    &.type {
      padding: 0 25px 0 13px;
    }
  }
`;

const Bot = styled(Row)`
  width: 100%;
  flex: 1;
  color: #d3af6e;
`;

const textMap = {
  banker: "庄",
  player: "闲",
  tie: "和",
};
const colorMap = {
  banker: "#CB5460",
  player: "#4C8CED",
  tie: "#4ea950",
};

const bigEyeOptions: Options = {
  rows: 12,
  columns: 16,
  lineWidth: 1,
  lineColor: "rgba(211, 175, 110, 0.3)",
  cellWidth: 8.75,
  cellHeight: 8.75,
  skipOddLine: true,
  textMap,
  colorMap,
};

const Road = () => {
  const initList = formatResultList(roundData);
  const ref: MutableRefObject<any> = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = initCanvas(ref.current, false, 140, 105);
    drawBigEyeWay(ctx, initList, bigEyeOptions, [0, 0]);
  }, []);

  return (
    <Table>
      <Top>
        <Row className="type" justify="space-between">
          <CircleProgress
            {...{
              width: 48,
              radius: 20,
              valuesArr: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
              callback: () => {
                console.log("停止下注");
              },
            }}
          />
          <div>双跳</div>
        </Row>
        <canvas ref={ref} />
      </Top>
      <Bot justify="center">进入H003桌</Bot>
    </Table>
  );
};

const RoadTip = () => {
  const [{ hide }, setState] = useState({ hide: false });

  const toggleHide = () => setState((state) => ({ ...state, hide: !hide }));

  return (
    <Container
      className={classnames({
        hide,
      })}
    >
      <Side justify="center">
        <img src={setting} alt="" />
      </Side>
      <RoadWrap>
        <Road />
      </RoadWrap>
      <Right justify="center" onClick={toggleHide}>
        <img src={left} alt="" />
      </Right>
    </Container>
  );
};

export default RoadTip;
