import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {HomeScreen} from './Home';
import {MediaScreen} from './Media';
import {GroupsScreen} from './Groups';
import {EngageScreen} from './Engage';
import {GivingScreen} from './Giving';

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Media: MediaScreen,
  Groups: GroupsScreen,
  Engage: EngageScreen,
  Giving: GivingScreen
});

export default createAppContainer(TabNavigator);
