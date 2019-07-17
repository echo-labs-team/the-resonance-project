import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Picker } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

const iOS = Platform.OS === 'ios';

function getPushPayCampus(campus) {
  switch (campus) {
    case 'NSJ':
      return 'echochurchnorth';
    case 'SSJ':
      return 'echochurchsouth';
    case 'SVL':
      return 'echochurchsunnyvale';
    case 'FMT':
      return 'echochurchfremont';
    default:
      return 'echochurchonline';
  }
}

const GivingScreen = () => {
  const [campus, setCampus] = useState('NSJ');

  const handleGive = () => {
    WebBrowser.openBrowserAsync(
      `https://pushpay.com/g/${getPushPayCampus(campus)}`
    );
  };

  return (
    <ScrollView style={styles.container} {...getHeaderInset()}>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 20,
          fontSize: 20,
          color: Colors.white,
        }}
      >
        Changing lives together
      </Text>
      <Text
        style={{
          marginBottom: 20,
          fontSize: 16,
          color: Colors.gray,
        }}
      >
        We believe that Christians ought to be the most generous people on
        Earth, because our God is a generous God — giving to us sacrificially
        over and over again. By contributing financially, you can be a part of
        changing people’s lives forever.
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', color: Colors.gray }}>
        Make a contribution through <Text bold>Push Pay</Text>. Start by
        selecting your campus below.
      </Text>

      <Picker
        mode="dropdown"
        style={{
          marginVertical: 20,
          backgroundColor: iOS ? undefined : Colors.white,
        }}
        itemStyle={{ color: iOS ? Colors.gray : Colors.darkestGray }}
        selectedValue={campus}
        onValueChange={value => setCampus(value)}
      >
        <Picker.Item label="North San Jose" value="NSJ" />
        <Picker.Item label="South San Jose" value="SSJ" />
        <Picker.Item label="Sunnyvale" value="SVL" />
        <Picker.Item label="Fremont" value="FMT" />
        <Picker.Item label="Online" value="Online" />
      </Picker>

      <Button title="Give" onPress={handleGive} />
    </ScrollView>
  );
};

GivingScreen.navigationOptions = {
  title: 'GIVING',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: Colors.darkestGray,
  },
});

export default GivingScreen;
