import React, { useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import Text from '../components/Text';
import Colors from '../constants/Colors';

export default () => {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // display the scroll indicators momentarily so that the user knows they can scroll
    setTimeout(() => {
      scrollViewRef.current.flashScrollIndicators();
    }, 0);
  }, []);

  return (
    <>
      <Text bold style={styles.title}>
        LOCATIONS & SERVICE TIMES
      </Text>
      <ScrollView ref={scrollViewRef} horizontal style={styles.serviceTimes}>
        <View style={styles.serviceTime}>
          <Text style={styles.serviceTimeText}>Fremont | 48989 Milmont Dr</Text>
          <Text style={styles.serviceTimeText}>9:30AM • 11:00AM</Text>
        </View>
        <View style={styles.serviceTime}>
          <Text style={styles.serviceTimeText}>
            North San Jose | 1180 Murphy Ave
          </Text>
          <Text style={styles.serviceTimeText}>
            8:30AM • 10:00AM • 11:30AM • 4:00PM • 5:30PM
          </Text>
        </View>
        <View style={styles.serviceTime}>
          <Text style={styles.serviceTimeText}>
            South San Jose | 6150 Snell Ave
          </Text>
          <Text style={styles.serviceTimeText}>9:30AM • 11:00AM</Text>
        </View>
        <View style={styles.serviceTime}>
          <Text style={styles.serviceTimeText}>
            Sunnyvale | 1145 E Arques Ave
          </Text>
          <Text style={styles.serviceTimeText}>9:30AM • 11:00AM</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontSize: 20,
    color: Colors.white,
  },
  serviceTimes: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: Colors.darkestGray,
  },
  serviceTime: {
    marginRight: 30,
  },
  serviceTimeText: {
    fontSize: 18,
    color: Colors.white,
  },
});
