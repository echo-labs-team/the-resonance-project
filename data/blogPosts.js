import axios from 'axios';
import * as Amplitude from 'expo-analytics-amplitude';
import { AllHtmlEntities } from 'html-entities';

const entities = new AllHtmlEntities();

export async function getBlogPosts() {
  const { data: posts = [] } =
    (await axios
      .get('http://echo.church/wp-json/wp/v2/posts?per_page=3&orderby=date')
      .catch(err => {
        Amplitude.logEventWithProperties('ERROR loading blog posts', {
          error: err,
        });
      })) || {};

  return Promise.all(
    posts.map(
      ({
        link: blogUrl,
        title: { rendered: title } = {},
        date,
        _links: links = {},
      } = {}) => {
        const [{ href: imageUrl } = {}] = links['wp:featuredmedia'] || [];
        const postDate = new Date(date).toLocaleDateString();

        if (!imageUrl) {
          return {
            type: 'BLOG',
            url: blogUrl,
            title: entities.decode(title),
            date: postDate,
          };
        }

        return axios
          .get(imageUrl)
          .then(({ data: { link: image } = {} } = {}) => {
            return {
              type: 'BLOG',
              url: blogUrl,
              image,
              title: entities.decode(title),
              date: postDate,
            };
          })
          .catch(err => {
            Amplitude.logEventWithProperties('ERROR loading blog post image', {
              error: err,
            });
          });
      }
    )
  );
}
