/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Button } from 'react-native';
import { BlurView } from 'expo-blur';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { storiesOf } from '@storybook/react-native';
import { styles } from '../screens/Groups';
import GroupCardDetails from './GroupCardDetails';

const item = {
  Name: 'Group Name',
  GroupCampus: 'North San Jose',
  FriendlyScheduleText: 'Friday @ 5pm',
  Description: 'Group description',
};

const Stack = createStackNavigator();
const containerStyles = {
  padding: 10,
  flex: 1,
  justifyContent: 'center',
  backgroundColor: 'black',
};

function GroupCard() {
  return (
    <View style={containerStyles}>
      <View style={styles.cardShadow}>
        <BlurView tint="dark" intensity={100} style={styles.card}>
          <GroupCardDetails item={item} />
        </BlurView>
      </View>
    </View>
  );
}

function GroupDetails({ navigation }) {
  return (
    <View style={containerStyles}>
      <Button
        onPress={() => navigation.goBack()}
        title="👈 Go back to Group Card"
      />
    </View>
  );
}

storiesOf('Group Card', module).add('default', () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Group Card" component={GroupCard} />
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
    </Stack.Navigator>
  </NavigationContainer>
));
