import axios from 'axios';
import { useQuery } from 'react-query';
import logEvent from '../utils/logEvent';

export async function useInstagramPosts() {
  let instagramPosts = [];

  const {
    isFetching,
    isLoading,
    isError,
    data: instagramData,
    error,
    refetch,
  } = useQuery('instagram', () =>
    axios('https://www.instagram.com/echochurchlive/')
  );

  if (isLoading) {
    return {
      data: [
        { url: 'loadingIG1' },
        { url: 'loadingIG2' },
        { url: 'loadingIG3' },
      ],
    };
  }

  if (isError) {
    logEvent('ERROR loading instagram posts', { error });

    return { isFetching, error, data: [], refetch };
  }

  const { data: userInfoSource = {} } = instagramData;

  try {
    // userInfoSource contains the DOM
    const jsonObject = userInfoSource
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
      const title = caption?.split('-');

      return {
        type: 'INSTAGRAM',
        url: `https://www.instagram.com/p/${shortcode}`,
        image: thumbnail_src,
        title: title?.join(''),
        date,
      };
    });
  } catch (err) {
    logEvent('ERROR loading instagram posts', { error: err.message });
  }

  if (!instagramPosts.length) {
    logEvent('ERROR no instagram posts');
  }

  return { isFetching, data: instagramPosts, refetch };
}
