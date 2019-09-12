import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const textStyles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.white,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.white,
  },
  body: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'NunitoSans-Light',
    color: Colors.white,
  },
});
export default textStyles;
