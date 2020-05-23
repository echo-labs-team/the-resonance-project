import axios from 'axios';
import * as Amplitude from 'expo-analytics-amplitude';
import config from './config';

// get the service endpoint based on the environment
// const baseURL = __DEV__
//   ? 'http://localhost:8080'
//   : 'https://echo-api.westus.cloudapp.azure.com';
const baseURL = 'https://echo-api.westus.cloudapp.azure.com';

// set the featured group, which is sorted to the top of the list of groups
const isFeaturedGroup = (groupName) =>
  groupName.toLowerCase().includes(config.featuredGroup);

export async function getOpenGroups() {
  const errorMessage = 'Error fetching groups';
  const { data = [] } = (await axios.get(`${baseURL}/groups/open`)) || {};

  if (!data || !Array.isArray(data)) {
    Amplitude.logEventWithProperties('ERROR loading groups', {
      error: errorMessage,
    });
    throw Error(errorMessage);
  }

  return data.sort(({ name = '' }, { name: otherName = '' }) => {
    if (isFeaturedGroup(name) && !isFeaturedGroup(otherName)) {
      return -1;
    }
    if (!isFeaturedGroup(name) && isFeaturedGroup(otherName)) {
      return 1;
    }
    return 0;
  });
}

export async function getCategories() {
  const {
    data: {
      errorMessage = 'Error getting categories',
      errorType,
      stackTrace,
      statusCode,
      body,
    } = {},
  } =
    (await axios
      .get(
        'https://hr8iyfwzze.execute-api.us-west-1.amazonaws.com/Prod/groups/categories'
      )
      .catch((err) =>
        Amplitude.logEventWithProperties('ERROR hitting `/groups/categories`', {
          error: err,
        })
      )) || {};

  const success = statusCode === 200;

  if (!success) {
    Amplitude.logEventWithProperties('ERROR loading group categories', {
      message: errorMessage,
      type: errorType,
      stack: stackTrace,
    });
    return [];
  }

  const { categories = [] } = JSON.parse(body);

  return categories
    .map(({ name }) => name !== 'Sermon-based' && name !== 'Easter' && name)
    .filter(Boolean);
}

export function askQuestion(groupId, firstName, lastName, email, question) {
  const params = {
    GroupID: groupId,
    FirstName: firstName,
    LastName: lastName,
    Email: email,
    Question: question,
  };

  if (__DEV__) {
    console.log({ params });
    return Promise.resolve(true);
  }
  return axios.get(`${baseURL}/groups/ask`, { params });
}

export function joinGroup(groupId, firstName, lastName, email) {
  const params = {
    GroupID: groupId,
    FirstName: firstName,
    LastName: lastName,
    Email: email,
  };

  if (__DEV__) {
    console.log({ params });
    return Promise.resolve(true);
  }
  return axios.get(`${baseURL}/groups/join`, { params });
}
