import axios from 'redaxios';
import { useQuery, useQueries } from 'react-query';
import { decode } from 'html-entities';
import logEvent from '../utils/logEvent';

/**
 * The default is the runtime default time zone, but we want to ensure the string is in UTC time, so
 * get each part of the UTC date and return the formatted date string
 * @param {Date} date blog post publish date
 */
function formatDate(date) {
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${String(
    date.getUTCFullYear()
  )}`;
}

async function fetchPostImage({ imageUrl, blogUrl, title, formattedDate }) {
  const response = await axios.get(imageUrl).catch((err) => {
    logEvent('ERROR loading blog post image', {
      imageUrl,
      error: err,
    });
  });

  if (!response) {
    return {
      date: formattedDate,
      image: null,
      title: decode(title),
      type: 'BLOG',
      url: blogUrl,
    };
  }

  const imageData = response.data;
  const [{ media_details } = {}] = Array.isArray(imageData)
    ? imageData
    : [imageData];
  const image = media_details?.sizes?.medium_large?.source_url;

  return {
    date: formattedDate,
    image,
    title: decode(title),
    type: 'BLOG',
    url: blogUrl,
  };
}

export function useBlogPosts() {
  const {
    isFetching,
    isLoading,
    isError,
    data: postsData,
    error,
    refetch,
  } = useQuery('posts', () =>
    axios(
      `https://echo.church/wp-json/wp/v2/posts?per_page=10&orderby=date&timestamp=${new Date().getTime()}`,
      { headers: { 'Cache-Control': 'no-cache' } }
    )
  );

  const { data: posts = [] } = postsData || {};

  const blogPosts = useQueries(
    posts.map(
      ({
        id,
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
            queryKey: ['post', id],
            queryFn: async () => ({
              date: formattedDate,
              title: decode(title),
              type: 'BLOG',
              url: blogUrl,
            }),
          };
        }

        return {
          queryKey: ['post', id],
          queryFn: () =>
            fetchPostImage({
              blogUrl,
              formattedDate,
              imageUrl,
              title,
            }),
        };
      }
    )
  ).map(({ data }) => data);

  if (isError) {
    logEvent('ERROR loading blog posts', { error });

    return { isLoading, isFetching, data: [], refetch };
  }

  return { isLoading, isFetching, data: blogPosts, refetch };
}
