# Pattern Solution Registry Client

A modern React-based web application for managing and showcasing enterprise solution patterns.

## Prerequisites

- Node.js v23.7.0 or higher
- npm (comes with Node.js)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```
The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`

Runs the app in the development mode with the OpenSSL legacy provider.\
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

## Features

- Interactive pattern browsing and visualization
- User-friendly form for pattern creation and management
- Comprehensive tag management system
- Responsive Material-UI design
- Type-safe development with TypeScript

## Tech Stack

- React 18.2.0
- TypeScript
- Material-UI (MUI)
- Node.js v23.7.0

## Development Notes

- The application uses TypeScript for type safety
- Material-UI components for consistent design
- Comprehensive form validation
- CORS enabled for backend communication

## API Integration

The client communicates with the backend service running on `http://localhost:8080/api/v1` with the following endpoints:
- `GET /patterns`: Retrieve all patterns
- `POST /patterns`: Create a new pattern
- `GET /patterns/{id}`: Get a specific pattern
- `PUT /patterns/{id}`: Update a pattern
- `DELETE /patterns/{id}`: Delete a pattern

## Troubleshooting

If you encounter OpenSSL-related issues:
1. Make sure you're using the `--openssl-legacy-provider` flag during installation
2. Use Node.js v23.7.0 or higher
3. Clear npm cache if needed: `npm cache clean --force`
