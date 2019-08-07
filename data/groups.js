// @flow

import axios from 'axios';
import config from './config';

// get the service endpoint based on the environment
const baseURL = __DEV__
  ? 'https://mzbo5txd78.execute-api.us-west-1.amazonaws.com/Echo_Groups_QA'
  : 'https://hr8iyfwzze.execute-api.us-west-1.amazonaws.com/Prod';

const testGroupID = '2860932';

// set the featured group, which is sorted to the top of the list of groups
const isFeaturedGroup = groupName =>
  groupName.toLowerCase().includes(config.featuredGroup);

export async function getOpenGroups(): Object {
  const today = new Date();
  const year = today.getFullYear();
  const startMonth = 9;
  const startDay = 7;
  const endMonth = 12;
  const endDay = 31;

  const {
    data: {
      errorMessage = 'Error fetching groups',
      errorType,
      stackTrace,
      body,
    } = {},
  } =
    (await axios.get(`${baseURL}/groups/open`, {
      params: {
        start_year: year,
        start_month: startMonth,
        start_day: startDay,
        end_year: year,
        end_month: endMonth,
        end_day: endDay,
      },
    })) || {};

  if (!body) {
    // amplitude.getInstance().logEvent('error', {
    //   message: errorMessage,
    //   type: errorType,
    //   stack: stackTrace,
    // });
    throw Error(errorMessage);
  }

  const groups = JSON.parse(body);

  if (!Array.isArray(groups)) {
    // amplitude.getInstance().logEvent('error', {
    //   message: errorMessage,
    //   type: errorType,
    //   stack: stackTrace,
    // });
    throw Error(errorMessage);
  }

  return groups
    .map(group => {
      const {
        campus = '',
        categories = { CustomeCategories: [] },
        hasChildcare,
      } = group;

      return {
        ...group,
        campus: campus && campus.toUpperCase(),
        attributes: categories.CustomeCategories,
        hasChildcare: hasChildcare === 'true',
      };
    })
    .sort(({ groupname = '' }, { groupname: groupName = '' }) => {
      if (isFeaturedGroup(groupname) && !isFeaturedGroup(groupName)) {
        return -1;
      }
      if (!isFeaturedGroup(groupname) && isFeaturedGroup(groupName)) {
        return 1;
      }
      return 0;
    });
}

export async function getCategories(): Promise<Array<any>> {
  const {
    data: {
      errorMessage = 'Error getting categories',
      errorType,
      stackTrace,
      statusCode,
      body,
    } = {},
  } = (await axios.get(`${baseURL}/groups/categories`)) || {};

  const success = statusCode === 200;

  if (!success) {
    // amplitude.getInstance().logEvent('error', {
    //   message: errorMessage,
    //   type: errorType,
    //   stack: stackTrace,
    // });
    return [];
  }

  const { categories = [] } = JSON.parse(body);

  return categories
    .map(({ name }) => name !== 'Sermon-based' && name !== 'Easter' && name)
    .filter(Boolean);
}

export async function askQuestion(
  groupId: string,
  firstName: string,
  lastName: string,
  email: string,
  question: string
): Promise<boolean> {
  const {
    data: {
      errorMessage = 'Error asking question',
      errorType,
      stackTrace,
      statusCode,
    } = {},
  } =
    (await axios.post(`${baseURL}/contact`, {
      // TODO: change back later
      // groupId: __DEV__ ? testGroupID : groupId,
      groupId: testGroupID,
      firstName,
      lastName,
      email,
      body: question,
    })) || {};

  const success = statusCode === 200;

  if (!success) {
    // amplitude.getInstance().logEvent('error', {
    //   message: errorMessage,
    //   type: errorType,
    //   stack: stackTrace,
    // });
  }

  return success;
}

export async function joinGroup(
  groupId: string,
  firstName: string,
  lastName: string,
  email: string
): Promise<boolean> {
  const {
    data: {
      errorMessage = 'Error asking question',
      errorType,
      stackTrace,
      statusCode,
    } = {},
  } =
    (await axios.post(`${baseURL}/people/join`, {
      // TODO: change back later
      // groupId: __DEV__ ? testGroupID : groupId,
      groupId: testGroupID,
      person: {
        firstName,
        lastName,
        email,
        memberType: 'Member',
      },
    })) || {};

  const success = statusCode === 200;

  if (!success) {
    // amplitude.getInstance().logEvent('error', {
    //   message: errorMessage,
    //   type: errorType,
    //   stack: stackTrace,
    // });
  }

  return success;
}
