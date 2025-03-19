import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const NotificationIcon = ({ size = 24, color = "#1C274C" }) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle cx="19" cy="5" r="3" stroke={color} strokeWidth="1.5" />
      <Path d="M7 14H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M7 17.5H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
};

export default NotificationIcon;