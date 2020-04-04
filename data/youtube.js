import { get } from 'axios';
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

const fetchVideos = async (nextPage, videos = []) => {
  const { data = {} } =
    (await get(url, {
      params: {
        channelId: CHANNEL_ID,
        key: API_KEY,
        pageToken: nextPage,
      },
    })) || {};
  const { items = [], nextPageToken } = data;

  const moreVideos = items
    .map((item = {}) => {
      const {
        id,
        snippet: { publishedAt, localized = {}, thumbnails } = {},
      } = item;

      if (PLAYLIST_NAME_AVOID_LIST.includes(localized.title)) {
        return false;
      }

      return {
        id,
        publishDate: publishedAt,
        title: localized.title,
        thumbnails,
      };
    })
    .filter(Boolean);

  if (nextPageToken) {
    return fetchVideos(nextPageToken, [...videos, ...moreVideos]);
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
