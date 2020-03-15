import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import Colors from '../constants/Colors';
import isTheWeekend from '../utils/isTheWeekend';
import EchoLogo from '../components/EchoLogo';
import ConnectLogo from '../components/ConnectLogo';
import GroupsLogo from '../components/GroupsLogo';

/**
 * Home Tab
 */
import HomeScreen from '../screens/Home';

/**
 * Media Tab
 */
import MediaScreen from '../screens/Media';

/**
 * Connect Tab
 */
import ConnectScreen from '../screens/Connect';
import LocationsScreen from '../screens/Locations';
import ActivateScreen from '../screens/Activate';
import BaptismScreen from '../screens/Baptism';
import VolunteerScreen from '../screens/Volunteer';
import PrayerRequestsScreen from '../screens/PrayerRequests';
import MissionsScreen from '../screens/Missions';

/**
 * Groups Tab
 */
import GroupsScreen from '../screens/Groups';
import GroupDetailsScreen from '../screens/GroupDetails';

/**
 * Giving Tab
 */
import GivingScreen from '../screens/Giving';

const defaultOptions = {
  headerTransparent: true,
  headerStyle: {
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerBackground: () => (
    <BlurView
      style={StyleSheet.absoluteFill}
      tint="dark"
      intensity={Platform.OS === 'ios' ? 100 : 175}
    />
  ),
  headerTitleStyle: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 24,
    color: Colors.white,
  },
  headerBackImage: () => (
    <Feather name={'chevron-left'} size={30} color={Colors.white} />
  ),
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {
    alignSelf: 'flex-end',
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
};

const ConnectStack = createStackNavigator();

function ConnectStackScreen() {
  return (
    <ConnectStack.Navigator>
      <ConnectStack.Screen
        name="Connect"
        component={ConnectScreen}
        options={{ headerShown: false }}
      />
      <ConnectStack.Screen
        name="Locations"
        component={LocationsScreen}
        options={defaultOptions}
      />
      <ConnectStack.Screen
        name="Activate"
        component={ActivateScreen}
        options={defaultOptions}
      />
      <ConnectStack.Screen
        name="Baptism"
        component={BaptismScreen}
        options={defaultOptions}
      />
      <ConnectStack.Screen
        name="Volunteer"
        component={VolunteerScreen}
        options={defaultOptions}
      />
      <ConnectStack.Screen
        name="Prayer Requests"
        component={PrayerRequestsScreen}
        options={defaultOptions}
      />
      <ConnectStack.Screen
        name="Missions"
        component={MissionsScreen}
        options={defaultOptions}
      />
    </ConnectStack.Navigator>
  );
}

const GroupsStack = createStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen
        name="Groups"
        component={GroupsScreen}
        options={{ headerShown: false }}
      />
      <GroupsStack.Screen
        name="GroupDetails"
        component={GroupDetailsScreen}
        options={{ ...defaultOptions, headerTitle: null }}
      />
    </GroupsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={isTheWeekend ? 'Connect' : 'Home'}
        tabBarOptions={{
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
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'ECHO',
            tabBarIcon: ({ size, color }) => (
              <EchoLogo width={size} height={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Media"
          component={MediaScreen}
          options={{
            tabBarLabel: 'MEDIA',
            tabBarIcon: ({ color, size }) => (
              <Entypo name={'controller-play'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectStackScreen}
          options={{
            tabBarLabel: 'CONNECT',
            tabBarIcon: ({ color }) => (
              <ConnectLogo width={34} height={34} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupsStackScreen}
          options={{
            tabBarLabel: 'GROUPS',
            tabBarIcon: ({ color }) => (
              <GroupsLogo width={34} height={34} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Giving"
          component={GivingScreen}
          options={{
            tabBarLabel: 'GIVING',
            tabBarIcon: ({ color, size }) => (
              <Feather name={'gift'} size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
