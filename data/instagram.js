import axios from 'axios';
import * as Amplitude from 'expo-analytics-amplitude';

export async function getInstagramPosts() {
  let instagramPosts = [];

  try {
    const userInfoSource = await axios.get(
      'https://www.instagram.com/echochurchlive/'
    );

    // userInfoSource.data contains the HTML from Axios
    const jsonObject = userInfoSource.data
      .match(
        /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
      )[1]
      .slice(0, -1);

    const userInfo = JSON.parse(jsonObject);
    const { entry_data: { ProfilePage = [] } = {} } = userInfo;
    const [profile = {}] = ProfilePage;
    const {
      graphql: {
        user: {
          edge_owner_to_timeline_media: { edges: mediaEdges = [] } = {},
        } = {},
      } = {},
    } = profile;

    instagramPosts = mediaEdges.slice(0, 5).map(({ node = {} } = {}) => {
      const {
        shortcode,
        thumbnail_src,
        taken_at_timestamp,
        edge_media_to_caption: { edges: captionEdges = [] } = {},
      } = node;
      const date = new Date(taken_at_timestamp * 1000).toLocaleDateString();
      const [captionEdge = {}] = captionEdges;
      const { node: { text: caption } = {} } = captionEdge;
      const title = caption.split('-');

      return {
        type: 'INSTAGRAM',
        url: `https://www.instagram.com/p/${shortcode}`,
        image: thumbnail_src,
        title: title.join(''),
        date,
      };
    });
  } catch (err) {
    Amplitude.logEventWithProperties('ERROR loading instagram posts', {
      error: err,
    });
  }

  return instagramPosts;
}
