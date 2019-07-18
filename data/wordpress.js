// @flow

import React from 'react';

const env = process.env.NODE_ENV;
const isDev = env !== 'production';

export async function getSomething(): Object {
  return [
    {
      title: 'The Keys to Generous Living',
      image: require('../assets/images/felipe.jpg'),
      type: 'BLOG',
      author: 'Filipe Santos',
      date: new Date('May 9, 2019'),
      body:
        "This Sunday I had the privilege of teaching at Echo a message about putting God first in our finanaces and the keys to a generous life and there is probably more content that exists here, but I don't relly want to make something interesting up",
    },
    {
      title: 'Tidying Up: Getting Rid of Guilt',
      image: require('../assets/images/tidying_up.png'),
      type: 'MESSAGE SERIES',
      author: 'ANDY WOOD',
      date: new Date('April 28, 2019'),
      body:
        'We all keep things we should let go of. Clutter has a way of taking peace and increasing stress. Clutter in your home can cause frustration blablablablablabalba.',
    },
    {
      title: 'Echo Kids Orientation and Lunch',
      image: require('../assets/images/children.png'),
      type: 'EVENTS',
      author: 'South San Jose',
      date: new Date('June 28, 2019 12:30'),
      body:
        'Kids, birth through 5th grade, experience safe, age appropriate environments where the Bible is taught in a creative and relevant way.',
    },
    {
      title: 'Alpha Groups Start Now',
      image: require('../assets/images/discussion.jpg'),
      type: 'ANNOUNCEMENT',
      author: 'All Campuses',
      date: new Date('July 2, 2019 12:30'),
      body:
        'Alpha is a series of sessions exploring the basics of the Christian faith that are typically run over eleven weeks. Each sessions looks at a different aspect of the Christian faith and does some things that are super important that I think are awesome',
    },
  ];
}
