import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlayIcon = ({ size = 24, color = '#1C274C' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
        fill={color}
      />
    </Svg>
  );
};

export default PlayIcon;
