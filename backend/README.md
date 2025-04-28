# Event Management App - Backend

This is the backend for the Event Management application. It is built using Node.js and Express, and it provides RESTful APIs for managing events and user registrations.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the controller classes that handle incoming requests and responses.
  - **routes/**: Contains the route definitions for the application.
  - **models/**: Contains the data models that define the structure of the data.
  - **services/**: Contains the service classes that encapsulate business logic.
  - **types/**: Contains TypeScript interfaces and types used throughout the application.
  - **app.ts**: The entry point of the backend application.

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- npm (version X.X.X)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd event-management-app/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the backend server, run the following command:
```
npm start
```

The server will run on `http://localhost:3000` by default.

### API Endpoints

- `GET /:userId/events`: Fetch events for a specific user.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.