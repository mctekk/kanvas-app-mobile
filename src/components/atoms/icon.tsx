/* eslint-disable prettier/prettier */
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ICON_DEFAULT_SIZE } from 'utils/constants';


const VectorIcons = {
  MaterialIcons,
  EvilIcons,
  Entypo,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
  Octicons,
  SimpleLineIcons,
  AntDesign,
  Feather,
};

interface IconProps {
  iconType: 'MaterialIcons' | 'EvilIcons' | 'Entypo' | 'FontAwesome' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'Zocial' | 'Octicons' | 'SimpleLineIcons' | 'AntDesign' | 'Feather'
  name: string,
  size: number,
  color?: string
}

interface IconStyleProps {
  style?: object
}

const Icon = (props: IconProps & IconStyleProps) => {
  const {
    iconType = 'Ionicons',
    name,
    size,
    color,
    style,
  } = props;

  const VectorIcon = VectorIcons[iconType];
  return (
    <VectorIcon
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};


export {
  VectorIcons as VectorIconsTypes,
  IconProps as VectorIconProps,
  ICON_DEFAULT_SIZE as VectorIconDefaultSize,
};

export default Icon;
