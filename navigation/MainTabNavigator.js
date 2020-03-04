import React from 'react';
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Entypo, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Amplitude from 'expo-analytics-amplitude';

import Colors from '../constants/Colors';
import isTheWeekend from '../utils/isTheWeekend';
import EchoLogo from '../components/EchoLogo';
import ConnectLogo from '../components/ConnectLogo';
import GroupsLogo from '../components/GroupsLogo';

import HomeScreen from '../screens/Home';
import MediaScreen from '../screens/Media';

import ConnectScreen from '../screens/Connect';
import LocationsScreen from '../screens/Locations';
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
  headerBackground: (
    <BlurView
      style={{ flex: 1 }}
      tint="dark"
      intensity={Platform.OS === 'ios' ? 100 : 175}
    />
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
const defaultTabBarOnPress = ({
  navigation: { state: { routeName } = {} } = {},
  defaultHandler,
}) => {
  StatusBar.setHidden(routeName === 'HomeStack', 'fade');
  defaultHandler();

  Amplitude.logEventWithProperties('mobilePageView', {
    app: 'mobile',
    mainTray: routeName.replace('Stack', ''),
  });
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'ECHO',
  tabBarIcon: ({ focused }) => (
    <EchoLogo
      width={30}
      height={30}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={[styles.icon, { marginTop: -4 }]}
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
  tabBarLabel: 'MEDIA',
  tabBarIcon: ({ focused }) => (
    <Entypo
      name={'controller-play'}
      size={30}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={[styles.icon, { marginTop: -4 }]}
    />
  ),
  tabBarOnPress: defaultTabBarOnPress,
};

const ConnectStack = createStackNavigator({
  Connect: {
    screen: ConnectScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
  Locations: {
    screen: LocationsScreen,
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
  tabBarLabel: 'CONNECT',
  tabBarIcon: ({ focused }) => (
    <View style={[styles.icon, { marginTop: isTheWeekend ? -10 : -4 }]}>
      <ConnectLogo
        width={isTheWeekend ? 50 : 40}
        height={isTheWeekend ? 50 : 40}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    </View>
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
  tabBarLabel: 'GROUPS',
  tabBarIcon: ({ focused }) => (
    <GroupsLogo
      width={38}
      height={38}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={[styles.icon, { marginTop: -4 }]}
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
  tabBarLabel: 'GIVING',
  tabBarIcon: ({ focused }) => (
    <Feather
      name={'gift'}
      size={24}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={[styles.icon, { marginTop: -4 }]}
    />
  ),
  tabBarOnPress: defaultTabBarOnPress,
};

export default createBottomTabNavigator(
  {
    HomeStack,
    MediaStack,
    ConnectStack,
    GroupsStack,
    GivingStack,
  },
  {
    initialRouteName: isTheWeekend ? 'ConnectStack' : 'HomeStack',
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      style: {
        paddingTop: 10,
        borderTopColor: 'transparent',
        backgroundColor: Colors.tabBar,
      },
      labelStyle: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 10,
        includeFontPadding: false,
      },
    },
  }
);

const styles = StyleSheet.create({
  icon: { alignSelf: 'center' },
});
