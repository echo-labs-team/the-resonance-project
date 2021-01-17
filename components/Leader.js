import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '../components/shared/Typography';

export default function Leader({ name, photo }) {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <View key={name} style={styles.leader}>
      {showPhoto && photo ? (
        <Image
          source={{ uri: photo }}
          style={styles.image}
          onError={() => setShowPhoto(false)}
        />
      ) : null}
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  leader: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 40,
  },
});
