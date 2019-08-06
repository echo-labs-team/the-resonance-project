/**
 * Modal sheet that slides up from the bottom,
 * similar to Facebook's webviews
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Text from './Text';
import Button from './Button';
import Checkbox from './Checkbox';

const Item = ({ item, areFiltersReset, onSelected }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (areFiltersReset) {
      setSelected(false);
    }
  }, [areFiltersReset]);

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        onSelected(!selected);
        setSelected(!selected);
      }}
    >
      <View style={styles.item}>
        <Text light style={styles.category}>
          {item}
        </Text>
        {!areFiltersReset && selected ? <Checkbox checked /> : <Checkbox />}
      </View>
    </TouchableHighlight>
  );
};

export default ({ categories, isVisible, setIsVisible }) => {
  const [filters, setFilters] = useState([]);

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection="down"
      propagateSwipe={true}
      style={styles.modal}
    >
      <AntDesign.Button
        name={'close'}
        size={26}
        backgroundColor="transparent"
        underlayColor="transparent"
        color={Colors.white}
        style={styles.closeButton}
        onPress={() => setIsVisible(false)}
      />

      <View style={styles.container}>
        <View style={styles.dragBar} />

        <View style={styles.heading}>
          <Text style={styles.header}>Filters</Text>
          <TouchableOpacity onPress={() => setFilters([])}>
            <Text bold style={styles.reset}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        <SectionList
          keyExtractor={item => item}
          sections={[
            {
              title: 'Campus',
              data: [
                'North San Jose',
                'South San Jose',
                'Sunnyvale',
                'Fremont',
              ],
            },
            {
              title: 'Day',
              data: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
            },
            { title: 'Categories', data: categories },
          ]}
          renderSectionHeader={({ section: { title } }) => (
            <Text bold style={styles.sectionTitle}>
              {title}
            </Text>
          )}
          renderItem={({ item }) => (
            <Item
              key={item}
              item={item}
              areFiltersReset={!filters.length}
              onSelected={selected => {
                if (selected) {
                  setFilters([...filters, item]);
                } else {
                  setFilters(
                    [...filters].filter(groupFilter => groupFilter !== item)
                  );
                }
              }}
            />
          )}
          style={styles.contentContainer}
        />

        <View style={styles.button}>
          <Button title="Apply" onPress={() => setIsVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};

const dragBarColor = 'rgba(255,255,255,0.3)';

const styles = StyleSheet.create({
  modal: {
    marginTop: 100,
    marginBottom: 0,
    marginHorizontal: 0,
    justifyContent: 'flex-end',
  },
  closeButton: { alignSelf: 'flex-end' },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 40,
    position: 'relative',
    borderRadius: 10,
    backgroundColor: Colors.darkerGray,
  },
  // needed to allow scrolling on android
  contentContainer: { flexGrow: 3, height: '50%' },
  dragBar: {
    width: 100,
    height: 6,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: dragBarColor,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 30,
    color: Colors.white,
  },
  reset: {
    padding: 16,
    fontSize: 24,
    color: Colors.blue,
  },
  sectionTitle: {
    paddingTop: 10,
    paddingBottom: 4,
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: Colors.darkerGray,
    color: Colors.gray,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 20,
    color: Colors.gray,
  },
  button: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 10,
    justifyContent: 'flex-end',
  },
});
