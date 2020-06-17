import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';

export default [
  Asset.loadAsync([
    require('./assets/images/activate.png'),
    require('./assets/images/baptism.jpg'),
    require('./assets/images/connect_bg.png'),
    require('./assets/images/fall_leaves_bg.png'),
    require('./assets/images/giving_bg.png'),
    require('./assets/images/groups_bg.png'),
    require('./assets/images/hp-bg.jpg'),
    require('./assets/images/hp-logo.png'),
    require('./assets/images/locations.png'),
    require('./assets/images/missions.png'),
    require('./assets/images/pray.jpg'),
    require('./assets/images/rightnow_media.jpg'),
    require('./assets/images/volunteer.jpg'),
  ]),
  Font.loadAsync({
    // This is the font that we are using for our tab bar
    ...Icon.Ionicons.font,
    'NunitoSans-Light': require('./assets/fonts/NunitoSans-Light.ttf'),
    'NunitoSans-LightItalic': require('./assets/fonts/NunitoSans-LightItalic.ttf'),
    'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-RegularItalic': require('./assets/fonts/NunitoSans-RegularItalic.ttf'),
    'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
    'NunitoSans-BoldItalic': require('./assets/fonts/NunitoSans-BoldItalic.ttf'),
  }),
];
