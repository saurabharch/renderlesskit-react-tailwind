import React from "react";
import {
  cx,
  SliderInput,
  SliderThumb as RenderlessSliderThumb,
} from "@renderlesskit/react";

import { useTheme } from "..";
import { forwardRefWithAs } from "../utils/types";
import { useSliderValues } from "./hooks/useSliderValues";
import { SliderProps, useSliderPropsContext } from "./Slider";
import { BoxProps } from "../box";

type SliderThumbProps = BoxProps &
  Omit<SliderProps, "size" | "orientation" | "origin">;

export const SliderThumb = forwardRefWithAs<
  SliderThumbProps,
  HTMLDivElement,
  "div"
>(({ children, className, ...props }, ref) => {
  const theme = useTheme();

  const {
    thumbSize,
    orientation = "horizontal",
    size = "md",
    origin = 0,
  } = useSliderPropsContext();

  const { isVertical, isReversed, getThumbPercent, state } = useSliderValues({
    orientation: orientation,
    origin: origin,
  });

  const thumbHandleStyles = cx(
    theme.slider.common.thumb.base,
    theme.slider.common.thumb.size[size],
    theme.slider[orientation].thumb.base,
    className,
  );

  const thumbDynamicStyles = (index: number) => {
    const percent = getThumbPercent(index) * 100;
    const offset =
      percent -
      (thumbSize.current.height / (isVertical ? 2 : 4)) *
        getThumbPercent(index);
    const offsetPercent = `${offset}%`;

    return {
      right: isReversed ? offsetPercent : "",
      left: !isReversed && !isVertical ? offsetPercent : "",
      bottom: isVertical ? offsetPercent : "",
    };
  };

  return (
    <>
      {[...new Array(state.values.length).keys()].map(index => {
        return (
          <RenderlessSliderThumb
            ref={ref}
            key={`thumb-${index}`}
            style={thumbDynamicStyles(index)}
            index={index}
            {...state}
            {...props}
            className={thumbHandleStyles}
          >
            <SliderInput
              className={theme.slider.common.input}
              index={index}
              {...state}
            />
            {children}
          </RenderlessSliderThumb>
        );
      })}
    </>
  );
});

SliderThumb.displayName = "SliderThumb";
