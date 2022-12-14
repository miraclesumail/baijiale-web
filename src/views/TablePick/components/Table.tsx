import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { Column, Row } from "@/components/flex";
import classnames from "classnames";
import CircleProgress from "@/components/circleProgress";
import RoadMap from "@/components/roadMap";
import setting from "@/assets/images/bet/setting.svg";
import casino from "@/assets/images/bet/bigCasino.svg";
import table from "@/assets/images/bet/table.svg";
import user from "@/assets/images/bet/user.svg";
import { roundData } from "@/views/Bet/data";
import { useState } from "react";

export enum DeskStatus {
  OPEN = "OPEN",
  OCCUPY = "OCCUPY",
  MAINTAIN = "MAINTAIN",
  CHANGE = "CHANGE",
}

interface Props {
  status?: DeskStatus;
  type: boolean;
}

type CircleProps = {
  width: number;
  height: number;
  borderRadius: number;
  background: string;
  marginRight?: number;
};

const Container = styled.div<any>`
  width: ${({ type }: any) => `${type ? "412px" : "549px"}`};
  height: ${({ type }: any) => `${type ? "209px" : "278px"}`};
  /* width: 549px;
  height: 278px; */
  display: flex;
  flex-direction: column;
  /* overflow: hidden; */
`;

const TabelCell = styled(Column)`
  position: relative;
  width: ${({ type }: any) => `${type ? "93%" : "95%"}`};
  height: ${({ type }: any) => `${type ? "93%" : "95%"}`};
  background: #f0f0f0;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;

  &.disable {
    cursor: default;

    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: calc(100% - 2px);
      height: 99%;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 8px 8px 0px 0px;
      border: 1px solid #f0f0f0;
    }
  }

  &.normal {
    cursor: pointer;

    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 8px 8px 0px 0px;
      border: 1px solid #fff;
      opacity: 0;
    }

    &:hover::after {
      opacity: 1;
    }
  }
`;

const StatusWrap = styled(Row)`
  position: absolute;
  width: 140px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  left: calc(50% - 70px);
  top: calc(50% - 24px);
  border: 1px solid #b99454;
  border-radius: 24px;
  font-size: 15px;
  color: #d3af6e;
  z-index: 100;

  img {
    margin-right: 5px;
  }
`;

const StartGame = styled.div`
  position: absolute;
  width: 140px;
  height: 48px;
  text-align: center;
  line-height: 48px;
  left: calc(50% - 70px);
  top: calc(50% - 24px);
  background: linear-gradient(37.21deg, #eeab47 -24.69%, #b99454 56.84%);
  border-radius: 24px;
  font-size: 15px;
  color: #fff;
  z-index: 100;
`;

const TableInfo = styled(Row)`
  width: 100%;
  height: 90px;
  background: #171717;
  padding: ${({ type }: any) => `${type ? "0 10px" : "0 15px"}`};
`;

const TableIcon = styled.div<any>`
  width: ${({ type }: any) => `${type ? "56px" : "72px"}`};
  height: ${({ type }: any) => `${type ? "42px" : "55px"}`};
  /* width: 72px;
  height: 55px; */
  margin-left: 15px;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
`;

const TableColumn = styled(Column)`
  height: ${({ type }: any) => `${type ? "50px" : "65px"}`};
  /* height: 65px; */
  width: ${({ type }: any) => `${type ? "220px" : "260px"}`};
  /* width: 260px; */
  margin-left: 16px;
  color: #faf8f4;
`;

const TopSpan = styled.span`
  background: #252822;
  border-radius: 100px;
  padding: 2px 9px;
`;

const IconRow = styled(Row)<any>`
  margin-right: ${({ type }: any) => `${type ? "6px" : "10px"}`};

  &:nth-of-type(2) {
    margin-right: ${({ type }: any) => `${type ? "10px" : "20px"}`};
  }

  img {
    width: ${({ type }: any) => `${type ? "18px" : "22px"}`};
    margin-right: ${({ type }: any) => `${type ? "6px" : "10px"}`};
  }
`;

const Circle = styled.div<CircleProps>`
  width: ${(props: CircleProps) => `${props.width}px`};
  height: ${(props: CircleProps) => `${props.height}px`};
  border-radius: ${(props: CircleProps) => `${props.borderRadius}px`};
  background: ${(props: CircleProps) => `${props.background}`};
  text-align: center;
  line-height: ${(props: CircleProps) => `${props.height}px`};
  margin-right: ${(props: CircleProps) => `${props.marginRight || 0}px`};
`;

const Table: FC<Props> = ({ status, type }) => {
  const [{ show }, setState] = useState({ show: false });

  const isDisable = useMemo(() => status !== DeskStatus.OPEN, [status]);

  const onMouseEnter = (e: MouseEvent) => setState({ show: true });

  const onMouseLeave = (e: MouseEvent) => setState({ show: false });

  const renderCircles = () => (
    <>
      <Row>
        <Circle
          {...{
            width: type ? 20 : 26,
            height: type ? 20 : 26,
            background: "#CB5460",
            borderRadius: type ? 10 : 13,
            marginRight: type ? 4 : 7,
          }}
        >
          ???
        </Circle>
        <span style={{ marginRight: "15px" }}>12</span>
      </Row>
      <Row>
        <Circle
          {...{
            width: type ? 20 : 26,
            height: type ? 20 : 26,
            background: "#4C8CED",
            borderRadius: type ? 10 : 13,
            marginRight: type ? 4 : 7,
          }}
        >
          ???
        </Circle>
        <span style={{ marginRight: "15px" }}>12</span>
      </Row>
      <Row>
        <Circle
          {...{
            width: type ? 20 : 26,
            height: type ? 20 : 26,
            background: "#538243",
            borderRadius: type ? 10 : 13,
            marginRight: type ? 4 : 7,
          }}
        >
          ???
        </Circle>
        <span style={{ marginRight: "15px" }}>12</span>
      </Row>
    </>
  );

  return (
    <Container
      ailgn={"center"}
      justify={"center"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...{ type }}
    >
      <TabelCell
        className={classnames({
          disable: isDisable,
          normal: !isDisable,
        })}
        ailgn={isDisable ? "center" : "flex-start"}
        justify={isDisable ? "center" : "flex-start"}
      >
        <TableInfo {...{ type }}>
          <CircleProgress
            {...{
              width: type ? 48 : 64,
              radius: type ? 20 : 28,
              valuesArr: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
              callback: () => {
                console.log("????????????");
              },
            }}
          />
          <TableIcon {...{ type, src: casino }} />
          <TableColumn justify="space-between" ailgn="flex-start" {...{ type }}>
            <Row style={{ width: "180px" }} justify="space-between">
              <TopSpan>??????</TopSpan>
              <TopSpan>5K-1M</TopSpan>
            </Row>

            <Row
              justify="flex-start"
              style={{ width: type ? "220px" : "260px" }}
            >
              <IconRow {...{ type }}>
                <img src={table} alt="" />
                <span>H002</span>
              </IconRow>

              <IconRow {...{ type }}>
                <img src={user} alt="" />
                <span>1</span>
              </IconRow>

              {renderCircles()}
            </Row>
          </TableColumn>
        </TableInfo>
        {type ? (
          <RoadMap dataSource={roundData} width={390} />
        ) : (
          <RoadMap dataSource={roundData} width={520} />
        )}

        {status === DeskStatus.OCCUPY && (
          <StatusWrap justify="center">?????????</StatusWrap>
        )}
        {status === DeskStatus.CHANGE && (
          <StatusWrap justify="center">?????????</StatusWrap>
        )}

        {status === DeskStatus.OPEN && show && <StartGame>????????????</StartGame>}

        {status === DeskStatus.MAINTAIN && (
          <StatusWrap justify="center">
            <img src={setting} alt="" width={19} />
            <span>?????????</span>
          </StatusWrap>
        )}
      </TabelCell>
    </Container>
  );
};

export default Table;
