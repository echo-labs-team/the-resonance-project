/**
 * Modal sheet that slides up from the bottom,
 * similar to Facebook's webviews
 *
 * - includes the button that triggers showing the modal sheet
 * - only requires the button title and children to render
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import Button from './Button';
import Colors from '../constants/Colors';

export default ({
  success = false,
  buttonTitle = '🚨 needs a title 🚨',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // only close this modal if it's already visible and
    // we've successfully finished our flow or whatevs
    if (isVisible) {
      setIsVisible(!success);
    }
  }, [success]);

  return (
    <>
      <Button
        title={buttonTitle}
        style={styles.button}
        onPress={() => setIsVisible(true)}
      />
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}
        swipeDirection="down"
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
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {children}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const dragBarColor = 'rgba(255,255,255,0.3)';

const styles = StyleSheet.create({
  button: { marginBottom: 16 },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  closeButton: { alignSelf: 'flex-end' },
  container: {
    height: '85%',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 16,
    position: 'relative',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.darkerGray,
  },
  // needed to allow scrolling on android
  contentContainer: { flexGrow: 1 },
  dragBar: {
    width: 100,
    height: 6,
    marginBottom: 30,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: dragBarColor,
  },
});
