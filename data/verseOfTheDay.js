import axios from 'axios';
import * as Amplitude from 'expo-analytics-amplitude';
import Layout from '../constants/Layout';

export async function getVerseOfTheDay() {
  const today = new Date();

  // integer value 1 through 366, representing the day of the year
  const day =
    Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000) + 1;

  const { data = {} } =
    (await axios
      .get(
        `https://developers.youversionapi.com/1.0/verse_of_the_day/${day}?version_id=1`,
        {
          headers: {
            Accept: 'application/json',
            'X-YouVersion-Developer-Token': 's2ykApiBUt-_A4c3kqXkftJDKxQ',
          },
        }
      )
      .catch(err => console.error(err))) || {};
  const { image = {}, verse = {} } = data;

  return {
    type: 'VERSE OF THE DAY',
    url: verse.url,
    image: `https:${image.url
      .replace('{width}', Layout.window.width)
      .replace('{height}', Layout.window.width)}`,
    title: `${verse.text} ${verse.human_reference}`,
  };
}
