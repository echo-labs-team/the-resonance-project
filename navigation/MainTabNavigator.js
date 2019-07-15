import React from 'react';
import { Platform, View } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import Colors from '../constants/Colors';
import EchoLogo from '../components/EchoLogo';
import HomeScreen from '../screens/Home';
import MediaScreen from '../screens/Media';
import EngageScreen from '../screens/Engage';
import GroupsScreen from '../screens/Groups';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
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
    left: 20,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 26,
    color: Colors.red,
  },
  headerBackImage: (
    <Feather name={'chevron-left'} size={26} color={Colors.white} />
  ),
  headerBackTitle: null,
  headerLeftContainerStyle: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <EchoLogo
      width="28"
      height="28"
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={{ marginTop: 6 }}
    />
  ),
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
    />
  ),
};

const EngageStack = createStackNavigator({
  Engage: {
    screen: EngageScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
});

EngageStack.navigationOptions = {
  tabBarLabel: 'Engage',
  tabBarIcon: ({ focused }) => (
    <MaterialIcons
      name={'compare-arrows'}
      size={30}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
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
    <MaterialIcons
      name={'group'}
      size={26}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
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
    />
  ),
};

export default createMaterialTopTabNavigator(
  {
    HomeStack,
    MediaStack,
    EngageStack,
    GroupsStack,
    GivingStack,
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    lazy: true,
    optimizationsEnabled: true,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      showIcon: true,
      showLabel: true,
      style: {
        paddingBottom: 20,
        backgroundColor: Colors.darkestGray,
      },
      labelStyle: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 10,
      },
      indicatorStyle: {
        marginBottom: 30,
        backgroundColor: Colors.red,
      },
    },
  }
);
