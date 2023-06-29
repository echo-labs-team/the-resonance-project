import * as WebBrowser from 'expo-web-browser';
import { useQuery } from 'react-query';
import axios from 'redaxios';
import Colors from '../constants/Colors';
import logEvent from '../utils/logEvent';

type CurrentSeriesResponse = Array<{
  _links: {
    'wp:featuredmedia': Array<{ href: string }>;
  };
  title: {
    rendered: string;
  };
}>;
type AttachmentResponse = {
  media_details: {
    sizes: {
      medium_large: {
        source_url: string;
      };
    };
  };
};

export function useCurrentSeries() {
  const { data: currentSeries, isLoading: isLoadingCurrentSeries } = useQuery(
    'current-series',
    async () => {
      // this is the Current Series page
      const wordpressPage = await axios.get('https://echo.church/teaching');

      // the page then redirects to the actual series page, then we can grab the slug
      const currentSeriesSlug = (
        /echo.church\/(.+)/.exec(wordpressPage.url)?.[1] || ''
      ).replace('/', '');

      const { data: currentSeriesData } = await axios<CurrentSeriesResponse>(
        `https://echo.church/wp-json/wp/v2/pages?slug=${currentSeriesSlug}&timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      if (!currentSeriesData) return;

      const series = currentSeriesData[0] || {};

      // ! make sure the Featured Image is set under Elementor General Settings https://echo.church/wp-admin/
      const getSeriesImageUrl =
        series?._links?.['wp:featuredmedia']?.[0]?.href || '';

      if (!getSeriesImageUrl) {
        return {
          image: null,
          link: 'https://echo.church/teaching',
          title: series?.title?.rendered || 'Current Series',
        };
      }

      // get the attachments, which includes the banner image
      const { data: attachmentData } = await axios<AttachmentResponse>(
        `${getSeriesImageUrl}?timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      const seriesImage =
        attachmentData?.media_details.sizes.medium_large.source_url ||
        undefined;

      return {
        image: seriesImage,
        link: 'https://echo.church/teaching',
        title: series.title.rendered,
      };
    }
  );

  const openCurrentSeries = () => {
    if (!currentSeries) return;
    WebBrowser.openBrowserAsync(currentSeries.link, {
      toolbarColor: Colors.darkestGray,
    }).catch((err: unknown) => {
      logEvent('ERROR with WebBrowser', { error: err });
      WebBrowser.dismissBrowser();
    });
  };

  return { currentSeries, isLoadingCurrentSeries, openCurrentSeries };
}
