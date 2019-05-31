import React from 'react';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
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

const HeaderBackImage = () => (
  <Feather name={'chevron-left'} size={26} color={Colors.white} />
);

const defaultHeaderNavigationOptions = () => ({
  headerStyle: {
    backgroundColor: Colors.darkGray,
    height: 40,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontSize: 22,
    marginHorizontal: 32,
    marginBottom: 12,
    alignSelf: 'flex-end',
    color: Colors.white,
  },
  headerBackImage: <HeaderBackImage />,
  headerLeftContainerStyle: {
    alignSelf: 'flex-end',
    marginLeft: 16,
    marginTop: 8,
  },
});

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
      name={'folder-video'}
      size={24}
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
    <AntDesign
      name={'message1'}
      size={24}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

const GroupsStack = createStackNavigator({
  Groups: {
    screen: GroupsScreen,
    navigationOptions: defaultHeaderNavigationOptions,
  },
});

GroupsStack.navigationOptions = {
  tabBarLabel: 'Groups',
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name={'account-group'}
      size={28}
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
      size={24}
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
    optimizationsEnabled: true,
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: Colors.darkestGray,
      },
      indicatorStyle: {
        backgroundColor: Colors.red,
      },
    },
  }
);
