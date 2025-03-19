import React from "react";
import { Svg, Path } from "react-native-svg";

const NextIcon = ({ size = 24, color = "#000" }) => {
  return (
    <Svg fill="none" viewBox="0 0 24 24" width={size} height={size}>
      <Path
        d="M17,12,5,21V3Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
};

export default NextIcon;