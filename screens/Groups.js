// @flow
import React, { Component } from 'react';
import { WebView, SafeAreaView, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import Spinner from '../components/Spinner';

type Props = {
  navigation: Object,
};

export default class GroupsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Groups',
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.borderStyle} />
        <WebView
          source={{ uri: 'https://stage.groups.echo.church' }}
          startInLoadingState={true}
          renderLoading={() => <Spinner />}
          injectedJavaScript="document.getElementsByTagName('header')[0].style.display = 'none'"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  borderStyle: {
    height: 1,
    backgroundColor: Colors.gray,
  },
});
