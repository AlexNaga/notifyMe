# 1DV612: Assignment

Interface repository for 1DV612 Assignment

## About
This repository was created for the course 1DV612: Web Application Architectures and Frameworks. Linnaeus University, Sweden.

You can find the assignment [here.](https://coursepress.gitbooks.io/1dv612/content/assignments/assignment-2)

## Running the Application
1. Clone this repository or download the [.zip](https://github.com/1dv612/an222zd-examination/archive/master.zip) file.
2. Extract folder to preferred location.

  ### Starting the server
  1. Open up the terminal in the server folder.
  2. Install the required dependencies by typing `npm install`
  3. Create the environment variables by typing
```
echo '{
  NODE_PATH="src/"
  REACT_APP_DOMAIN="https://alexnaga.se/"
}' > .env
```
  3. Start the application by typing `npm start`
  4. The application is now running at [http://localhost:8000](http://localhost:8000)

  ### Starting the client
  1. Open up the terminal in the client folder.
  2. Install the required dependencies by typing `npm install`
  3. Start the application by typing `npm start`
  4. The application is now running at [http://localhost:3000](http://localhost:3000)
  
## Deploying the Application
1. Open up the terminal in the client folder.
2. Build the application for production by typing `npm run build`
3. Copy the build folder to the server folder by typing ``
