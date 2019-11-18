#!/bin/bash

echo "rm -rf ios/build..."
rm -rf ios/build

echo "rm -rf android/app/build..."
rm -rf android/app/build

echo "Removed all Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "rm -rf lib... (for Flow)"
rm -rf lib

echo "watchman watch-del-all..."
watchman watch-del-all

echo "rm -rf node_modules..."
rm -rf node_modules

echo "npm install..."
npm --registry http://registry.npmjs.org install

echo "rm -rf $TMPDIR/react-*..."
rm -rf $TMPDIR/react-*

echo "rm -rf $TMPDIR/haste-map-react-native-packager-*..."
rm -rf $TMPDIR/haste-map-react-native-packager-*

echo "rm -rf Pods"
rm -rf ios/Pods

echo "Pod install..."
cd ios
pod install --repo-update
cd ..
