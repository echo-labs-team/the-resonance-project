import React from 'react';
import { StyleSheet, View, TouchableHighlight, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import { Heading } from './shared/Typography';

export default ({ title, city }) => {
  const addressItems = [city].filter(Boolean);

  const openMaps = () => {
    const addressString = addressItems.join(', ');

    logEvent('TAP Google Maps Group Address', {
      group: title,
    });
    Linking.openURL(
      `https://maps.google.com/?daddr=${encodeURIComponent(addressString)}`
    );
  };

  return (
    <View style={styles.container}>
      <Heading>Address</Heading>

      <TouchableHighlight
        underlayColor={Colors.darkBlue}
        onPress={openMaps}
        style={styles.highlight}
      >
        <View style={styles.address}>
          <View>
            <Heading light>{city}</Heading>
          </View>
          <View style={styles.chevron}>
            <Feather name={'chevron-right'} size={26} color={Colors.gray} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  highlight: { borderRadius: 4 },
  address: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  chevron: { marginLeft: 'auto' },
});
