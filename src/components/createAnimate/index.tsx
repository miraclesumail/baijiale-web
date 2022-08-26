import React, {
  CSSProperties,
  ReactNode,
  FC,
  MutableRefObject,
  useRef,
  useEffect,
  forwardRef,
  ForwardRefExoticComponent,
} from "react";
import ReactDOM from "react-dom/client";
import styled from "styled-components";

interface AnimateProps {
  keyframes: CSSProperties[];
  Cmp: ForwardRefExoticComponent<any>,
  options: any;
  onFinish?: () => void;
  children: ReactNode;
  contentClass?: string;
  styles: any;
}

const Chip = styled.div<any>`
  width: 40px;
  height: 33px;
  position: relative;
  cursor: pointer;
`;

interface Place {
  left: number;
  top: number;
  src: string;
}

type Props = {
  title: string;
  children?: JSX.Element | JSX.Element[];
};

const AnimateElement: FC<AnimateProps> = ({
  keyframes,
  options,
  children,
  Cmp,
  onFinish,
  styles,
}) => {
  const imgRef: MutableRefObject<any> = useRef<HTMLImageElement>(null);
  const animationRef: MutableRefObject<any> = useRef<Animation>();

  useEffect(() => {
    animationRef.current = imgRef.current.animate(keyframes, options);

    animationRef.current.onfinish = (e: AnimationPlaybackEvent) => {
      onFinish && onFinish();
    };

    return () => (animationRef.current as Animation).cancel();
  }, []);

  return (
    <Cmp ref={imgRef} {...styles}>
      {children}
    </Cmp>
  );
};

AnimateElement.displayName = "AnimateElement";

interface ElementStyle {
  wrapClass: string;
  contentClass: string;
}

export const createAnimateNode = (
  params: AnimateProps,
  parent: HTMLElement,
  cls?: ElementStyle
) => {
  const div = document.createElement("div");

  console.log("---00---");

  parent.appendChild(div);
  const root = ReactDOM.createRoot(div);

  function onFinish() {
    root.unmount();
    div.remove();
    params.onFinish && params.onFinish();
  }

  root.render(<AnimateElement {...{ ...params, onFinish }} />);
};

export default AnimateElement;
