import { Platform } from 'react-native';
import { scaleFont } from './mixins';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_MEDIUM = '600';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE

export const FONT_SIZE_6 = scaleFont(6);
export const FONT_SIZE_9 = scaleFont(9);
export const FONT_SIZE_8 = scaleFont(8);
export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_11 = scaleFont(11);
export const FONT_SIZE_12 = scaleFont(12);
export const FONT_SIZE_13 = scaleFont(13);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_15 = scaleFont(15);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_17 = scaleFont(17);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_19 = scaleFont(19);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_21 = scaleFont(21);
export const FONT_SIZE_22 = scaleFont(22);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_26 = scaleFont(26);
export const FONT_SIZE_27 = scaleFont(27);
export const FONT_SIZE_28 = scaleFont(28);
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_36 = scaleFont(36);
export const FONT_SIZE_40 = scaleFont(40);
export const FONT_SIZE_46 = scaleFont(46);

export const FontSize = {
  FONT_SIZE_6,
  FONT_SIZE_9,
  FONT_SIZE_10,
  FONT_SIZE_11,
  FONT_SIZE_12,
  FONT_SIZE_13,
  FONT_SIZE_14,
  FONT_SIZE_15,
  FONT_SIZE_16,
  FONT_SIZE_17,
  FONT_SIZE_18,
  FONT_SIZE_28,
  FONT_SIZE_22,
  FONT_SIZE_20,
};

// FONT FAMILY

export enum GibsonFont {
  Gibson = 'Gibson',
  GibsonRegular = 'Gibson-Regular',
  GibsonItalic = 'Gibson-Italic',
  GibsonMedium = 'Gibson-Medium',
  GibsonBold = 'Gibson-Bold',
  GibsonBoldItalic = 'Gibson-BoldItalic',
  GibsonLight = 'Gibson-Light',
  GibsonSemBd = 'Gibson SemBd',
  GibsonSemiBold = 'Gibson-SemiBold',
}

export enum ZillaSlabFont {
  ZillaSlab = 'ZillaSlab',
  ZillaSlabRegular = 'ZillaSlab-Regular',
  ZillaSlabItalic = 'ZillaSlab-Italic',
  ZillaSlabMedium = 'ZillaSlab-Medium',
  ZillaSlabBold = 'ZillaSlab-Bold',
  ZillaSlabBoldItalic = 'ZillaSlab-BoldItalic',
  ZillaSlabLight = 'ZillaSlab-Light',
  ZillaSlabSemBd = 'ZillaSlab SemBd',
  ZillaSlabSemiBold = 'ZillaSlab-SemiBold',
}

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: GibsonFont.GibsonRegular,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: GibsonFont.GibsonBold,
  fontWeight: FONT_WEIGHT_BOLD,
};
