import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';

export default [
  Asset.loadAsync([
    require('./assets/images/activate.png'),
    require('./assets/images/baptism.jpg'),
    require('./assets/images/volunteer.jpg'),
    require('./assets/images/pray.jpg'),
    require('./assets/images/missions.png'),
    require('./assets/images/connect_bg.png'),
    require('./assets/images/groups_bg.png'),
    require('./assets/images/giving_bg.png'),
  ]),
  Font.loadAsync({
    // This is the font that we are using for our tab bar
    ...Icon.Ionicons.font,
    'NunitoSans-Light': require('./assets/fonts/NunitoSans-Light.ttf'),
    'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
  }),
];
