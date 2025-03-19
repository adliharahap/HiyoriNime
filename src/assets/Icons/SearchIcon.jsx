import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ size = 24, color = '#000' }) => {
  return (
    <Svg viewBox="0 -0.5 25 25" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <Path 
        d="M15.989 15.4905L19.5 19.0015" 
        stroke={color} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SearchIcon;
