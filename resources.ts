/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

export const resources: [Promise<Asset[]>, Promise<void>] = [
  Asset.loadAsync([
    require('./assets/images/connect_bg.png'),
    require('./assets/images/fall_leaves_bg.png'),
    require('./assets/images/giving_bg.png'),
    require('./assets/images/groups_bg.png'),
  ]),
  Font.loadAsync({
    'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
    'NunitoSans-BoldItalic': require('./assets/fonts/NunitoSans-BoldItalic.ttf'),
    'NunitoSans-Light': require('./assets/fonts/NunitoSans-Light.ttf'),
    'NunitoSans-LightItalic': require('./assets/fonts/NunitoSans-LightItalic.ttf'),
    'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-RegularItalic': require('./assets/fonts/NunitoSans-RegularItalic.ttf'),
  }),
];
