import { useState } from 'react';
import { useQuery } from 'react-query';
import useDebounce from 'react-use/lib/useDebounce';
import axios from 'redaxios';
import logEvent from '../utils/logEvent';

export interface Group {
  AtCapacity: boolean;
  AudienceColor: string;
  AudienceCssClassIcon: string;
  AudienceGuid: string;
  AudienceName: string;
  City: string;
  Cost: string;
  DayOfWeek: string;
  Description: string;
  DescriptionTruncated: string;
  Featured: boolean;
  FriendlyScheduleText: string;
  GroupCampus: string;
  GroupFormat: string;
  GroupMemberStatus: string;
  GroupPhotoGuid: string;
  GroupTypeName: string;
  HostNames: string;
  Id: number;
  Latitude: number;
  LeaderNames: string;
  LeaderPhotoGuid: string;
  Longitude: number;
  MeetingFrequency: string;
  Name: string;
  PrimaryLanguageGuid: string;
  PrimaryLanguageName: string;
  State: string;
  Summary: string;
  SummaryTruncated: string;
  TimeOfDay: string;
  TopicGuid: string;
  TopicName: string;
}

/**
 * Get groups using the Rock's GroupFinder API
 * https://rock.echo.church/api/docs/index#/GroupFinder
 */
async function fetchOpenGroups() {
  const { data } =
    (await axios.get<{ Data: Array<Group>; Error: Error; Success: boolean }>(
      'https://rock.echo.church/api/GroupFinder/GetGroups/25,161/0'
    )) || {};

  if (!data.Success || !data.Data || !Array.isArray(data.Data)) {
    logEvent('ERROR loading groups', { error: data.Error });
    throw Error('Error loading groups');
  }

  const groups = data.Data.filter(({ AtCapacity = false }) => !AtCapacity).sort(
    ({ Featured: FeaturedOne }, { Featured: FeaturedTwo }) => {
      if (FeaturedOne && !FeaturedTwo) return -1;
      if (FeaturedTwo && !FeaturedOne) return 1;
      return 0;
    }
  );

  return { groups };
}

export type Filters = {
  audiences: string[];
  campus: string[];
  day: string[];
  topics: string[];
};

export const initialFilters: Filters = {
  audiences: [],
  campus: [],
  day: [],
  topics: [],
};

export function useGroups() {
  const [searchString, setSearchString] = useState('');
  const [debouncedSearchString, setDebouncedSearchString] = useState('');
  useDebounce(
    () => {
      setDebouncedSearchString(searchString);
    },
    500,
    [searchString]
  );
  const [filters, setFilters] = useState(initialFilters);
  const { data, isLoading } = useQuery({
    queryFn: fetchOpenGroups,
    queryKey: [{ $scope: 'groups' }],
    select: ({ groups }) => {
      if (debouncedSearchString) {
        return {
          groups: groups.filter(({ Name }) =>
            Name.toLowerCase().includes(debouncedSearchString.toLowerCase())
          ),
        };
      }

      if (
        filters.campus.length ||
        filters.day.length ||
        filters.audiences.length ||
        filters.topics.length
      ) {
        return {
          groups: groups.filter(
            ({ AudienceName, DayOfWeek, GroupCampus, TopicName }) => {
              return (
                (filters.campus.length
                  ? filters.campus
                      .map((c) => c?.toLowerCase())
                      .includes(GroupCampus?.toLowerCase())
                  : true) &&
                (filters.day.length
                  ? filters.day.some(
                      (day) => DayOfWeek.toLowerCase() === day?.toLowerCase()
                    )
                  : true) &&
                (filters.audiences.length
                  ? filters.audiences.includes(AudienceName)
                  : true) &&
                (filters.topics.length
                  ? filters.topics.includes(TopicName)
                  : true)
              );
            }
          ),
        };
      }

      return { groups };
    },
  });
  const numberOfFiltersApplied = Object.values(filters).reduce(
    (acc, curr) => acc + curr.length,
    0
  );

  return {
    filters,
    groups: data?.groups,
    isLoading,
    numberOfFiltersApplied,
    searchString,
    setFilters,
    setSearchString,
  };
}

export function askQuestion(
  groupId: number,
  firstName: string,
  lastName: string,
  email: string,
  question: string
) {
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

export function joinGroup(
  groupId: number,
  firstName: string,
  lastName: string,
  email: string
) {
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
