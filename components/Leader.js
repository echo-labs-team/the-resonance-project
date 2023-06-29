import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '../components/shared/Typography';

export default function Leader({ names, photo }) {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <View style={styles.leader}>
      {showPhoto && photo ? (
        <Image
          onError={() => setShowPhoto(false)}
          source={{ uri: photo }}
          style={styles.image}
        />
      ) : null}
      <Text>{names}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 40,
    height: 80,
    marginRight: 16,
    width: 80,
  },
  leader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});
