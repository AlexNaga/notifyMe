# 1DV612: Assignment

Interface repository for 1DV612 Assignment

## About
This repository was created for the course 1DV612: Web Application Architectures and Frameworks. Linnaeus University, Sweden.

You can find the assignment [here.](https://coursepress.gitbooks.io/1dv612/content/assignments/assignment-2)

## Table of Contents

- [Running the application](#running-the-application)
- [Available Scripts](#available-scripts)
  - [npm start](#-npm-start-)
  - [npm run build](#-npm-run-build-)

## Running the application
1. Clone this repository or download the `.zip` file.
2. Extract folder to preferred location.
3. Open up the terminal in the extracted folder.
4. Install the required dependencies by typing `npm install`
5. Start the application by typing `npm start`
6. The application is now running at [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm run build`

Builds and minifys the app for production, to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

Authorization Code Grant flow
In the traditional approach for an application with server side rendering, the following authentication flow works well:

User visits https://example.com.
User clicks a link to login that points her browser to https://example.com/auth/login.
Server redirects the browser to https://github.com/login/oauth/authorize.
User is presented with the Github OAuth login page and logs in.
Github redirects the browser to https://example.com/login/oauth/callback.
Server sends a HTTP POST to Github.
Github sends back a JSON reply with the access token, token type, expiration, and refresh token.

Using the passport OAuth module, the following additional steps are performed:
Server uses access token to request the Github user profile.
Server populates the user session.
Server redirects the browser to success page.



Here's an overview of what we'll be using:

React - Allows us to compose simple yet powerful UIs.
ReactRouter - Organizes the URL navigation in our React application.
ES6 - The next version of JavaScript. Allows us to write real JavaScript classes.
JSX - Allows us to place HTML in JavaScript without concatenating strings.
Express - Allows us to serve our HTML and JavaScript files.
Webpack - Allows us to pack all of our JavaScript files into one bundle.
Babel - Allows us to transpile our ES6 and JSX into ES5.
Bulma.io - Because we want things to be pretty.