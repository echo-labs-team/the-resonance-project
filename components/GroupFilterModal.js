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

function Item({ isSelected, item, onSelected }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      return setSelected(true);
    }
    setSelected(false);
  }, [isSelected]);

  return (
    <TouchableHighlight
      onPress={() => {
        onSelected(!selected);
        setSelected(!selected);
      }}
      underlayColor="transparent"
    >
      <View style={styles.item}>
        <Text
          L
          adjustsFontSizeToFit
          light
          numberOfLines={1}
          style={styles.category}
        >
          {item}
        </Text>
        {isSelected || selected ? <Checkbox checked /> : <Checkbox />}
      </View>
    </TouchableHighlight>
  );
}

const initialFilters = { Campus: [], Categories: [], Day: [] };

export default ({
  appliedFilters = initialFilters,
  applyFilters,
  isVisible,
  setIsVisible,
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
      propagateSwipe
      style={styles.modal}
      swipeDirection="down"
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
          renderItem={({ item, section: { title } }) => {
            return (
              <Item
                isSelected={filters[title].find((filter) => filter === item)}
                item={item}
                key={item}
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
          renderSectionHeader={({ section: { title } }) => (
            <BlurView intensity={100} style={styles.section} tint="dark">
              <Heading center style={styles.sectionTitle}>
                {title}
              </Heading>
            </BlurView>
          )}
          sections={[
            {
              data: ['North San Jose', 'Sunnyvale', 'Fremont', 'Online'],
              title: 'Campus',
            },
            {
              data: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              title: 'Day',
            },
          ].filter(Boolean)}
          style={styles.contentContainer}
        />

        <View style={styles.buttonContainer}>
          <Button onPress={handleApply} style={styles.button} title="Apply" />
        </View>
      </View>
    </Modal>
  );
};

const dragBarColor = 'rgba(255,255,255,0.3)';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkerGray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '90%',
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    position: 'relative',
  },
  
  buttonContainer: {
    paddingTop: 14,
    width: Layout.window.width,
    bottom: 20,
    position: 'absolute',
    alignItems: 'center',
    flex: 1,
    borderColor: Colors.darkGray,
    borderTopWidth: 1,
    backgroundColor: Colors.darkerGray,
  },

  // needed to allow scrolling on android
contentContainer: { flexGrow: 1, marginBottom: 76 },
  button: { paddingHorizontal: 60 },
  dragBar: {
    alignSelf: 'center',
    backgroundColor: dragBarColor,
    borderRadius: 6,
    height: 6,
    marginBottom: 10,
    width: 100,
  },
  category: {
    maxWidth: '80%',
  },
  header: {
    marginBottom: 0,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  section: { borderRadius: 8 },
  sectionTitle: {
    paddingVertical: 8,
  },
});
