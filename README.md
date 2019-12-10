# Face Recognition App

## Demo

![Face recognition application](https://github.com/elanandkumar/face-recognition-app/blob/master/docs/face-reco-app-demo.gif)

## Setup

- Fork the repository [face-recognition-app](https://github.com/elanandkumar/face-recognition-app.git)
- Next, fork the repository [face-recognition-api](https://github.com/elanandkumar/face-recognition-api.git)
- open another instance of the terminal and navigate to `face-recognition-api` folder
- Run `npm i` to install the dependencies
- Run `npm run start` to start the api server
- Now, come back to the `face-recognition-app` terminal instance
- Run `npm i`
- Run `npm run start` to run the application. It may ask that `3000` port is in use so select the next suggested port to run the application
  > _This is demo only and so no port configuration an all are done_
- Use `npm run build` to create the build.

## Purpose

This app is created using React to demonstrate the face recognition using an API called `clarifai`.

## How to use?

1. Launch the application in browser
2. Click on `signin` button
3. Look for an image having human face. (Should be URL which application can look for over internet)
4. Hit `Detect` button
5. The image will be shown at the bottom as preview and it will show a blue box if face is detected.

## What is working?

- Face recognition is working

## Known Issues

- The rectangular box for recognized face has some issue on browser resize
- Signin
- Signout
- Register
