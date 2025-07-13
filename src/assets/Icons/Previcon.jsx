import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

const PrevIcon = ({ size = 24, color = '#000' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: [{ rotate: '180deg' }] }} // 💫 Rotasi 180°
    >
      <Polygon
        points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12"
        fill={color}
      />
    </Svg>
  );
};

export default PrevIcon;
