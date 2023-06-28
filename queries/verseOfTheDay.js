import axios from 'redaxios';
import { useQuery } from 'react-query';
import Layout from '../constants/Layout';

export function useVerseOfTheDay() {
  const today = new Date();

  // integer value 1 through 366, representing the day of the year
  const day =
    Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000) + 1;

  const { isLoading, isError, data, error } = useQuery('votd', () =>
    axios(
      `https://developers.youversionapi.com/1.0/verse_of_the_day/${day}?version_id=1`,
      {
        headers: {
          Accept: 'application/json',
          'X-YouVersion-Developer-Token': 's2ykApiBUt-_A4c3kqXkftJDKxQ',
        },
      }
    )
  );

  if (isLoading) {
    return { isLoading };
  }

  if (isError) {
    console.error(error);

    return {};
  }

  const { data: { image = {}, verse: { url = '' } = {} } = {} } = data;

  // change the version to NLT, which is 116
  const bibleUrl = url.replace(/(.*\/bible\/)(\d+)(\/.*)/, '$1116$3');

  return {
    data: {
      type: 'VERSE OF THE DAY',
      url: bibleUrl,
      image: image.url
        ? `https:${image.url
            .replace('{width}', Layout.window.width)
            .replace('{height}', Layout.window.width)}`
        : undefined,
    },
  };
}
