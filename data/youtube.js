import axios from 'axios';
import Keys from '../constants/Keys';

// const CHANNEL_ID = 'UCjycPAZuveusvPrk94-ClBw'; // This is Echo.Church's channel ID
const CHANNEL_SECTION_ID = 'UCjycPAZuveusvPrk94-ClBw.j_S84EfePTc'; // Popular Series Section
// const TARGET_SECTION_TITLE = 'Popular Series';
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
        id: CHANNEL_SECTION_ID,
        key: API_KEY,
        part: 'contentDetails',
      },
    })) || {};

  const channelSectionPlaylistIDs =
    data?.items[0]?.contentDetails?.playlists || [];

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

  // To extract the thumbnail as a workaround for
  // https://issuetracker.google.com/issues/134417363#comment2
  const playlistListItems = channelSectionPlaylistIDs.map((id = '') => {
    return axios.get(`${url}/playlistItems`, {
      params: {
        playlistId: id,
        key: API_KEY,
        part: 'id,snippet',
        maxResults: 1,
      },
    });
  });

  const result = await Promise.all(playlists);
  const playlistListItemsResult = await Promise.all(playlistListItems);

  if (!result.length) {
    throw new Error('No playlist data');
  }

  if (!playlistListItemsResult.length) {
    throw new Error('No playlist items data');
  }

  const playlistItems = playlistListItemsResult.map(
    ({ data: { items } } = {}) => {
      const {
        snippet: { playlistId = '', thumbnails = {}, title = '' } = {},
      } = items[0];
      return {
        title,
        playlistId,
        thumbnails,
      };
    }
  );

  return result
    .map(({ data: { items } } = {}) => {
      const {
        id,
        snippet: { publishedAt, title },
      } = items[0];
      const playlistItem = playlistItems.filter(
        ({ playlistId } = {}) => playlistId === id
      )[0];

      if (!playlistItem) {
        throw new Error('No playlist item after filtering');
      }
      console.log(
        `title: ${title} item title: ${playlistItem.title}, Thumbnails: ${playlistItem.thumbnails?.maxres?.url}`
      );
      return {
        publishDate: publishedAt,
        id,
        title,
        thumbnails: playlistItem.thumbnails,
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
      snippet: {
        publishedAt,
        title,
        description,
        thumbnails,
        resourceId: { videoId } = {},
      } = {},
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
