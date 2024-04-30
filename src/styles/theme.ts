import { Colors } from "styles";

interface ColorTheme {
  primary: string;
  onPrimary: string;
  text: string;
  onSurface: string;
  background: string;
}
export const COLOR: ColorTheme = {
  primary: Colors.PRIMARY,
  background: Colors.WHITE,
  text: Colors.SOFT_BLACK,
  surface: '#fff',
  onSurface: '#000',
};
interface SpacingTheme {
  base: number;
  double: number;
}
export const SPACING: SpacingTheme = {
  base: 8,
  double: 16,
};