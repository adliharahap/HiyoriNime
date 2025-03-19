import React from 'react';
import Svg, {Path} from 'react-native-svg';

const WaveDetailAnimeIcon = ({
  width = '100%',
  height = 100,
  color = '#ff0080',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      id="svg"
      viewBox="0 0 1440 490"
      xmlns="http://www.w3.org/2000/svg"
      class="transition duration-300 ease-in-out delay-150">
      <Path
        d="M 0,500 L 0,0 C 124.26666666666665,109.86666666666665 248.5333333333333,219.7333333333333 402,270 C 555.4666666666667,320.2666666666667 738.1333333333334,310.93333333333334 916,256 C 1093.8666666666666,201.06666666666666 1266.9333333333334,100.53333333333333 1440,0 L 1440,500 L 0,500 Z"
        stroke="none"
        stroke-width="0"
        fill={color}
        fill-opacity="1"
        class="transition-all duration-300 ease-in-out delay-150 path-0"></Path>
    </Svg>
  );
};

export default WaveDetailAnimeIcon;
