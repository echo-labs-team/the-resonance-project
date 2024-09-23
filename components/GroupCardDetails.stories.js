import React from 'react';
import { View, Button } from 'react-native';
import { BlurView } from 'expo-blur';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { storiesOf } from '@storybook/react-native';
import { styles } from '../screens/Groups';
import GroupCardDetails from './GroupCardDetails';

const item = {
  Description: 'Group description',
  FriendlyScheduleText: 'Friday @ 5pm',
  GroupCampus: 'North San Jose',
  Name: 'Group Name',
};

const Stack = createStackNavigator();
const containerStyles = {
  backgroundColor: 'black',
  flex: 1,
  justifyContent: 'center',
  padding: 10,
};

function GroupCard() {
  return (
    <View style={containerStyles}>
      <View style={styles.cardShadow}>
        <BlurView intensity={100} style={styles.card} tint="dark">
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
      <Stack.Screen component={GroupCard} name="Group Card" />
      <Stack.Screen component={GroupDetails} name="GroupDetails" />
    </Stack.Navigator>
  </NavigationContainer>
));
