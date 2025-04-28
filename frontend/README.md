# Event Management App

This is a web application for managing and registering for events. It consists of a backend built with Express and a frontend built with React.

## Project Structure

- **backend/**: Contains the server-side code.
  - **src/**: Source files for the backend.
    - **controllers/**: Contains controllers for handling requests.
    - **routes/**: Defines the API routes.
    - **models/**: Contains data models.
    - **services/**: Business logic related to user operations.
    - **types/**: TypeScript interfaces and types.
  - **package.json**: Backend dependencies and scripts.
  - **tsconfig.json**: TypeScript configuration for the backend.
  - **README.md**: Documentation for the backend.

- **frontend/**: Contains the client-side code.
  - **src/**: Source files for the frontend.
    - **components/**: Reusable components.
    - **pages/**: Different pages of the application.
    - **App.tsx**: Main application component.
    - **index.tsx**: Entry point for the frontend application.
  - **public/**: Static files for the frontend.
    - **index.html**: Main HTML file for the React app.
  - **package.json**: Frontend dependencies and scripts.
  - **tsconfig.json**: TypeScript configuration for the frontend.
  - **README.md**: Documentation for the frontend.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

The application should now be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend (or whichever ports are configured).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.