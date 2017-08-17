# TaskMon

> Legacy for Task Mon

Database hosted on MySQL local database.

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

> Set up Auth0 (may need to debug)
> 
> Set up MySQL database.
> 
> 1. Using Homebrew: install MySQL if needed, then load and run it: https://gist.github.com/nrollr/3f57fc15ded7dddddcc4e82fe137b58e
> 
> 2. In Terminal (in repo directory?): mysql -u root -p
> 
> 3. Within SQL Terminal Navigation, create the database, use it, and import schemas/tables:
> 
> create database taskmon;
> 
> use taskmon;
> 
> source Database/database.sql
> 
> 4. Back in regular terminal, within repo directory, seed the database:
>
> node seedData/seed.js
> 

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
- Add more details to user pages

## Known Bugs
- Dropzone functionality is not fully implemented
