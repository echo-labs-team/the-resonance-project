import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export function GroupCardPlaceholder() {
  return (
    <ContentLoader
      viewBox="0 0 300 276"
      backgroundColor={Colors.darkGray}
      foregroundColor={Colors.darkerGray}
      preserveAspectRatio="none"
      style={styles.card}
    >
      {/* title & content */}
      <Rect x="16" y="24" rx="3" ry="3" width="80%" height="24" />
      <Rect x="16" y="60" rx="3" ry="3" width="90%" height="24" />

      {/* meeting day & time */}
      <Rect x="16" y="108" rx="3" ry="3" width="85%" height="16" />

      {/* campus */}
      <Rect x="16" y="144" rx="3" ry="3" width="100" height="16" />

      {/* description */}
      <Rect x="16" y="180" rx="3" ry="3" width="80%" height="16" />
      <Rect x="16" y="208" rx="3" ry="3" width="90%" height="16" />
      <Rect x="16" y="236" rx="3" ry="3" width="85%" height="16" />
    </ContentLoader>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 276,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: Colors.darkestGray,
    overflow: 'hidden',
  },
});
