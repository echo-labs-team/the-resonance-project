import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logEvent from '../utils/logEvent';
import { Text, Title } from '../components/shared/Typography';
import Colors from '../constants/Colors';

export default ({ item }) => {
  const navigation = useNavigation();
  const { Name = '', GroupCampus, FriendlyScheduleText, Description } = item;

  return (
    <TouchableHighlight
      testID="GroupCardDetails"
      style={styles.group}
      underlayColor={Colors.darkestGray}
      onPress={() => {
        logEvent('OPEN Group Details', { group: Name });
        navigation.navigate('GroupDetails', { group: { ...item } });
      }}
    >
      <View>
        <Title
          light
          adjustsFontSizeToFit
          numberOfLines={2}
          style={styles.title}
        >
          {Name}
        </Title>

        {FriendlyScheduleText ? (
          <Text style={styles.detail}>{FriendlyScheduleText}</Text>
        ) : null}

        <Text bold style={styles.detail}>
          {GroupCampus}
        </Text>

        <Text light numberOfLines={3} ellipsizeMode="tail">
          {Description}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export const styles = StyleSheet.create({
  group: {
    padding: 16,
    position: 'relative',
    borderRadius: 16,
  },
  title: {
    marginVertical: 10,
  },
  detail: {
    marginBottom: 10,
  },
});
