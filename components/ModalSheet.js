/**
 * Modal sheet that slides up from the bottom,
 * similar to Facebook's webviews
 *
 * - includes the button that triggers showing the modal sheet
 * - only requires the button title and children to render
 */

import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Button from './shared/Button';
import Colors from '../constants/Colors';

export default ({
  buttonTitle = '🚨 needs a title 🚨',
  children,
  handleOpenModal,
  success = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // only close this modal if it's already visible and
    // we've successfully finished our flow or whatevs
    if (isVisible) {
      setIsVisible(!success);
    }
  }, [isVisible, success]);

  return (
    <>
      <Button
        onPress={() => {
          if (handleOpenModal) {
            handleOpenModal();
          }
          setIsVisible(true);
        }}
        style={styles.button}
        title={buttonTitle}
      />
      <Modal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}
        style={styles.modal}
        swipeDirection="down"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.dragBar} />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const dragBarColor = 'rgba(255,255,255,0.3)';

const styles = StyleSheet.create({
  button: { marginBottom: 16 },
  closeButton: { alignSelf: 'flex-end' },
  container: {
    backgroundColor: Colors.darkerGray,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '85%',
    paddingBottom: 20,
    paddingTop: 10,
    position: 'relative',
  },
  // needed to allow scrolling on android
  contentContainer: { flexGrow: 1 },

  dragBar: {
    alignSelf: 'center',
    backgroundColor: dragBarColor,
    borderRadius: 6,
    height: 6,
    marginBottom: 30,
    width: 100,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
