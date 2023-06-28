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
import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';
import logEvent from '../utils/logEvent';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Text, Title, Subtitle, Heading } from './shared/Typography';
import Button from './shared/Button';
import Checkbox from './shared/Checkbox';

const Item = ({ item, isSelected, onSelected }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      return setSelected(true);
    }
    setSelected(false);
  }, [isSelected]);

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        onSelected(!selected);
        setSelected(!selected);
      }}
    >
      <View style={styles.item}>
        <Text
          L
          light
          adjustsFontSizeToFit
          numberOfLines={1}
          style={styles.category}
        >
          {item}
        </Text>
        {isSelected || selected ? <Checkbox checked /> : <Checkbox />}
      </View>
    </TouchableHighlight>
  );
};

const initialFilters = { Campus: [], Day: [], Categories: [] };

export default ({
  isVisible,
  setIsVisible,
  appliedFilters = initialFilters,
  applyFilters,
}) => {
  const [filters, setFilters] = useState(appliedFilters);

  const handleCancel = () => {
    setFilters(appliedFilters);
    setIsVisible(false);
  };
  const handleApply = () => {
    applyFilters(filters);
    setIsVisible(false);
    logEvent('APPLY Group Filters', { filters });
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={handleCancel}
      onBackdropPress={handleCancel}
      onSwipeComplete={handleCancel}
      swipeDirection="down"
      propagateSwipe={true}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.dragBar} />

        <View style={styles.heading}>
          <Title style={styles.header}>Filters</Title>

          <TouchableOpacity onPress={() => setFilters(initialFilters)}>
            <Subtitle style={styles.header}>Reset</Subtitle>
          </TouchableOpacity>
        </View>

        <SectionList
          keyExtractor={(item) => item}
          sections={[
            {
              title: 'Campus',
              data: ['North San Jose', 'Sunnyvale', 'Fremont', 'Online'],
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
          ].filter(Boolean)}
          renderSectionHeader={({ section: { title } }) => (
            <BlurView tint="dark" intensity={100} style={styles.section}>
              <Heading center style={styles.sectionTitle}>
                {title}
              </Heading>
            </BlurView>
          )}
          renderItem={({ section: { title }, item }) => {
            return (
              <Item
                key={item}
                item={item}
                isSelected={filters[title].find((filter) => filter === item)}
                onSelected={(selected) => {
                  if (selected) {
                    // add the item to array of filters
                    setFilters({
                      ...filters,
                      [title]: [...filters[title], item],
                    });
                  } else {
                    // remove the item to array of filters
                    setFilters({
                      ...filters,
                      [title]: [
                        ...filters[title].filter(
                          (groupFilter) => groupFilter !== item
                        ),
                      ],
                    });
                  }
                }}
              />
            );
          }}
          style={styles.contentContainer}
        />

        <View style={styles.buttonContainer}>
          <Button title="Apply" style={styles.button} onPress={handleApply} />
        </View>
      </View>
    </Modal>
  );
};

const dragBarColor = 'rgba(255,255,255,0.3)';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    height: '90%',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    position: 'relative',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.darkerGray,
  },
  // needed to allow scrolling on android
  contentContainer: { flexGrow: 1, marginBottom: 76 },
  dragBar: {
    width: 100,
    height: 6,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: dragBarColor,
  },
  heading: {
    marginVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 0,
  },
  section: { borderRadius: 8 },
  sectionTitle: {
    paddingVertical: 8,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    maxWidth: '80%',
  },
  buttonContainer: {
    width: Layout.window.width,
    paddingTop: 14,
    position: 'absolute',
    bottom: 20,
    flex: 1,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.darkGray,
    backgroundColor: Colors.darkerGray,
  },
  button: { paddingHorizontal: 60 },
});
