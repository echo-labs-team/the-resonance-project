import axios from 'axios';
import { getCategories } from '../groups';

jest.mock('axios');

test('should get group categories', async () => {
  axios.get.mockResolvedValue({
    status: 200,
    data: {
      categories: [
        {
          name: 'Sermon Discussion',
          id: '20090',
        },
        {
          name: 'Men Only',
          id: '13299',
        },
        {
          name: 'Women Only',
          id: '13300',
        },
        {
          name: 'Young Professionals',
          id: '13304',
        },
        {
          name: 'Students',
          id: '13305',
        },
        {
          name: 'Recreational / Social',
          id: '15168',
        },
        {
          name: 'Co-Ed',
          id: '15169',
        },
        {
          name: 'Family / Parenting',
          id: '16466',
        },
        {
          name: 'Service / Outreach / Prayer',
          id: '16467',
        },
        {
          name: 'Business / Finance',
          id: '17873',
        },
        {
          name: 'Exploring',
          id: '20152',
        },
        {
          name: 'Marriage',
          id: '21329',
        },
        {
          name: 'Bible Study',
          id: '22396',
        },
      ],
    },
  });

  const categories = await getCategories();

  expect(categories).toMatchSnapshot();
});
