// @flow

import React from 'react';

const env = process.env.NODE_ENV;
const isDev = env !== 'production';

export async function getSomething(): Object {
  if (isDev) {
    return [
      {
        title: 'TITLE',
        image: require('../assets/images/fall_leaves_bg.png'),
        type: 'BLOG',
        author: 'ANDY WOOD',
        date: Date(),
        body: 'Lorem ipsum dolor sit amet.',
      },
      {
        title: 'TITLE2',
        image: require('../assets/images/fall_leaves_bg.png'),
        type: 'MESSAGE',
        author: 'ANDY WOOD',
        date: Date(),
        body: 'Lorem ipsum dolor sit amet.',
      },
    ];
  }
  return [];
}
