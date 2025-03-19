import React from 'react';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';

const ScheduleIcon = ({ size = 64, color = '#000' }) => {
  return (
    <Svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      strokeWidth="3"
      stroke={color}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M47.22,32.79c5.71-6.65,10.12-15.39,9.44-26.21,0,0-26.18-3.94-41.87,31.65L25.43,48.87A64.38,64.38,0,0,0,35.64,43" />
      <Path d="M45.53,7.45A12.49,12.49,0,0,0,56,17.71" />
      <Circle cx="40.3" cy="22.92" r="6.2" />
      <Path d="M15.73,36.18l-5.3.68a.27.27,0,0,1-.28-.37l3.92-9A2.68,2.68,0,0,1,16,26l6.59-1.38" />
      <Path d="M27.38,47.76l-.68,5.3a.27.27,0,0,0,.37.28l9-3.92" />
      <Path d="M23.05,46.49C20.68,53.91,9,54.28,9,54.28S8.83,42.88,16.6,40" />
      <Circle cx="45.53" cy="43.04" r="10.25" />
      <Polyline points="45.53 35.84 45.53 43.36 49.11 46.11" />
    </Svg>
  );
};

export default ScheduleIcon;
