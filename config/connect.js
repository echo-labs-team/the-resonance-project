/**
 * The different items in the Connect tab
 */

import Colors from '../constants/Colors';

/**
 * The main Connect items
 */
export const listItems = [
  { value: 'LOCATIONS', page: 'Locations' },
  { value: 'BAPTISM', page: 'Baptism' },
  { value: 'VOLUNTEER', page: 'Volunteer' },
  { value: 'PRAYER REQUESTS', page: 'Prayer Requests' },
  { value: 'MISSIONS', page: 'Missions' },
];

/**
 * Any Call-To-Action buttons
 */
export const callToActionButtons = [
  {
    title: 'Join the Hope Project',
    url: 'https://echo.church/2020/06/14/get-ready-for-the-hope-project/',
    backgroundColor: Colors.blue,
  },
  {
    title: 'Echo Compassion (COVID-19)',
    url: 'https://echochurchteam.typeform.com/to/UOQ9sl',
    backgroundColor: Colors.red,
  },
];
