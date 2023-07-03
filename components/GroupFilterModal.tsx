/**
 * Modal sheet that slides up from the bottom,
 * similar to Facebook's webviews
 */

import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import {
  SectionList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Filters, initialFilters } from '../queries/groups';
import logEvent from '../utils/logEvent';
import Button from './shared/Button';
import Checkbox from './shared/Checkbox';
import { Heading, Subtitle, Text, Title } from './shared/Typography';

const sections = [
  {
    data: ['North San Jose', 'Sunnyvale', 'Fremont', 'Online'],
    filterType: 'campus',
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
    filterType: 'day',
  },
  {
    data: [
      'Everyone Welcome',
      'Couples',
      'Men',
      'Women',
      'Kids',
      'Students',
      'Young Professionals',
      'College and Young Adults',
    ],
    filterType: 'audiences',
  },
  {
    data: [
      'Sermon Discussion',
      'Bible Study',
      'Book Discussion',
      'Alpha and New Believers',
      'Marriage and Relationships',
      'Family and Parenting',
      'Prayer',
      'Leadership, Business, and Finance',
      'Recreational',
      'Outreach',
    ],
    filterType: 'topics',
  },
];

function Item({
  isSelected,
  item,
  onSelected,
}: {
  isSelected: boolean;
  item: string;
  onSelected: (value: boolean) => void;
}) {
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

export function GroupFilterModal({
  appliedFilters,
  applyFilters,
  isVisible,
  setIsVisible,
}: {
  appliedFilters: Filters;
  applyFilters: (filters: Filters) => void;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}) {
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
          renderItem={({ item, section: { filterType } }) => {
            const type = filterType as keyof Filters;

            return (
              <Item
                isSelected={!!filters[type].find((filter) => filter === item)}
                item={item}
                key={item}
                onSelected={(selected) => {
                  if (selected) {
                    // add the item to array of filters
                    setFilters({
                      ...filters,
                      [filterType]: [...filters[type], item],
                    });
                  } else {
                    // remove the item to array of filters
                    setFilters({
                      ...filters,
                      [filterType]: [
                        ...filters[type].filter(
                          (groupFilter) => groupFilter !== item
                        ),
                      ],
                    });
                  }
                }}
              />
            );
          }}
          renderSectionHeader={({ section: { filterType } }) => (
            <BlurView intensity={100} style={styles.section} tint="dark">
              <Heading center style={styles.sectionTitle}>
                {`${filterType.charAt(0).toUpperCase()}${filterType.slice(1)}`}
              </Heading>
            </BlurView>
          )}
          sections={sections}
          style={styles.contentContainer}
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleApply}
            style={styles.button}
            title="Apply Filters"
          />
        </View>
      </View>
    </Modal>
  );
}

const dragBarColor = 'rgba(255,255,255,0.3)';

const styles = StyleSheet.create({
  button: { paddingHorizontal: 60 },

  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.darkerGray,
    borderColor: Colors.darkGray,
    borderTopWidth: 1,
    bottom: 20,
    flex: 1,
    paddingTop: 14,
    position: 'absolute',
    width: Layout.window.width,
  },

  category: {
    maxWidth: '80%',
  },

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
  // needed to allow scrolling on android
  contentContainer: { flexGrow: 1, marginBottom: 76 },
  dragBar: {
    alignSelf: 'center',
    backgroundColor: dragBarColor,
    borderRadius: 6,
    height: 6,
    marginBottom: 10,
    width: 100,
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
