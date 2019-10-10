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
const API_KEY = Keys.YOUTUBE_API_KEY;

collectChannelData = async () => {
  let good_items = new Array();
  let next_page_token = null;
  do {
    let url = `https://www.googleapis.com/youtube/v3/playlists?part=id%2CcontentDetails%2Csnippet`
    url += next_page_token ? `&pageToken=${next_page_token}` : ``
    url += `&channelId=${CHANNEL_ID}&key=${API_KEY}`
    try {
      response = await fetch(url)
    } catch (error) {
      throw Error(error);
      return null;
    }
    
    json = await response.json()

    if (!("items" in json) || ("error" in json)){
      throw Error(json.error.errors[0].message || "No message");
      return null;
    }
    json.items.forEach((item) => {
      if(PLAYLIST_NAME_AVOID_LIST.includes(item.snippet.localized.title)) {
        return
      }
      tiny_item = {
        publishDate:item.snippet.publishedAt,
        title:item.snippet.localized.title,
        thumbnails:item.snippet.thumbnails,
        id: item.id
      };
      good_items.push(tiny_item);
    })
    next_page_token = json["nextPageToken"]
  } while (next_page_token)

  // good_items = test_json_items;
  good_items.sort((a, b) => {
    const a_date = new Date(a.publishDate);
    const b_date = new Date(b.publishDate);
    return a_date > b_date ? -1 : a_date < b_date ? 1 : 0;
  });
  good_items.forEach(item => {
    console.log(item.title);
  });

  return good_items;
};

const test_json_items = [
    {
      "contentDetails": {
        "itemCount": 2,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/QKyEbP78vBjVGwug6Ql74uJ7nIE\"",
      "id": "PL8cDVrurCVqOGPHkwu8dQO369LORi2wCE",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Irresistible",
        },
        "publishedAt": "2019-09-23T18:09:09.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/2rfBB6HsD7E/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/2rfBB6HsD7E/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/2rfBB6HsD7E/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/2rfBB6HsD7E/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/2rfBB6HsD7E/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Irresistible",
      },
    },
    {
      "contentDetails": {
        "itemCount": 5,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/IpSXX9PqFOqclKQg_zYBxqqS9Xg\"",
      "id": "PL8cDVrurCVqMBTKMAWrOGrqttU81kZx8j",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Relationship Refresh",
        },
        "publishedAt": "2019-08-19T15:52:39.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/g7pHy6o00yM/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/g7pHy6o00yM/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/g7pHy6o00yM/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/g7pHy6o00yM/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/g7pHy6o00yM/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Relationship Refresh",
      },
    },
    {
      "contentDetails": {
        "itemCount": 3,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/uw5YD33n86WsKvX-ikzc5mZVsds\"",
      "id": "PL8cDVrurCVqNRBX5iFbBzdgdQu-g4UhTt",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Summer Vibes",
        },
        "publishedAt": "2019-06-24T17:32:18.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/A0JU17V7wP4/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/A0JU17V7wP4/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/A0JU17V7wP4/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/A0JU17V7wP4/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/A0JU17V7wP4/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Summer Vibes",
      },
    },
    {
      "contentDetails": {
        "itemCount": 4,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/Qkw-TpBmea1ytOG8GTLokVRS39M\"",
      "id": "PL8cDVrurCVqNDoS5V5ymlLuTjAtW1NWpF",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Money Myths",
        },
        "publishedAt": "2019-05-27T15:26:42.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/_AuHu4l5o-c/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/_AuHu4l5o-c/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/_AuHu4l5o-c/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/_AuHu4l5o-c/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/_AuHu4l5o-c/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Money Myths",
      },
    },
    {
      "contentDetails": {
        "itemCount": 2,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/9c5GOo61Jb7-bzEkfzYp7tsBnk4\"",
      "id": "PL8cDVrurCVqOxPst4SyvjJXFpYRoHpu1z",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Easter",
        },
        "publishedAt": "2019-05-08T20:52:56.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/m-L3S9bdMKs/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/m-L3S9bdMKs/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/m-L3S9bdMKs/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/m-L3S9bdMKs/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/m-L3S9bdMKs/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Easter",
      },
    },
    {
      "contentDetails": {
        "itemCount": 6,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/NBLy-qSvdIHdPYDRMZD6ZTCFT0c\"",
      "id": "PL8cDVrurCVqNX0hof1GEmDbIVSHP4xMUs",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Tidying Up",
        },
        "publishedAt": "2019-04-22T17:37:21.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/JqLpEUkDlJU/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/JqLpEUkDlJU/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/JqLpEUkDlJU/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/JqLpEUkDlJU/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/JqLpEUkDlJU/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Tidying Up",
      },
    },
    {
      "contentDetails": {
        "itemCount": 3,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/wnqxjZf-ApMK9ucHbeiMtIYE35g\"",
      "id": "PL8cDVrurCVqM3ah6Iq7OtklAuF1nBXJK0",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Man Up",
        },
        "publishedAt": "2019-04-01T16:35:24.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/7vMNrnQUH_U/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/7vMNrnQUH_U/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/7vMNrnQUH_U/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/7vMNrnQUH_U/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/7vMNrnQUH_U/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Man Up",
      },
    },
    {
      "contentDetails": {
        "itemCount": 4,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/HzA-xVF0MjCsZUbTOocNxImPGfA\"",
      "id": "PL8cDVrurCVqNrhEI2KZqn2GCyMrq967xV",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Escape Room",
        },
        "publishedAt": "2019-03-04T15:19:14.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/NHaEsxGxQLI/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/NHaEsxGxQLI/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/NHaEsxGxQLI/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/NHaEsxGxQLI/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/NHaEsxGxQLI/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Escape Room",
      },
    },
    {
      "contentDetails": {
        "itemCount": 10,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/qAy9BN0v_UC09aiK0uO5IEEogyk\"",
      "id": "PL8cDVrurCVqNvprpFjzYoiJru67aTk2zo",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "HeroMaker",
        },
        "publishedAt": "2018-11-12T18:31:00.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/diDfhDyFd0Y/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/diDfhDyFd0Y/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/diDfhDyFd0Y/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/diDfhDyFd0Y/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/diDfhDyFd0Y/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "HeroMaker",
      },
    },
    {
      "contentDetails": {
        "itemCount": 4,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/E7Uae2u1xBt0uyKbPNp0C_k8XfU\"",
      "id": "PL8cDVrurCVqOO28Vtr0kqBexBUzQmpo9O",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "For Our Neighbor",
        },
        "publishedAt": "2018-10-01T21:11:54.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/wx3ljjOEBKA/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/wx3ljjOEBKA/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/wx3ljjOEBKA/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/wx3ljjOEBKA/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/wx3ljjOEBKA/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "For Our Neighbor",
      },
    },
    {
      "contentDetails": {
        "itemCount": 5,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/ewOA0j0gMCamg_St_P75ddHCpik\"",
      "id": "PL8cDVrurCVqO_moJ8CatD7cyJ-DrRyb7d",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Tech-Wise Family",
        },
        "publishedAt": "2018-09-24T16:19:35.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/ab-4pKrZoAY/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/ab-4pKrZoAY/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/ab-4pKrZoAY/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/ab-4pKrZoAY/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/ab-4pKrZoAY/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Tech-Wise Family",
      },
    },
    {
      "contentDetails": {
        "itemCount": 7,
      },
      "etag": "\"p4VTdlkQv3HQeTEaXgvLePAydmU/2AnAEVk7124i_XybqDv4X40DWJE\"",
      "id": "PL8cDVrurCVqOAQaI8O8alNwBt2rQp3HYI",
      "kind": "youtube#playlist",
      "snippet": {
        "channelId": "UCjycPAZuveusvPrk94-ClBw",
        "channelTitle": "Echo.Church",
        "description": "",
        "localized": {
          "description": "",
          "title": "Swipe Right - Sex, Dating & Marriage",
        },
        "publishedAt": "2018-01-31T22:39:37.000Z",
        "thumbnails": {
          "default": {
            "height": 90,
            "url": "https://i.ytimg.com/vi/XyoeJGPb37I/default.jpg",
            "width": 120,
          },
          "high": {
            "height": 360,
            "url": "https://i.ytimg.com/vi/XyoeJGPb37I/hqdefault.jpg",
            "width": 480,
          },
          "maxres": {
            "height": 720,
            "url": "https://i.ytimg.com/vi/XyoeJGPb37I/maxresdefault.jpg",
            "width": 1280,
          },
          "medium": {
            "height": 180,
            "url": "https://i.ytimg.com/vi/XyoeJGPb37I/mqdefault.jpg",
            "width": 320,
          },
          "standard": {
            "height": 480,
            "url": "https://i.ytimg.com/vi/XyoeJGPb37I/sddefault.jpg",
            "width": 640,
          },
        },
        "title": "Swipe Right - Sex, Dating & Marriage",
      },
    }
  ];

export default collectChannelData;
