import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logEvent from '../utils/logEvent';
import { Text, Title } from '../components/shared/Typography';
import Colors from '../constants/Colors';

export default ({ item }) => {
  const navigation = useNavigation();
  const { Description, FriendlyScheduleText, GroupCampus, Name = '' } = item;

  return (
    <TouchableHighlight
      onPress={() => {
        logEvent('OPEN Group Details', { group: Name });
        navigation.navigate('GroupDetails', { group: { ...item } });
      }}
      style={styles.group}
      testID="GroupCardDetails"
      underlayColor={Colors.darkestGray}
    >
      <View>
        <Title
          adjustsFontSizeToFit
          light
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

        <Text ellipsizeMode="tail" light numberOfLines={3}>
          {Description}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export const styles = StyleSheet.create({
  detail: {
    marginBottom: 10,
  },
  group: {
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  title: {
    marginVertical: 10,
  },
});
