import axios from 'axios';
import { useQuery } from 'react-query';
import keys from '../constants/Keys';
import logEvent from '../utils/logEvent';

export function useTweets() {
  const { isFetching, isLoading, isError, data, error, refetch } = useQuery(
    'tweets',
    () =>
      axios('https://api.twitter.com/2/users/14815217/tweets', {
        headers: { Authorization: keys.TWITTER },
        params: {
          'media.fields': 'media_key,preview_image_url,type,url',
          'tweet.fields': 'created_at',
          exclude: 'retweets,replies',
          expansions: 'attachments.media_keys',
          max_results: 5,
        },
      })
  );

  if (isLoading) {
    return {
      data: [
        { url: 'loadingTweet1' },
        { url: 'loadingTweet2' },
        { url: 'loadingTweet3' },
      ],
    };
  }

  if (isError) {
    logEvent('ERROR loading tweets', { error });

    return {
      isFetching,
      data: [],
      refetch,
    };
  }

  const { data: { data: tweets = [], includes: { media = [] } = {} } = {} } =
    data || {};
  const tweetData = tweets
    .map(({ attachments, created_at, text }) => {
      const mediaKey = attachments?.media_keys?.[0];
      const tweetMedia = mediaKey
        ? media.find(({ media_key }) => media_key === mediaKey)
        : undefined;

      return {
        date: new Date(created_at).toLocaleDateString(),
        media: tweetMedia,
        title: text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''), // remove links
        type: 'SOCIAL',
      };
    })
    .filter(({ media: tweetMedia }) => tweetMedia?.type === 'photo')
    .map(({ date, media: tweetMedia, title, type }) => ({
      date,
      image: tweetMedia?.url,
      title,
      type,
    }));

  return {
    isFetching,
    data: tweetData,
    refetch,
  };
}
