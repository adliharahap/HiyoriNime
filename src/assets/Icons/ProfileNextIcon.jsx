import React from "react";
import Svg, { Polyline } from "react-native-svg";

const ProfileNextIcon = ({ size = 24, color = "black" }) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Polyline points="7 2 17 12 7 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default ProfileNextIcon;
