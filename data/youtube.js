import axios from 'axios';
import Keys from '../constants/Keys';

const TARGET_SECTION_TITLE = "Popular Series"

const PLAYLIST_PARTS = ['id', 'contentDetails', 'snippet'];

const CHANNEL_ID = 'UCjycPAZuveusvPrk94-ClBw'; // This is Echo.Church's channel ID

const API_KEY = __DEV__ ? Keys.YOUTUBE_DEV_API_KEY : Keys.YOUTUBE_RELEASE_API_KEY;

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
  console.log(`playlistIDs length = ${playlistIDs.length}`)
  const playlists = playlistIDs
  .map((id = "") => {
    return axios.get(`${url}/playlists`, {
      params: {
        id: id,
        part: PLAYLIST_PARTS.join(),
        key: API_KEY,
      },
    });
  })
  return await Promise.all(playlists).then((values) => {
    return values
    .map((playlist = {}) => {
      const { data: { items }} = playlist
      const { snippet: { publishedAt, id, title, thumbnails }} = items[0]
      console.log(`fetched: Title: ${title} publishedAt: ${publishedAt}`)
      return {
        publishDate: publishedAt,
        id,
        title,
        thumbnails
      }
    })
  })
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

const fetchPlaylistItems = async (playlistId, nextPage, videos = [], recurse = true) => {
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
    console.log(`fetched: Title: ${title} publishedAt: ${publishedAt}`)
    return {
      id: videoId,
      publishDate: publishedAt,
      title,
      description,
      thumbnails,
    };
  });

  if (nextPageToken && recurse) {
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
