import axios from 'redaxios';
import logEvent from '../utils/logEvent';

/**
 * Get groups using the Rock's GroupFinder API
 * https://rock.echo.church/api/docs/index#/GroupFinder
 */
export async function getOpenGroups() {
  const { data } =
    (await axios.get(
      'https://my.echo.church/api/GroupFinder/GetGroups/25,161?primaryAliasId=16536'
    )) || {};

  const { Data = [], Error, Success: isSuccessful } = data;

  if (!isSuccessful || !Data || !Array.isArray(Data)) {
    logEvent('ERROR loading groups', { error: Error });
    throw Error('Error loading groups');
  }

  return Data.filter(({ AtCapacity = false }) => !AtCapacity).sort(
    ({ Featured: FeaturedOne }, { Featured: FeaturedTwo }) => {
      if (FeaturedOne && !FeaturedTwo) {
        return -1;
      }
      if (FeaturedTwo && !FeaturedOne) {
        return 1;
      }
      return 0;
    }
  );
}

export function askQuestion(groupId, firstName, lastName, email, question) {
  const data = {
    Email: email.trim(),
    FirstName: firstName.trim(),
    GroupId: groupId,
    LastName: lastName.trim(),
    Question: question.trim(),
  };

  if (__DEV__) {
    console.log({ data });
    return Promise.resolve({ Success: true });
  }

  return axios({
    data,
    method: 'post',
    url: 'https://rock.echo.church/api/GroupFinder/AskQuestion',
  });
}

export function joinGroup(groupId, firstName, lastName, email) {
  const data = {
    Email: email.trim(),
    FirstName: firstName.trim(),
    GroupId: groupId,
    LastName: lastName.trim(),
  };

  if (__DEV__) {
    console.log({ data });
    return Promise.resolve({ Success: true });
  }

  return axios({
    data,
    method: 'post',
    url: 'https://rock.echo.church/api/GroupFinder/JoinGroup',
  });
}
