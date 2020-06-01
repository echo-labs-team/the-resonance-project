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
  uuid: 120006,
  campus: 'North San Jose',
  name: 'H10 - Women Leading with Hope',
  hasChildcare: false,
  daysOfWeek: ['Wednesday'],
  meetingTime: '07:00:00 PDT',
  frequency: 1,
  interval: 'Weekly',
  description:
    'Do you feel challenged to grow in leadership? Want to lead people around you in a positive way? Join me for an hour as we discuss what it looks like to lead with hope in this season. No experience necessary, just come with a commitment to grow, and maybe your favorite mug of coffee/tea! Space is limited. Online Platform: Zoom',
  gender: 'Coed',
  maritalStatus: 'Married or Single',
  ageRange: 'Open to all ages',
  categories: ['Women Only', 'Exploring'],
  location: {
    name: null,
    description: null,
    address: {
      address1: null,
      address2: null,
      city: null,
      stProvince: null,
      postalCode: null,
      county: null,
      country: null,
      latitude: null,
      longitude: null,
    },
  },
  openDate: {
    startDate: {
      raw: '2020-06-14T00:00:00.0000000',
      formatted: 'Sun Jun 14 2020',
    },
    endDate: {
      raw: '2020-07-31T00:00:00.0000000',
      formatted: 'Fri Jul 31 2020',
    },
  },
  leaders: {
    leaders: [
      {
        groupId: 120006,
        groupName: 'H10 - Women Leading with Hope',
        name: 'Mandy Santos',
        email: 'msantos@echo.church',
        memberType: 'Group Host',
      },
    ],
  },
};

const Stack = createStackNavigator();
const containerStyles = {
  padding: 10,
  flex: 1,
  alignItems: 'center',
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
