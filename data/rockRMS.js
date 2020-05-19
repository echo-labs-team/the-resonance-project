// @flow
import Keys from '../constants/Keys';
import axios from 'axios';
const generatedByAppComment =
  'This connection request was generated by the mobile App';

export const connectionOpportunity = {
  JOIN_DREAM_TEAM: { name: 'Join Dream Team', id: 4 },
  BAPTISM: { name: 'Baptism', id: 5 },
  JOIN_ECHO_GROUP: { name: 'Join Echo Group', id: 6 },
  FOLLOWER_OF_JESUS: { name: 'Follower Of Jesus', id: 7 },
  ACTIVATE: { name: 'Activate', id: 8 },
  OTHER_REQUESTS: { name: 'Other Requests', id: 24 },
  FIRST_TIME_GUEST: { name: 'First Time Guest', id: 34 },
  SECOND_TIME_GUEST: { name: 'Second Time Guest', id: 47 },
  MULTIPLE_BOXES_CHECKED: 72,
  BAPTISM_INQUIRY: { name: 'Get Baptized', id: 75 },
};

const connectionActivityType = {
  ASSIGNED: 6,
};

export const campus = {
  NORTH_SAN_JOSE: { name: 'North San Jose', shortCode: 'NSJ', id: 2 },
  SOUTH_SAN_JOSE: { name: 'South San Jose', shortCode: 'SSJ', id: 3 },
  FREMONT: { name: 'Fremont', shortCode: 'FMT', id: 4 },
  SUNNYVALE: { name: 'Sunnyvale', shortCode: 'SVL', id: 5 },
  ONLINE: { name: 'Online', shortCode: 'ONLINE', id: 6 },
};

const connectionStatusId = {
  IN_PROGRESS: 3,
  NO_CONTACT: 4,
  CONNECTION_COMPLETE: 21,
  ACTIVE: 24,
};

const campusConnectorsAliasID = {
  SVL: 17313,
  FMT: 529,
  SSJ: 762,
  NSJ: 3433,
  ONLINE: 36935,
};

const authorizationToken = {
  'Authorization-Token': Keys.ROCK_API_KEY,
};

export const BLANK_PERSON = {
  personExistsInRock: false,
  personID: 0,
  personAliasId: 0,
  firstName: 'No First Name',
  lastName: 'No Last Name',
  birthDate: '00/00/0000',
  phoneNumber: 'No Phone Number',
  email: 'No email',
  isRockUser: false,
  username: 'No Username',
};

const ROCK_API_URL = 'https://rock.echo.church/api/';
const ROCK_PERSON_EMAIL_URL = `${ROCK_API_URL}People/GetByEmail/`;
const ROCK_PERSON_PHONE_URL = `${ROCK_API_URL}People/GetByPhoneNumber/`;
const ROCK_PERSON_URL = `${ROCK_API_URL}People`;
const ROCK_CONNECTION_URL = `${ROCK_API_URL}ConnectionRequests`;
const ROCK_CONNECTION_ACTIVITY_URL = `${ROCK_API_URL}ConnectionRequestActivities`;

/*
newPerson object {
  fname: ,
  lname: ,
  email: ,
  phoneNumber: ,
  dateOfBirth: ,
}

connectionRequests array of connectionOpportunity properties

campus = one of the campus properties

can be called like this =>
submitConnectionRequest(
        {
          fname: 'test',
          lname: 'test2',
          email: 'test3@test.com',
          phoneNumber: '555-444-3333',
          dateOfBirth: '01/01/2000',
        },
        [
          connectionOpportunity.ACTIVATE,
          connectionOpportunity.FIRST_TIME_GUEST,
        ],

        campus.SUNNYVALE
      )
*/
export async function submitConnectionRequest(
  newPerson: any,
  connectionRequests: any,
  campusName: any
) {
  const connectionRequestStatus = {
    connectionRequestSubmitted: false,
    error: '',
  };

  let personInfoFromRock = BLANK_PERSON;

  // check if person exists
  personInfoFromRock = await getPerson(newPerson.email, newPerson.phoneNumber);
  // create person if they dont
  if ((await personInfoFromRock.personExistsInRock) == false) {
    personInfoFromRock = await createPerson(
      newPerson.fname,
      newPerson.lname,
      newPerson.email,
      newPerson.phoneNumber,
      newPerson.dateOfBirth
    );
  }
  if ((await personInfoFromRock.personExistsInRock) === false) {
    connectionRequestStatus.error = 'Failed to create person in the Rock';
    return connectionRequestStatus;
  }
  /* eslint-disable */
  for (const connection of connectionRequests) {
    // create connection request for each type of connection
    const result = await createConnectionRequest(
      personInfoFromRock.personAliasId,
      connection.id,
      campusName,
      generatedByAppComment
    );

    let connectionRequestId = result;

    // create connection activities for each connection request
    let ConnectionActivityId = await createConnectionRequestActivity(
      connectionRequestId,
      connection.id
    );
  }
  /* eslint-enable */
  return (connectionRequestStatus.connectionRequestSubmitted = true);
}

export async function getPerson(
  email: string = '',
  phoneNumber: string = '',
  id: number = 0
) {
  const person = BLANK_PERSON;

  if (email === '' && phoneNumber === '') {
    return person;
  }
  let result = {};

  if (email.length > 0) {
    result = await axios.get(ROCK_PERSON_EMAIL_URL + email, {
      headers: authorizationToken,
    });
  } else if (phoneNumber.length > 0) {
    result = await axios.get(ROCK_PERSON_PHONE_URL + phoneNumber, {
      headers: authorizationToken,
    });
  } else {
    result = await axios.get(ROCK_PERSON_URL + id, {
      headers: authorizationToken,
    });
  }

  if (result.data.length > 0) {
    const data = result.data[0];

    person.personExistsInRock = true;
    person.personID = data.Id;
    person.personAliasId = data.PrimaryAliasId;
    if (data.Users.length > 0) {
      person.isRockUser = true;
      person.username = data.Users[0].UserName;
    }
  }
  return person;
}

export async function createPerson(
  fname: string,
  lname: string,
  email: string,
  phoneNumber: string,
  dateOfBirth: string
) {
  const birthdate = splitBirthDate(dateOfBirth);

  const newPerson = {
    IsSystem: false,
    FirstName: fname,
    LastName: lname,
    BirthDay: birthdate[1],
    BirthMonth: birthdate[0],
    BirthYear: birthdate[2],
    Gender: 'Unknown',
    Email: email,
    PhoneNumbers: [
      {
        NumberTypeValue: {
          IsSystem: true,
          DefinedTypeId: 13,
          Order: 0,
          Value: 'Mobile',
          Description: 'Mobile/Cell phone number',
          IsActive: true,
          Id: 12,
        },
        IsSystem: false,
        PersonId: 0,
        CountryCode: '1',
        Number: removeFormattingFromPhoneNumber(phoneNumber),
        IsMessagingEnabled: true,
      },
    ],
  };

  const result = await axios.post(ROCK_PERSON_URL, newPerson, {
    headers: authorizationToken,
  });

  const userId = await result.data;

  const newRockPerson = await getPerson('', '', userId);

  return newRockPerson;
}

export function splitBirthDate(birthdate: string) {
  return birthdate.split('/');
}

export function removeFormattingFromPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/[^0-9]/g, '');
}

export async function createConnectionRequest(
  aliasId: number,
  connectionOpportunityId: number,
  campusName: any,
  comment: string
) {
  const connectorId = campusConnectorsAliasID[campusName.shortCode];

  const connectionRequest = {
    ConnectionOpportunityId: connectionOpportunityId,
    personAliasId: aliasId,
    Comments: comment,
    ConnectionStatusId: connectionStatusId.ACTIVE,
    ConnectionState: 'Active',
    CampusId: campusName.id,
    ConnectorPersonAliasId: connectorId,
    ConnectionStatus: null,
    ConnectionOpportunity: null,
  };

  const result = await axios.post(ROCK_CONNECTION_URL, connectionRequest, {
    headers: authorizationToken,
  });

  return result.data;
}

export async function createConnectionRequestActivity(
  connectionRequestId: number,
  connectionOpportunityId: number
) {
  const connectionRequestActivity = {
    ConnectionRequestId: connectionRequestId,
    ConnectionActivityTypeId: connectionActivityType.ASSIGNED,
    ConnectionOpportunityId: connectionOpportunityId,
  };

  const connectionRequestActivityId = await axios.post(
    ROCK_CONNECTION_ACTIVITY_URL,
    connectionRequestActivity,
    {
      headers: authorizationToken,
    }
  );

  return connectionRequestActivityId;
}
