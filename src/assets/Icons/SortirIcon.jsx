import React from "react";
import Svg, { Path, G, ClipPath, Defs, Rect } from "react-native-svg";

const SortirIcon = ({ size = 24, color = "#292929" }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          d="M4 6H20M10 12H20M16 18H20"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default SortirIcon;
