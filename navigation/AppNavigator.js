import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ErrorBoundary } from 'react-error-boundary';
import Colors from '../constants/Colors';
import { Text } from '../components/shared/Typography';
import EchoLogo from '../components/EchoLogo';
import ConnectLogo from '../components/ConnectLogo';
import GroupsLogo from '../components/GroupsLogo';
import ErrorFallback, { handleError } from '../components/shared/ErrorFallback';

/**
 * Home Tab
 */
import HomeScreen from '../screens/Home';

/**
 * Connect Tab
 */
import ConnectScreen from '../screens/Connect';

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
  headerTitle: (props) => (
    <Text
      {...props}
      L
      adjustsFontSizeToFit
      allowFontScaling={false}
      numberOfLines={1}
      style={{ paddingHorizontal: 16 }}
    >
      {props.children}
    </Text>
  ),
  headerBackImage: () => (
    <Feather name={'chevron-left'} size={30} color={Colors.lightGray} />
  ),
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {
    alignSelf: 'flex-end',
    paddingLeft: Platform.OS === 'ios' ? 10 : 0,
    marginBottom: 16,
  },
};

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </ErrorBoundary>
  );
}

const ConnectStack = createStackNavigator();

function ConnectStackScreen() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <ConnectStack.Navigator>
        <ConnectStack.Screen
          name="Connect"
          component={ConnectScreen}
          options={{ headerShown: false }}
        />
      </ConnectStack.Navigator>
    </ErrorBoundary>
  );
}

const GroupsStack = createStackNavigator();

function GroupsStackScreen() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <GroupsStack.Navigator>
        <GroupsStack.Screen
          name="Groups"
          component={GroupsScreen}
          options={{ headerShown: false }}
        />
        <GroupsStack.Screen
          name="GroupDetails"
          component={GroupDetailsScreen}
          options={{ ...defaultOptions, headerTitle: '' }}
        />
      </GroupsStack.Navigator>
    </ErrorBoundary>
  );
}

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.tabIconSelected,
  tabBarInactiveTintColor: Colors.tabIconDefault,
  tabBarLabelStyle: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 10,
    includeFontPadding: false,
  },
  tabBarStyle: {
    paddingTop: 10,
    borderTopColor: 'transparent',
    backgroundColor: Colors.tabBar,
  },
  tabBarAllowFontScaling: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={'Home'}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'ECHO',
            tabBarIcon: ({ size, color }) => (
              <EchoLogo width={size} height={size} color={color} />
            ),
            ...tabBarOptions,
          }}
        />
        <Tab.Screen
          name="ConnectStack"
          component={ConnectStackScreen}
          options={{
            tabBarLabel: 'CONNECT',
            tabBarIcon: ({ color }) => (
              <ConnectLogo width={34} height={34} color={color} />
            ),
            ...tabBarOptions,
          }}
        />
        <Tab.Screen
          name="GroupsStack"
          component={GroupsStackScreen}
          options={{
            tabBarLabel: 'GROUPS',
            tabBarIcon: ({ color }) => (
              <GroupsLogo width={34} height={34} color={color} />
            ),
            ...tabBarOptions,
          }}
        />
        <Tab.Screen
          name="GivingStack"
          component={GivingScreen}
          options={{
            tabBarLabel: 'GIVING',
            tabBarIcon: ({ color, size }) => (
              <Feather name={'gift'} size={size} color={color} />
            ),
            ...tabBarOptions,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
