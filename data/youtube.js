import axios from 'axios';
import Keys from '../constants/Keys';

const PLAYLIST_NAME_AVOID_LIST = [
  'Watch Later',
  'Weekly Highlights',
  'Echo Music',
  'Messages',
  'Testimonies',
  'Family Ministry',
  'Latest for Echo.Church',
];

const PLAYLIST_PARTS = ['id', 'contentDetails', 'snippet'];

const CHANNEL_ID = 'UCjycPAZuveusvPrk94-ClBw'; // This is Echo.Church's channel ID
const API_KEY = Keys.YOUTUBE_DEV_API_KEY;
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

const fetchPlaylists = async (nextPage, playlists = []) => {
  const { data = {} } =
    (await axios.get(`${url}/playlists`, {
      params: {
        part: PLAYLIST_PARTS.join(),
        channelId: CHANNEL_ID,
        key: API_KEY,
        pageToken: nextPage,
        maxResults: 10,
      },
    })) || {};

  const { items = [], nextPageToken } = data;

  const morePlaylists = items
    .map((item = {}) => {
      const {
        id,
        snippet: { publishedAt, title, description, thumbnails } = {},
      } = item;

      if (PLAYLIST_NAME_AVOID_LIST.includes(title)) {
        return false;
      }

      return {
        id,
        publishDate: publishedAt,
        title,
        description,
        thumbnails,
      };
    })
    .filter(Boolean);

  if (nextPageToken) {
    return fetchPlaylists(nextPageToken, [...playlists, ...morePlaylists]);
  }

  return [...playlists, ...morePlaylists];
};

const fetchPlaylistItems = async (playlistId, nextPage, videos = []) => {
  const { data = {} } =
    (await axios.get(`${url}/playlistItems`, {
      params: {
        part: PLAYLIST_PARTS.join(),
        playlistId,
        key: API_KEY,
        pageToken: nextPage,
      },
    })) || {};

  const { items = [], nextPageToken } = data;

  const moreVideos = items.map((item = {}) => {
    const {
      id,
      snippet: { publishedAt, title, description, thumbnails } = {},
      contentDetails: { videoId },
    } = item;

    return {
      id: videoId,
      publishDate: publishedAt,
      title,
      description,
      thumbnails,
    };
  });

  if (nextPageToken) {
    return fetchPlaylistItems(nextPageToken, [...videos, ...moreVideos]);
  }

  return [...videos, ...moreVideos];
};

const collectData = async (playlistId) => {
  let returnList = [];
  if (playlistId) {
    returnList = await fetchPlaylistItems(playlistId);
  } else {
    returnList = await fetchPlaylists();
  }

  // test playlist (badish): PL8cDVrurCVqNXdr3pSHE79wHqNoBhJZuk
  // const items = await fetchPlaylistItems("PL8cDVrurCVqNXdr3pSHE79wHqNoBhJZuk");
  // console.log(items);

  return returnList.sort((a, b) => {
    const a_date = new Date(a.publishDate);
    const b_date = new Date(b.publishDate);

    if (a_date > b_date) {
      return -1;
    }

    if (a_date < b_date) {
      return 1;
    }

    return 0;
  });
};

export default collectData;
