import axios from 'axios';
import Keys from '../constants/Keys';

const TARGET_SECTION_TITLE = "Popular Series"

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

const fetchChannelSection = async () => {
  console.log("fetching channel section")
  const { data = {} } =
  (await axios.get(`${url}/channelSections`, {
    params: {
      part: PLAYLIST_PARTS.join(),
      channelId: CHANNEL_ID,
      key: API_KEY,
    },
  })) || {};

  const { items = [] } = data;
  const playlistIDs = items
  .map((item = {}) => {
    const {
      snippet: { title } = {},
      contentDetails: { playlists = [] } = {}
    } = item;
    console.log("title = " + title)
    if (title != TARGET_SECTION_TITLE) {
      return false;
    }

    return playlists;
  })
  .filter(Boolean)[0];
  console.log("playlistIDs length = " + playlistIDs.length)
  const playlists = playlistIDs
  .map((id = "") => {
    return fetchPlaylistItems(id)
  })
  const fullPlaylists = await Promise.all(playlists);
  return fullPlaylists
}

// const fetchPlaylists = async (nextPage, playlists = []) => {
//   const { data = {} } =
//     (await axios.get(`${url}/channelSections`, {
//       params: {
//         part: PLAYLIST_PARTS.join(),
//         channelId: CHANNEL_ID,
//         key: API_KEY,
//         pageToken: nextPage,
//         maxResults: 10,
//       },
//     })) || {};

//   const { items = [], nextPageToken } = data;

//   const morePlaylists = items
//     .map((item = {}) => {
//       const {
//         snippet: { title } = {},
//         contentDetails: { playlists }
//       } = item;
//       console.log("title = " + title)
//       if (title != TARGET_SECTION_TITLE) {
//         return false;
//       }

//       return {
//         playlists
//       };
//     })
//     .filter(Boolean);

//   if (nextPageToken) {
//     return fetchPlaylists(nextPageToken, [...playlists, ...morePlaylists]);
//   }

//   return [...playlists, ...morePlaylists];
// };

const fetchPlaylistItems = async (playlistId, nextPage, videos = []) => {
  console.log("fetch id = " + playlistId)
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
    console.log(`Ttile: ${title}, Description: ${description}, publishedAt: ${publishedAt}`)
    return {
      id: videoId,
      publishDate: publishedAt,
      title,
      description,
      thumbnails,
    };
  });

  if (nextPageToken) {
    return fetchPlaylistItems(playlistId, nextPageToken, [...videos, ...moreVideos]);
  }

  return [...videos, ...moreVideos];
};

const collectData = async (playlistId) => {
  let returnList = [];
  if (playlistId) {
    returnList = await fetchPlaylistItems(playlistId);
  } else {
    returnList = await fetchChannelSection();
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
