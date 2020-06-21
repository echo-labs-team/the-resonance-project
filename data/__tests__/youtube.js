import axios from 'axios';
import { sortByDate, fetchChannelSection, fetchPlaylists } from '../youtube';

jest.mock('axios');

test('should sort playlist by publish date', () => {
  const items = [
    { id: '5', publishDate: '2020-04-20T00:00:00Z' },
    { id: '2', publishDate: '2020-04-05T00:00:00Z' },
    { id: '3', publishDate: '2020-04-10T00:00:00Z' },
    { id: '1', publishDate: '2020-04-01T00:00:00Z' },
    { id: '4', publishDate: '2020-04-15T00:00:00Z' },
  ];

  expect(items.sort(sortByDate)).toMatchSnapshot();
});

test('should fetch channel sections', async () => {
  axios.get.mockResolvedValue({
    data: {
      kind: 'youtube#channelSectionListResponse',
      etag: 'etag-0',
      items: [
        {
          kind: 'youtube#channelSection',
          etag: 'etag-1',
          id: '1',
          snippet: {
            type: 'multiplePlaylists',
            style: 'horizontalRow',
            channelId: 'UCjycPAZuveusvPrk94-ClBw',
            title: 'Popular Series',
            position: 1,
            localized: {
              title: 'Popular Series',
            },
          },
          contentDetails: {
            playlists: [
              'PL8cDVrurCVqMDEP9wiPCgvuZslIGkE_5M',
              'PL8cDVrurCVqN7DvWM3ZI6oHfC5rxBTOJi',
              'PL8cDVrurCVqMZH6QZXigDaZ7HqlStBrvk',
              'PL8cDVrurCVqOAQaI8O8alNwBt2rQp3HYI',
              'PL8cDVrurCVqNrhEI2KZqn2GCyMrq967xV',
              'PL8cDVrurCVqNX0hof1GEmDbIVSHP4xMUs',
            ],
          },
        },
      ],
    },
  });

  const playlist = await fetchChannelSection();

  expect(playlist).toMatchSnapshot();
});

test('should fetch a playlist', async () => {
  axios.get.mockResolvedValue({
    data: {
      items: [
        {
          kind: 'youtube#playlist',
          etag: 'etag',
          id: 'id',
          snippet: {
            publishedAt: '2020-04-04T00:00:00Z',
            channelId: 'UCjycPAZuveusvPrk94-ClBw',
            title: 'Playlist Title',
            description: '',
            thumbnails: [{}],
            channelTitle: 'Echo.Church',
            localized: [{}],
          },
          contentDetails: { itemCount: 5 },
        },
      ],
    },
  });

  const playlist = await fetchPlaylists([
    'PL8cDVrurCVqMDEP9wiPCgvuZslIGkE_5M',
    'PL8cDVrurCVqN7DvWM3ZI6oHfC5rxBTOJi',
    'PL8cDVrurCVqMZH6QZXigDaZ7HqlStBrvk',
    'PL8cDVrurCVqOAQaI8O8alNwBt2rQp3HYI',
    'PL8cDVrurCVqNrhEI2KZqn2GCyMrq967xV',
    'PL8cDVrurCVqNX0hof1GEmDbIVSHP4xMUs',
  ]);

  expect(playlist).toMatchSnapshot();
});
