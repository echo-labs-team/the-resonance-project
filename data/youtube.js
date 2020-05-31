import axios from 'axios';
import Keys from '../constants/Keys';

const CHANNEL_ID = 'UCjycPAZuveusvPrk94-ClBw'; // This is Echo.Church's channel ID
const TARGET_SECTION_TITLE = 'Popular Series';
const API_KEY = __DEV__
  ? Keys.YOUTUBE_DEV_API_KEY
  : Keys.YOUTUBE_RELEASE_API_KEY;
const url = 'https://www.googleapis.com/youtube/v3';

// this is good to keep around for logging axios req/resp
/*
axios.interceptors.request.use(request => {
  console.log('Starting Request', request)
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})
*/

/**
 * Sorting function to sort playlists by publish date
 * @param {Object} playlist channel section playlist
 * @param {Object} playlist channel section playlist
 */
export function sortByDate(
  { publishDate: firstPublishDate },
  { publishDate: secondPublishDate }
) {
  return new Date(secondPublishDate) - new Date(firstPublishDate);
}

/**
 * Fetch channel sections
 * https://developers.google.com/youtube/v3/docs/channelSections
 */
export async function fetchChannelSection() {
  const { data = {} } =
    (await axios.get(`${url}/channelSections`, {
      params: {
        channelId: CHANNEL_ID,
        key: API_KEY,
        part: 'id,snippet,contentDetails',
      },
    })) || {};

  const [channelSection] = data.items.filter(
    ({ snippet: { title } = {} } = {}) => title === TARGET_SECTION_TITLE
  );

  const channelSectionPlaylistIDs =
    channelSection?.contentDetails?.playlists || [];

  if (!channelSectionPlaylistIDs.length) {
    throw new Error('No playlists for in channel section');
  }

  return channelSectionPlaylistIDs;
}

/**
 * Fetch playlists
 * https://developers.google.com/youtube/v3/docs/playlists/list
 * @param {String} channelSectionPlaylistIDs a playlist ID
 */
export async function fetchPlaylists(channelSectionPlaylistIDs) {
  const playlists = channelSectionPlaylistIDs.map((id = '') => {
    return axios.get(`${url}/playlists`, {
      params: {
        id,
        key: API_KEY,
        part: 'id,snippet',
      },
    });
  });

  const result = await Promise.all(playlists);

  if (!result.length) {
    throw new Error('No playlist data');
  }

  return result
    .map(({ data: { items } } = {}) => {
      const {
        id,
        snippet: { publishedAt, title, thumbnails },
      } = items[0];

      return {
        publishDate: publishedAt,
        id,
        title,
        thumbnails,
      };
    })
    .sort(sortByDate);
}

/**
 * Fetch playlist videos
 * https://developers.google.com/youtube/v3/docs/playlistItems/list
 * @param {String} playlistId the playlist ID to get videos
 */
export async function fetchPlaylistItems(playlistId) {
  const { data = {} } =
    (await axios.get(`${url}/playlistItems`, {
      params: {
        key: API_KEY,
        maxResults: 30, // ? 🤔 not sure the max # of videos in series playlists
        part: 'id,snippet',
        playlistId,
      },
    })) || {};

  const { items = [] } = data;

  if (!items.length) {
    throw new Error('No playlist items');
  }

  return items.map((item = {}) => {
    const {
      snippet: { publishedAt, title, description, thumbnails, resourceId: { videoId } = {} } = {},
    } = item;

    return {
      id: videoId,
      publishDate: publishedAt,
      title,
      description,
      thumbnails,
    };
  });
}
