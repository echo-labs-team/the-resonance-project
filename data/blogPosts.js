import axios from 'axios';
import { AllHtmlEntities } from 'html-entities';
import logEvent from '../utils/logEvent';

const entities = new AllHtmlEntities();

/**
 * The default is the runtime default time zone, but we want to ensure the string is in UTC time, so
 * get each part of the UTC date and return the formatted date string
 * @param {Date} date blog post publish date
 */
function formatDate(date) {
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${String(
    date.getUTCFullYear()
  ).slice(2)}`;
}

export async function getBlogPosts() {
  const { data: posts = [] } =
    (await axios
      .get(
        `https://echo.church/wp-json/wp/v2/posts?per_page=10&orderby=date&timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      )
      .catch((err) => {
        logEvent('ERROR loading blog posts', { error: err.message });
      })) || {};

  return Promise.all(
    posts.map(
      ({
        link: blogUrl,
        title: { rendered: title } = {},
        date,
        _links: links = {},
      } = {}) => {
        const [{ href: imageUrl } = {}] =
          links['wp:featuredmedia'] || links['wp:attachment'] || [];
        const formattedDate = formatDate(new Date(date));

        if (!imageUrl) {
          return {
            type: 'BLOG',
            url: blogUrl,
            title: entities.decode(title),
            date: formattedDate,
          };
        }

        return axios
          .get(imageUrl)
          .then(({ data = [] } = {}) => {
            const [{ media_details } = {}] = Array.isArray(data)
              ? data
              : [data];
            const image = media_details?.sizes?.medium_large?.source_url;

            return {
              type: 'BLOG',
              url: blogUrl,
              image,
              title: entities.decode(title),
              date: formattedDate,
            };
          })
          .catch((err) => {
            logEvent('ERROR loading blog post image', {
              imageUrl,
              error: err.message,
            });
          });
      }
    )
  );
}
