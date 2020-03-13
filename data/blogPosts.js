import axios from 'axios';
import * as Amplitude from 'expo-analytics-amplitude';

export async function getBlogPosts() {
  const { data: posts = [] } =
    (await axios
      .get('http://echo.church/wp-json/wp/v2/posts?per_page=2&orderby=date')
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
        _links: links = {},
      } = {}) => {
        const [{ href: imageUrl } = {}] = links['wp:featuredmedia'] || [];

        if (!imageUrl) {
          return {
            type: 'BLOG',
            url: blogUrl,
            title,
          };
        }

        return axios
          .get(imageUrl)
          .then(({ data: { link: image } = {} } = {}) => {
            return {
              type: 'BLOG',
              url: blogUrl,
              image,
              title,
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
