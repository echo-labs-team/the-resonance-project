import React from 'react';
import { View, TouchableHighlight, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Text from './Text';

export default ({ location = {} }) => {
  const {
    address: {
      address1 = '',
      address2 = '',
      address3 = '',
      city = '',
      postalCode = '',
      stProvince = '',
    },
  } = location;
  const addressItems = [
    address1,
    address2,
    address3,
    city,
    stProvince,
    postalCode,
  ].filter(item => item);
  const line1 = [address1, address2, address3].filter(Boolean).join(', ');

  const openMaps = () => {
    const addressString = address1 ? addressItems.join(', ') : '';

    Linking.openURL(
      `https://maps.google.com/?daddr=${encodeURIComponent(addressString)}`
    );
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text bold style={{ fontSize: 18, color: Colors.gray }}>
        Address
      </Text>

      <TouchableHighlight
        underlayColor={Colors.darkBlue}
        onPress={openMaps}
        style={{ borderRadius: 4 }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: Colors.gray,
              }}
            >
              {line1}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Colors.gray,
              }}
            >
              {city}, {stProvince} {postalCode}
            </Text>
          </View>
          <View style={{ marginLeft: 'auto' }}>
            <Feather name={'chevron-right'} size={26} color={Colors.gray} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
