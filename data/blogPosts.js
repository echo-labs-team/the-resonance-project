import axios from 'axios';
import * as Amplitude from 'expo-analytics-amplitude';

export async function getBlogPosts() {
  const { data: posts = [] } =
    (await axios
      .get('http://echo.church/wp-json/wp/v2/posts?per_page=2&orderby=date')
      .catch(err => console.error(err.toString()))) || {};

  return Promise.all(
    posts.map(
      ({
        link: blogUrl,
        title: { rendered: title } = {},
        _links: links = {},
      } = {}) => {
        const [{ href: imageUrl }] = links['wp:featuredmedia'] || [];

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
            console.error(err.toString());
            Amplitude.logEventWithProperties('errorLoadingBlogPosts', {
              app: 'mobile',
              mainTray: 'Home',
              error: err.toString(),
            });
          });
      }
    )
  );
}
