# notifyMe

## About
This repository was created for the course 1DV612: Web Application Architectures and Frameworks. Linnaeus University, Sweden.

You can find the assignment [here.](https://coursepress.gitbooks.io/1dv612/content/assignments/assignment-2)

A live demo of this application can be found at [https://notifyme.alexnaga.se](https://notifyme.alexnaga.se)

Dashboard for real-time notifications from Github. Built with React.js and Express.js

![notifyMe](https://github.com/AlexNaga/notifyMe/raw/master/img/notifyme_overview.png)

## Running the Application
1. Clone this repository or download the [.zip](https://github.com/1dv612/an222zd-examination/archive/master.zip) file.
2. Extract folder to preferred location.

  ### Starting the server
  1. Open up the terminal in the server folder.
  2. Install the required dependencies by typing `npm install`
  3. Create the environment variables by typing the following
  ```bash
  echo '{
    SERVER_DOMAIN="localhost:8000"
    GITHUB_CLIENT_ID="YOUR_GITHUB_CLIENT_ID"
    GITHUB_CLIENT_SECRET="YOUR_GITHUB_SECRET"
    GITHUB_WEBHOOK_SECRET="A_RANDOM_SECRET"
    MONGO_ATLAS_USERNAME="YOUR_MONGODB_USERNAME"
    MONGO_ATLAS_PASSWORD="YOUR_MONGODB_PASSWORD"
    JWT_SECRET="A_RANDOM_SECRET"
    WEBHOOK_DISCORD_URL="https://discordapp.com/api/webhooks/426058275583295489/x05E9NRWo-T9Et3cohcznhHBDk0WTeg56R_3cBqLhE0A665ooa4hZSWrX7PtV4L4mUDl"
  }' > .env
  ```
  4. Start the application by typing `npm start`
  5. The application is now running at [http://localhost:8000](http://localhost:8000)

  ### Starting the client
  1. Open up the terminal in the client folder.
  2. Install the required dependencies by typing `npm install`
  3. Create the environment variables by typing the following
  ```bash
  echo '{
    NODE_PATH="src/"
    REACT_APP_SERVER_DOMAIN="localhost:3000"
  }' > .env
  ```
  4. Start the application by typing `npm start`  
  5. The application is now running at [http://localhost:3000](http://localhost:3000)
  
## Deploying the Application
1. Open up the terminal in the client folder.
2. Build the application for production by typing `npm run build`
3. Copy the build folder to the server folder by typing `mv build/ ../server/public/`
4. The application is now ready for production.

## Architecture
**Application Overview**  
![Application Overview](https://github.com/AlexNaga/notifyMe/raw/master/img/app_overview.svg?sanitize=true)

**Server-side Overview**  
![Server-side Overview](https://github.com/AlexNaga/notifyMe/raw/master/img/server_overview.svg?sanitize=true)

**Client-side Overview**  
![Client-side Overview](https://github.com/AlexNaga/notifyMe/raw/master/img/client_overview.svg?sanitize=true)
