import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const HomeCardPlaceholder = () => (
  <ContentLoader
    viewBox="0 0 300 300"
    backgroundColor={Colors.darkGray}
    foregroundColor={Colors.darkerGray}
    preserveAspectRatio="none"
    style={styles.card}
  >
    {/* image */}
    <Rect x="0" y="0" rx="0" ry="0" width="100%" height="200" />

    {/* post type & date */}
    <Rect x="8" y="216" rx="3" ry="3" width="16" height="20" />
    <Rect x="32" y="216" rx="3" ry="3" width="80" height="20" />
    <Rect x="68%" y="216" rx="3" ry="3" width="88" height="20" />

    {/* title & content */}
    <Rect x="8" y="248" rx="3" ry="3" width="80%" height="16" />
    <Rect x="8" y="272" rx="3" ry="3" width="90%" height="16" />
  </ContentLoader>
);

const styles = StyleSheet.create({
  card: {
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.darkestGray,
    overflow: 'hidden',
  },
});

export default HomeCardPlaceholder;
