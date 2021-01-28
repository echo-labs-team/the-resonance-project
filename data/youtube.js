import axios from 'axios';
import Keys from '../constants/Keys';

// Previous Series Channel Section
// https://developers.google.com/youtube/v3/docs/channelSections/list?apix_params=%7B%22part%22%3A%5B%22contentDetails%22%2C%22snippet%22%5D%2C%22channelId%22%3A%22UCjycPAZuveusvPrk94-ClBw%22%7D
const CHANNEL_SECTION_ID = 'UCjycPAZuveusvPrk94-ClBw.iJLXf_7B368';
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
    data?.items?.[0]?.contentDetails?.playlists || [];

  if (!channelSectionPlaylistIDs.length) {
    throw new Error('No playlists for in channel section');
  }

  return channelSectionPlaylistIDs;
}

/**
 * Fetch playlists, but modify thumbnails because
 * of https://issuetracker.google.com/issues/134417363#comment2
 * @param {String} channelSectionPlaylistIDs a playlist ID
 */
export async function fetchPlaylistsWrapper(channelSectionPlaylistIDs = []) {
  if (!channelSectionPlaylistIDs?.length) {
    throw new Error('No playlist data');
  }

  const playlists = await fetchPlaylists(channelSectionPlaylistIDs);
  const playlistFirstItems = playlists.map(({ title, playlistId } = {}) => {
    return fetchPlaylistItems(playlistId, 1).then((result) => {
      return {
        title,
        id: playlistId,
        thumbnails: result[0].thumbnails,
      };
    });
  });

  return Promise.all(playlistFirstItems);
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
        part: 'id,contentDetails,snippet',
      },
    });
  });

  const result = await Promise.all(playlists);

  if (!result.length) {
    throw new Error('No playlist data');
  }

  return result
    .map(({ data: { items = [] } } = {}) => {
      const {
        id,
        contentDetails: { videoPublishedAt },
        snippet: { title, thumbnails },
      } = items[0];

      return {
        playlistId: id,
        publishDate: videoPublishedAt,
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
export async function fetchPlaylistItems(playlistId, maxResults) {
  const { data = {} } =
    (await axios.get(`${url}/playlistItems`, {
      params: {
        key: API_KEY,
        maxResults,
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
      playlistId,
      title,
      description,
      thumbnails,
    };
  });
}
