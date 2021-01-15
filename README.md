# NuLeaf Resolution App

## Description
Feeling down on keeping up with your New Year's Resolutions?  This extrodinary web app will enable you to enter and track or search out additional New Year's Resolutions.  Need additional accountability to follow through on your resolutions? This app will allow you to post to your favorite social media circle to let others know which resolutions you are working on.

## Setting Up 
1. `git clone` to local machine
2.  `docker-compose up`
### Setting Up in Development Mode
1. `NPM install`
2. In terminal `NPM Start` 
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
3. Start postgres db
4. In terminal `NPM Run Server`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).	

## Available Scripts	

In the project directory, you can run:	

### `npm start`	

Runs the app in the development mode.\	
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.	

The page will reload if you make edits.\	
You will also see any lint errors in the console.	

### `npm test`	

Launches the test runner in the interactive watch mode.\	
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.	

### `npm run build`	

Builds the app for production to the `build` folder.\	
It correctly bundles React in production mode and optimizes the build for the best performance.	

The build is minified and the filenames include the hashes.\	
Your app is ready to be deployed!	

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Set up

### `.env`

```
DB_NAME=
DB_PASS=
```

migrate the database with `npm run migrate`
