import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from 'styles';
import {SVGIconProps} from './icon-props';

const BackArrow = (props: SVGIconProps) => {
  const {color = Colors.WHITE, width = 26, height = 26} = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      {...props}>
      <Path fillOpacity={0.01} d="M0 0h26v26H0z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.329 12.505a.841.841 0 01.242-.699l8.44-8.56a.843.843 0 111.193 1.193L9.24 12.515l7.748 8.15a.84.84 0 01-.596 1.435.84.84 0 01-.597-.243L7.57 13.204a.842.842 0 01-.24-.7z"
        fill={color}
      />
    </Svg>
  );
};

export default BackArrow;
