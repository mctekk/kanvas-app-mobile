import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function CloseIcon(props: SvgProps) {
  const {size = 30, color = '#fff'} = props;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.047 7.782a.5.5 0 00-.707.707l6.01 6.01-6.01 6.011a.5.5 0 00.707.707l6.01-6.01 6.01 6.01a.5.5 0 10.708-.707l-6.01-6.01 6.01-6.01a.5.5 0 00-.707-.708l-6.01 6.01-6.011-6.01z"
        fill={color}
      />
    </Svg>
  );
}

export default CloseIcon;
