# 🔊 The Resonance Project

![License](https://img.shields.io/github/license/echo-labs-team/the-resonance-project)
![Dev Publish](https://github.com/echo-labs-team/the-resonance-project/workflows/Dev%20Publish/badge.svg?branch=dev)
![Production Publish](https://github.com/echo-labs-team/the-resonance-project/workflows/Production%20Publish/badge.svg)

A React Native application for Echo.Church built by volunteers

<p align="center"><img src="https://echo.church/wp-content/uploads/2018/01/echo_logo_main_header.png" width="300" /></p>


## 🔌 Installation

Open a bash terminal:

1. Clone the repo

   ```sh
   git clone https://github.com/echo-labs-team/the-resonance-project.git
   ```

2. Install NPM

   If `$ which npm` returns a path, then go to 3. If not, [download here](https://nodejs.org/en/download/).

   `$ which npm` should now return a path

3. Install modules

   ```sh
   cd the-resonance-project
   npm i
   ```

4. Install expo

   If `$ which expo` returns a path, skip this.

   ```sh
   npm install expo-cli --globals
   ```

5. Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)

   If `$ which pod` returns a path, skip this.

   ```sh
   sudo gem install cocoapods
   ```

6. Install the pods

   ```sh
   cd the-resonance-project/ios/
   pod install
   ```

7. Download xcode from the Mac App store
8. Download android studio
9. Go [here](https://drive.google.com/drive/folders/1_PorSP9Kw-DGxbRYVYNSPDgLA_JrmGVf)
   to download Keys.js and put it in `the-resonance-project/constants/`

## 👩‍💻 Running the app 👨‍💻

### 📱 iOS

1. In a terminal:

   ```sh
   expo start
   ```

2. Open Xcode
3. Open the-resonance-project/ios/echo-church.xcworkspace
4. Click the play button in the upper left hand corner.

### 🤖 Android

1. In a terminal:

   ```sh
   expo start
   ```

2. Open Android Studio
3. Open the-resonance-project/android folder
4. Click the green play button.

## Documentation 📃

See more of our documentation over at [docs/](https://github.com/echo-labs-team/the-resonance-project/tree/dev/docs)
