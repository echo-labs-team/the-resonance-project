const red = '#ce2f1c';
const black = '#000';
const lightGray = '#cbd2d6';
const gray = '#b8bab8';
const blue = '#1f6276';
const green = '#36ce78';
const white = '#fff';
const darkGray = '#313d48';
const darkerGray = '#212931';
const darkestGray = '#25282c';
const darkestGray2 = '#131313';
const darkBlue = '#183f50';

const colors = {
  black,
  blue,
  darkBlue,
  darkGray,
  darkerGray,
  darkestGray,
  darkestGray2,
  errorBackground: red,
  errorText: white,
  gray,
  green,
  headerBackground: black,
  lightGray,
  noticeBackground: red,
  noticeText: white,
  red,
  tabBar: darkestGray2,
  tabIconDefault: gray,
  tabIconSelected: white,
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  white,
};

export type Color = keyof typeof colors;

export default colors;
