import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default {
  isSmallDevice: width < 375,
  window: {
    height,
    width,
  },
};
