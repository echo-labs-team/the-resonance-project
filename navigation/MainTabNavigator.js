import React from 'react';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';

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

const defaultHeaderNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.darkestGray,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    marginLeft: -200,
    alignSelf: 'flex-start',
    fontSize: 26,
    color: Colors.red,
  },
  headerBackImage: <HeaderBackImage />,
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
      width={28}
      height={28}
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
        fontSize: 10,
      },
      indicatorStyle: {
        marginBottom: 30,
        backgroundColor: Colors.red,
      },
    },
  }
);
