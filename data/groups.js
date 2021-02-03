import axios from 'redaxios';
import config from './config';
import logEvent from '../utils/logEvent';

const baseURL = 'https://echo-api.westus.cloudapp.azure.com';

// set the featured group, which is sorted to the top of the list of groups
const isFeaturedGroup = (groupName) =>
  groupName.toLowerCase().includes(config.featuredGroup);

export async function getCategories() {
  const { data, status } =
    (await axios
      .get(`${baseURL}/groups/rock-categories`, {})
      .catch((err) =>
        logEvent('ERROR getting group categories', { error: err })
      )) || {};

  if (status !== 200) {
    logEvent('ERROR loading group categories', {
      data,
      status,
    });
    return [];
  }

  const { categories = [] } = data;

  return categories.map(({ name }) => name).filter(Boolean);
}

/**
 * Get groups using the Rock's GroupFinder API
 * https://rock.echo.church/api/docs/index#/GroupFinder
 */
export async function getOpenGroups() {
  const { data } =
    (await axios.get(
      'https://rock.echo.church/api/GroupFinder/GetGroups/25?primaryAliasId=16536'
    )) || {};

  const { Success: isSuccessful, Data = [], Error } = data;

  if (!isSuccessful || !Data || !Array.isArray(Data)) {
    logEvent('ERROR loading groups', { error: Error });
    throw Error('Error loading groups');
  }

  return Data.filter(({ AtCapacity = false }) => !AtCapacity).sort(
    ({ Name = '' }, { Name: otherName = '' }) => {
      if (isFeaturedGroup(Name) && !isFeaturedGroup(otherName)) {
        return -1;
      }
      if (!isFeaturedGroup(Name) && isFeaturedGroup(otherName)) {
        return 1;
      }
      return 0;
    }
  );
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
