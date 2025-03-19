import React from "react";
import Svg, { Path } from "react-native-svg";

const LicenseIcon = ({ size = 24, color = "black" }) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Path
        d="M6 3H18V21L12 17L6 21V3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9 9H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M9 13H13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

export default LicenseIcon;
