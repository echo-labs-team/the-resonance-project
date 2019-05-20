import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import {TimelineScreen} from './Timeline';
import {SettingsScreen} from './Settings';

const TabNavigator = createBottomTabNavigator({
  Home: TimelineScreen,
  Settings: SettingsScreen,
  Settings2: SettingsScreen
});

export default createAppContainer(TabNavigator);
