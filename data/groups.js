import axios from 'axios';
import * as Amplitude from 'expo-analytics-amplitude';
import config from './config';

const baseURL = 'https://echo-api.westus.cloudapp.azure.com';

// set the featured group, which is sorted to the top of the list of groups
const isFeaturedGroup = (groupName) =>
  groupName.toLowerCase().includes(config.featuredGroup);

export async function getCategories() {
  const { data, status } =
    (await axios.get(`${baseURL}/groups/rock-categories`, {}).catch((err) =>
      Amplitude.logEventWithProperties('ERROR getting group categories', {
        error: err,
      })
    )) || {};

  if (status !== 200) {
    Amplitude.logEventWithProperties('ERROR loading group categories', {
      data,
      status,
    });
    return [];
  }

  const { categories = [] } = data;

  return categories
    .map(({ name }) => {
      if (name === 'Sermon-based') {
        return false;
      }
      if (name === 'Easter') {
        return false;
      }

      return name;
    })
    .filter(Boolean);
}

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

export function askQuestion(groupId, firstName, lastName, email, question) {
  const params = {
    GroupID: groupId,
    FirstName: firstName.trim(),
    LastName: lastName.trim(),
    Email: email.trim(),
    Question: question.trim(),
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
    FirstName: firstName.trim(),
    LastName: lastName.trim(),
    Email: email.trim(),
  };

  if (__DEV__) {
    console.log({ params });
    return Promise.resolve(true);
  }
  return axios.get(`${baseURL}/groups/join`, { params });
}
