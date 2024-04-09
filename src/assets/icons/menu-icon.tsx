import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import { Colors } from 'styles';

const MenuIcon = (props: SvgProps) => {
  const {fill = 'none', width = 25, height = 25, color = Colors.WHITE } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 20 20"
      {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M18 5a1 1 0 1 0 0-2H2a1 1 0 0 0 0 2h16zm-8 4a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h8zm9 3a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h16a1 1 0 0 1 1 1zm-9 5a1 1 0 1 0 0-2H2a1 1 0 1 0 0 2h8z"
      />
    </Svg>
  );
};

export default MenuIcon;
