import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import EchoLogo from '../components/EchoLogo';
import HomeScreen from '../screens/Home';
import MediaScreen from '../screens/Media';
import EngageScreen from '../screens/Engage';
import GroupsScreen from '../screens/Groups';
import GivingScreen from '../screens/Giving';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <EchoLogo
      width={30}
      height={30}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      style={{ marginBottom: -3 }}
    />
  ),
  tabBarOptions: { activeTintColor: Colors.tabIconSelected },
};

const MediaStack = createStackNavigator({
  Media: MediaScreen,
});

MediaStack.navigationOptions = {
  tabBarLabel: 'Media',
  tabBarIcon: ({ focused }) => (
    <Entypo
      name={'folder-video'}
      size={24}
      style={{ marginBottom: -6 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
  tabBarOptions: { activeTintColor: Colors.tabIconSelected },
};

const EngageStack = createStackNavigator({
  Engage: EngageScreen,
});

EngageStack.navigationOptions = {
  tabBarLabel: 'Engage',
  tabBarIcon: ({ focused }) => (
    <AntDesign
      name={'message1'}
      size={24}
      style={{ marginBottom: -6 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
  tabBarOptions: { activeTintColor: Colors.tabIconSelected },
};

const GroupsStack = createStackNavigator({
  Groups: GroupsScreen,
});

GroupsStack.navigationOptions = {
  tabBarLabel: 'Groups',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name={'account-group'}
      size={34}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
  tabBarOptions: { activeTintColor: Colors.tabIconSelected },
};

const GivingStack = createStackNavigator({
  Giving: GivingScreen,
});

GivingStack.navigationOptions = {
  tabBarLabel: 'Giving',
  tabBarIcon: ({ focused }) => (
    <Feather
      name={'gift'}
      size={24}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
  tabBarOptions: { activeTintColor: Colors.tabIconSelected },
};

export default createBottomTabNavigator({
  HomeStack,
  MediaStack,
  EngageStack,
  GroupsStack,
  GivingStack,
});
