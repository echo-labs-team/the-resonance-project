import Constants from 'expo-constants';
import axios from 'redaxios';
import { useQuery } from 'react-query';
import logEvent from '../utils/logEvent';

export function useTweets() {
  const { isFetching, isLoading, isError, data, error, refetch } = useQuery(
    'tweets',
    () =>
      axios('https://api.twitter.com/2/users/14815217/tweets', {
        headers: { Authorization: Constants.manifest?.extra?.TWITTER },
        params: {
          'media.fields': 'media_key,preview_image_url,type,url',
          'tweet.fields': 'created_at',
          exclude: 'retweets,replies',
          expansions: 'attachments.media_keys',
          max_results: 6,
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

  const tweetData = tweets.map(({ attachments, created_at, id, text }) => {
    const mediaKey = attachments?.media_keys?.[0];
    const tweetMedia = mediaKey
      ? media.find(({ media_key }) => media_key === mediaKey)
      : undefined;

    return {
      date: new Date(created_at).toLocaleDateString(),
      image: tweetMedia?.url,
      title: text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ''), // remove links
      type: 'SOCIAL',
      url: `https://twitter.com/echochurchlive/status/${id}`,
    };
  });

  return {
    isFetching,
    data: tweetData,
    refetch,
  };
}
