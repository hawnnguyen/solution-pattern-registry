# Solution Pattern Registry System

A comprehensive system for managing and showcasing enterprise solution patterns through a modern web interface. This project consists of two main components:

## Components

### 1. Frontend Client (patterns-solution-client)

A modern React-based web application that provides:
- Interactive pattern browsing and visualization
- User-friendly form for pattern creation and management
- Comprehensive tag management system
- Responsive Material-UI design
- Type-safe development with TypeScript

**Tech Stack:**
- React 18.2.0
- TypeScript
- Material-UI (MUI)
- Node.js v23.7.0

### 2. Backend Service (patterns-solution-service)

A robust Spring Boot service that provides:
- RESTful API for pattern management
- Automatic UUID generation for patterns
- JPA/Hibernate for data persistence
- CORS configuration for secure cross-origin requests
- Comprehensive entity model with relationships

**Tech Stack:**
- Java
- Spring Boot
- JPA/Hibernate
- H2 Database

## Features

### Pattern Management
- Create, read, update, and delete patterns
- Automatic UUID generation for new patterns
- Rich pattern metadata including:
  * Title
  * URL
  * Ring (adopt, trial, assess, hold)
  * Quadrant (tools, techniques, platforms, languages-frameworks)
  * Status (active, deprecated, archived)
  * Phase (planning, development, production)
  * Associated patterns
  * Use cases
  * Tags

### Tag System
- Flexible tag management
- Tag associations with patterns
- Tag filtering and organization

## Getting Started

### Backend Setup
1. Navigate to the service directory:
   ```bash
   cd patterns-solution-service
   ```
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The service will start on http://localhost:8080

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd patterns-solution-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The client will be available at http://localhost:3000

## API Endpoints

The backend service exposes RESTful endpoints at `http://localhost:8080/api/v1`:
- `GET /patterns`: Retrieve all patterns
- `POST /patterns`: Create a new pattern
- `GET /patterns/{id}`: Get a specific pattern
- `PUT /patterns/{id}`: Update a pattern
- `DELETE /patterns/{id}`: Delete a pattern

## Development

For development, you can run both components separately:
- Backend service on port 8080
- Frontend client on port 3000

### Development Notes
- CORS is configured to allow cross-origin requests between frontend and backend
- Frontend uses strict TypeScript checking
- Backend implements automatic UUID generation for new patterns
- Comprehensive form validation on both frontend and backend

## Security Considerations
- CORS configuration for secure cross-origin requests
- Type validation on both frontend and backend
- Secure API endpoint design
- Input sanitization and validation

## Contributing
Please read our contributing guidelines before submitting pull requests.
