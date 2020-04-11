/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../../storybook/CenterView';
import Colors from '../../../constants/Colors';
import { Title, Subtitle, Heading, Text } from './index';

storiesOf('Typography', module)
  .addDecorator((getStory) => (
    <CenterView style={{ backgroundColor: Colors.darkestGray }}>
      {getStory()}
    </CenterView>
  ))
  .add('hierarchy', () => (
    <>
      <Title>Title</Title>
      <Subtitle>Subtitle</Subtitle>
      <Heading style={{ marginBottom: 10 }}>Heading</Heading>
      <Text>Text</Text>
    </>
  ))
  .add('with styles', () => (
    <>
      <Title bold style={{ color: Colors.blue }}>
        Title
      </Title>
      <Subtitle
        style={{ padding: 10, borderWidth: 1, borderColor: Colors.red }}
      >
        Subtitle
      </Subtitle>
      <Heading
        light
        style={{ padding: 10, marginBottom: 10, backgroundColor: Colors.black }}
      >
        Heading
      </Heading>
      <Text style={{ letterSpacing: 10, textTransform: 'uppercase' }}>
        Text
      </Text>
    </>
  ))
  .add('with <Text> props', () => (
    <>
      <Text>regular text</Text>
      <Text XXL>xxl text</Text>
      <Text XS bold>
        xs bold text
      </Text>
      <Text light>light text</Text>
      <Text L bold center>
        large bold centered text
      </Text>
    </>
  ));
