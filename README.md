# TaskMon

> Legacy Project for TaskMon, a task manager

## Team

  - __Product Owner__: Jeffrey Lee
  - __Scrum Master__: Aren Rostamian
  - __Development Team Members__: Timothy Yoon, Michael Nguyen

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Set up for Auth0 (create account if you haven't already done so):
- Create a Client (named TaskMon). In its settings, add 'http://localhost:3000/' to Allowed Callback URLs
- Under Connections -> Social, enable Google (and maybe Github) (Note: app is not configured to use connections via a normal database Username-Password-Authentication setting)
- Under Rules -> Email Domain Whitelist -> make sure this is disabled, or includes email addresses you will be using (such as gmail.com)
- Go to the Auth.js file in codebase (under client/src/Auth) and update the credentials with your own Auth0 client:
```sh
 domain: 'YOUR_DOMAIN_URL',
clientID: 'YOUR_CLIENT_ID',
redirectUri: 'http://localhost:3000',
audience: 'YOUR AUDIENCE',
responseType: 'token id_token',
scope: 'openid profile'
```
- Note: in the above 'scope', 'profile' is needed for the app to work properly, (even though this is omitted from the normal quick start usage provided by Auth)

> 
> 
> Set up (local) MySQL database:
> 
> 1. Using Homebrew: install MySQL if needed, then load and run it: https://gist.github.com/nrollr/3f57fc15ded7dddddcc4e82fe137b58e

> 2. In Terminal (in repo directory?):
```sh
mysql -u root -p
```

> 3. Within SQL Terminal Navigation, create the database, use it, and import schemas/tables:

```sh
create database taskmon;
use taskmon;
source Database/database.sql
```

> 4. Back in regular terminal, within repo directory, seed the database:
```sh
node seedData/seed.js
```

## Requirements

- "auth0-js": "^8.8.0",
- "axios": "^0.16.2",
- "babel-core": "^6.25.0",
- "babel-loader": "^7.1.1",
- "babel-preset-es2015": "^6.24.1",
- "babel-preset-react": "^6.24.1",
- "body-parser": "^1.17.2",
- "cors": "^2.8.4",
- "css-loader": "^0.28.4",
- "d3-ease": "^1.0.3",
- "express": "^4.15.3",
- "http": "0.0.0",
- "jquery": "^3.2.1",
- "knex": "^0.13.0",
- "mysql": "^2.14.1",
- "mysql2": "^1.4.0",
- "nodemon": "^1.11.0",
- "path": "^0.12.7",
- "react": "^15.6.1",
- "react-addons-css-transition-group": "^15.6.0",
- "react-bootstrap": "^0.31.2",
- "react-circular-progressbar": "^0.1.5",
- "react-dom": "^15.6.1",
- "react-dropzone": "^4.0.0",
- "react-icons-kit": "^1.0.7",
- "react-md-spinner": "^0.2.5",
- "react-redux": "^5.0.5",
- "react-router-dom": "^4.1.2",
- "react-sidenav": "^2.1.2",
- "react-sparklines": "^1.7.0",
- "react-tree-graph": "^2.0.0",
- "recharts": "^1.0.0-alpha.2",
- "redux": "^3.7.2",
- "redux-promise": "^0.5.3",
- "sequelize": "^4.4.2",
- "socket.io": "^2.0.3",
- "socket.io-client": "^2.0.3",
- "webpack": "^3.4.1"

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Ideas for Contributions
- Add details to existing user pages, and ability to retreive members for a project based on such additional info.
- Update database to use a graph structure (instead of a (currently?) tree structure?)
- Add project details page, containing notes, messages, etc
- Add tracking of monetary aspect to the budget
- Add notifications for users on milestones/deadlines/check-ins
- Add chatting between members of a group
- Add WebRTC video chat

## Known Bugs
- Auth0 is configured only to use Google (and Github, untested) logins. Unexpected behavior may occur if logging in with other means. 
- Dropzone functionality is not implemented to a working state
- (CORRECTED) Aside from the seeded users, additional users are entered as 'NULL' into the database (on new logins) (CORRECTED with Auth0 fix)
- (CORRECTED) Projects and Tasks are seeded into the database, but they're not displayed on the webpage (shows zero projects/tasks. possibly part of the issue where user is logged in as 'NULL') (CORRECTED with Auth0 fix. Note: you are still unable to view projects that you are not a part of, this is normal behavior)
- Able to assign tasks to unknown users (maybe this is ok if handled correctly, but currently there is no handling of such info)
- Parsing of user data on project tree page may not be compatible with other users aside from seeded users, meaning they won't correctly render on project tree page. (Currently debugging.. when entering a name into the assignee field, the format must be something like "{username: 'jardini.alex', image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'}" in order to display correctly. See the functions handleTaskForm and onNodeClick in TasksTree.jsx)

## Other Notes
- Seems like assignees for tasks were originally intended to be an array (you could have multiple users assigned to a task), but was later modified for purposing single assignees (mainly in the task display of who the assignee is).
