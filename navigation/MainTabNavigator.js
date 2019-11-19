import React from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Entypo, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import Colors from '../constants/Colors';
import EchoLogo from '../components/EchoLogo';
import ConnectLogo from '../components/ConnectLogo';
import GroupsLogo from '../components/GroupsLogo';

import HomeScreen from '../screens/Home';
import MediaScreen from '../screens/Media';

import ConnectScreen from '../screens/Connect';
import ActivateScreen from '../screens/Activate';
import BaptismScreen from '../screens/Baptism';
import VolunteerScreen from '../screens/Volunteer';
import PrayerRequestsScreen from '../screens/PrayerRequests';
import MissionsScreen from '../screens/Missions';

import GroupsScreen from '../screens/Groups';
import GroupDetailsScreen from '../screens/GroupDetails';

import GivingScreen from '../screens/Giving';

const defaultHeaderNavigationOptions = {
  headerTransparent: true,
  headerStyle: {
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerBackground:
    Platform.OS === 'ios' ? (
      <BlurView style={{ flex: 1 }} tint="dark" intensity={98} />
    ) : (
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
    ),
  headerTitleStyle: {
    position: 'absolute',
    left: 0,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 26,
    color: Colors.red,
  },
  headerBackImage: (
    <Feather name={'chevron-left'} size={26} color={Colors.white} />
  ),
  headerBackTitle: null,
  headerLeftContainerStyle: {
    alignSelf: 'flex-end',
    marginLeft: 16,
  },
};

// need to hide the `StatusBar` on the home screen
const defaultTabBarOnPress = ({ navigation, defaultHandler }) => {
  StatusBar.setHidden(navigation.state.routeName === 'HomeStack', 'fade');
  defaultHandler();
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <EchoLogo
      width={28}
      height={28}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={{ alignSelf: 'center' }}
    />
  ),
  tabBarOnPress: defaultTabBarOnPress,
};

const MediaStack = createStackNavigator({
  Media: {
    screen: MediaScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
});

MediaStack.navigationOptions = {
  tabBarLabel: 'Media',
  tabBarIcon: ({ focused }) => (
    <Entypo
      name={'controller-play'}
      size={30}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={{ alignSelf: 'center' }}
    />
  ),
  tabBarOnPress: defaultTabBarOnPress,
};

const ConnectStack = createStackNavigator({
  Connect: {
    screen: ConnectScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
  Activate: {
    screen: ActivateScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
  Baptism: {
    screen: BaptismScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
  Volunteer: {
    screen: VolunteerScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
  PrayerRequests: {
    screen: PrayerRequestsScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
  Missions: {
    screen: MissionsScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
});

ConnectStack.navigationOptions = {
  tabBarLabel: 'Connect',
  tabBarIcon: ({ focused }) => (
    <ConnectLogo
      width={36}
      height={36}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={{ alignSelf: 'center', marginTop: -4 }}
    />
  ),
  tabBarOnPress: defaultTabBarOnPress,
};

const GroupsStack = createStackNavigator({
  Groups: {
    screen: GroupsScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
  GroupDetails: {
    screen: GroupDetailsScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
});

GroupsStack.navigationOptions = {
  tabBarLabel: 'Groups',
  tabBarIcon: ({ focused }) => (
    <GroupsLogo
      width={36}
      height={36}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={{ alignSelf: 'center', marginTop: -4 }}
    />
  ),
  tabBarOnPress: defaultTabBarOnPress,
};

const GivingStack = createStackNavigator({
  Giving: {
    screen: GivingScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
});

GivingStack.navigationOptions = {
  tabBarLabel: 'Giving',
  tabBarIcon: ({ focused }) => (
    <Feather
      name={'gift'}
      size={22}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={{ alignSelf: 'center' }}
    />
  ),
  tabBarOnPress: defaultTabBarOnPress,
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    MediaStack,
    ConnectStack,
    GroupsStack,
    GivingStack,
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: false,
    optimizationsEnabled: true,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      showIcon: true,
      showLabel: true,
      style: {
        paddingBottom: ifIphoneX ? 16 : 0,
        backgroundColor: Colors.tabBar,
      },
      labelStyle: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 9,
        includeFontPadding: false,
      },
      indicatorStyle: {
        display: 'none',
      },
    },
  }
);
