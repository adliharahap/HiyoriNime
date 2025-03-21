import React from "react";
import Svg, { Path } from "react-native-svg";

const StarIcon = ({ size = 32, color = "#FE9803" }) => {
  return (
    <Svg viewBox="0 0 32 32" width={size} height={size} fill={color}>
      <Path d="M30.9,10.6C30.8,10.2,30.4,10,30,10h0h-9l-4.1-8.4C16.7,1.2,16.4,1,16,1v0c0,0,0,0,0,0 c-0.4,0-0.7,0.2-0.9,0.6L11,10H2c-0.4,0-0.8,0.2-0.9,0.6c-0.2,0.4-0.1,0.8,0.2,1.1l6.6,7.6L5,29.7c-0.1,0.4,0,0.8,0.3,1 s0.7,0.3,1.1,0.1l9.6-4.6l9.6,4.6C25.7,31,25.8,31,26,31h0h0h0c0.5,0,1-0.4,1-1c0-0.2,0-0.3-0.1-0.5l-2.8-10.3l6.6-7.6 C31,11.4,31.1,10.9,30.9,10.6z" />
    </Svg>
  );
};

export default StarIcon;
