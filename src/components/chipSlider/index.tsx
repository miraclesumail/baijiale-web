import React, { FC, useState, useMemo } from "react";
import styled from "styled-components";
import { Row } from "../flex";
import right from "@/assets/images/bet/rightIcon.svg";
import left from "@/assets/images/bet/leftIcon.svg";

interface Props {
  chips: any[];
  displayNum: number;
  chipWidth: number;
  chipHeight: number;
  gap: number;
}

const Container = styled.div<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  overflow: hidden;
`;

const ChipWrap = styled(Row)<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  transition: transform 0.5s;
  transform: ${(props: any) => `translateX(${props.translateX}px)`};
`;

const Chip = styled.div<any>`
  width: ${(props: any) => `${props.width}px`};
  height: ${(props: any) => `${props.height}px`};
  position: relative;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  background-size: 100%;
  cursor: pointer;
`;

const Icon = styled.div<any>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: ${(props: any) => `url(${props.src}) no-repeat center`};
  visibility: ${(props: any) => (props.visible ? "visible" : "hidden")};
`;

const Index: FC<Props> = ({
  chips,
  displayNum,
  chipHeight,
  chipWidth,
  gap,
}) => {
  const [{ currentChoose, currentIndex }, setState] = useState<any>({
    currentChoose: 0,
    currentIndex: 0,
  });

  const showLeft = useMemo(() => !!currentIndex, [currentIndex]);

  const showRight = useMemo(() => currentIndex < chips.length - displayNum, [
    currentIndex,
  ]);

  const pickIndex = useMemo(() => currentChoose - currentIndex, [
    currentIndex,
    currentChoose,
  ]);

  return (
    <Row>
      <Icon
        {...{ src: left, visible: showLeft }}
        onClick={() =>
          setState((state) => ({ ...state, currentIndex: currentIndex - 1 }))
        }
      />
      <Container
        {...{
          width: chipWidth * displayNum + (displayNum - 1) * gap,
          height: chipHeight,
        }}
      >
        <ChipWrap
          {...{
            width: chips.length * chipWidth + (chips.length - 1) * gap,
            height: chipHeight,
            translateX: -currentIndex * (chipWidth + gap),
            justify: "space-between",
          }}
        >
          {chips.map(({ activeSrc, src }: any, index) => (
            <Chip
              key={index}
              onClick={() => {
                setState((state) => ({ ...state, currentChoose: index }));
              }}
              {...{
                width: chipWidth,
                height: chipHeight,
                src: index === currentChoose ? activeSrc : src,
              }}
            />
          ))}
        </ChipWrap>
      </Container>
      <Icon
        {...{ src: right, visible: showRight }}
        onClick={() =>
          setState((state) => ({ ...state, currentIndex: currentIndex + 1 }))
        }
      />
    </Row>
  );
};

export default Index;
