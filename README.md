# University Booking System

The University Booking System is a Node.js-based web application that allows students to book sessions with academic deans. The system provides a platform for students to view available dean slots, book sessions, and for deans to manage and approve session requests.
fFxMBmzelSH3MB0B
SEEE0j4B_572mmxikRfrFA

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before getting started, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com/) (if using a local database)

### Installation

1. Clone this repository:

   
   git clone https://github.com/your-username/university-booking.git
   cd university-booking
Install project dependencies:


npm install
or with Yarn:


yarn install
Set up your configuration by creating a config.js file in the project root (see Configuration).

Start the application:


npm start
The server will run on http://localhost:3000 by default.

Usage
To use the University Booking System, follow these steps:

Register as a student or dean using the appropriate API endpoints.
Obtain a JWT token after registration or login.
Use the token to access protected API endpoints for viewing sessions and booking sessions.
API Endpoints
The following API endpoints are available:

/user/register - Register as a user (student or dean).
/user/login - Log in and obtain a JWT token.
/session/sessions - View available sessions.
/session/book - Book a session.
/session/pending-sessions - View pending sessions for deans.
For detailed API documentation, see the API documentation file.

Configuration
The application requires a config.js file to configure various settings. An example configuration can be found in config.example.js. Customize the configuration to match your environment and preferences.

Database
The University Booking System uses a PostgreSQL database to store user and session data. If you're using an online database service, ensure your config.js file includes the correct connection details.

If you're using a local MySQL database, you can set up the database schema by running Sequelize migrations (not required for online databases).

Contributing
Contributions to this project are welcome. You can contribute by opening issues, submitting pull requests, or suggesting improvements.

License
This project is licensed under the MIT License.

 

 