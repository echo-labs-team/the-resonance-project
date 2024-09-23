import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { ErrorBoundary } from 'react-error-boundary';
import { Platform, StyleSheet } from 'react-native';
import ConnectLogo from '../components/ConnectLogo';
import EchoLogo from '../components/EchoLogo';
import GroupsLogo from '../components/GroupsLogo';
import ErrorFallback, { handleError } from '../components/shared/ErrorFallback';
import Colors, { Color } from '../constants/Colors';
import ConnectScreen from '../screens/Connect';
import GivingScreen from '../screens/Giving';
import GroupDetailsScreen from '../screens/GroupDetails';
import GroupsScreen from '../screens/Groups';
import HomeScreen from '../screens/Home';

function BackButtonIcon() {
  return <Feather color={Colors.lightGray} name="chevron-left" size={30} />;
}

function HeaderBackground() {
  return (
    <BlurView
      intensity={Platform.OS === 'ios' ? 100 : 175}
      style={StyleSheet.absoluteFill}
      tint="dark"
    />
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          component={HomeScreen}
          name="Home"
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
          component={ConnectScreen}
          name="Connect"
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
          component={GroupsScreen}
          name="Groups"
          options={{ headerShown: false }}
        />
        <GroupsStack.Screen
          component={GroupDetailsScreen}
          name="GroupDetails"
          options={{
            headerBackImage: BackButtonIcon,
            headerBackTitleVisible: false,
            headerBackground: HeaderBackground,
            headerLeftContainerStyle: {
              alignSelf: 'flex-end',
              marginBottom: 16,
              paddingLeft: Platform.OS === 'ios' ? 10 : 0,
            },
            headerStyle: {
              borderBottomWidth: 0,
              shadowColor: 'transparent',
            },
            headerTitle: '',
            headerTransparent: true,
          }}
        />
      </GroupsStack.Navigator>
    </ErrorBoundary>
  );
}

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.tabIconSelected,
  tabBarAllowFontScaling: false,
  tabBarInactiveTintColor: Colors.tabIconDefault,
  tabBarLabelStyle: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 10,
    includeFontPadding: false,
  },
  tabBarStyle: {
    backgroundColor: Colors.tabBar,
    borderTopColor: 'transparent',
    paddingTop: 10,
  },
};

function EchoTabBarIcon({ color, size }: { color: string; size: number }) {
  return <EchoLogo color={color as Color} height={size} width={size} />;
}
function ConnectTabBarIcon({ color }: { color: string }) {
  return <ConnectLogo color={color as Color} height={34} width={34} />;
}
function GroupsTabBarIcon({ color }: { color: string }) {
  return <GroupsLogo color={color as Color} height={34} width={34} />;
}
function GivingTabBarIcon({ color, size }: { color: string; size: number }) {
  return <Feather color={color} name="gift" size={size} />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          component={HomeStackScreen}
          name="HomeStack"
          options={{
            tabBarIcon: EchoTabBarIcon,
            tabBarLabel: 'ECHO',
            ...tabBarOptions,
          }}
        />
        <Tab.Screen
          component={ConnectStackScreen}
          name="ConnectStack"
          options={{
            tabBarIcon: ConnectTabBarIcon,
            tabBarLabel: 'CONNECT',
            ...tabBarOptions,
          }}
        />
        <Tab.Screen
          component={GroupsStackScreen}
          name="GroupsStack"
          options={{
            tabBarIcon: GroupsTabBarIcon,
            tabBarLabel: 'GROUPS',
            ...tabBarOptions,
          }}
        />
        <Tab.Screen
          component={GivingScreen}
          name="GivingStack"
          options={{
            tabBarIcon: GivingTabBarIcon,
            tabBarLabel: 'GIVING',
            ...tabBarOptions,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
