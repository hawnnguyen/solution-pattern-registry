# Solution Pattern Registry System

A comprehensive system for managing and showcasing enterprise solution patterns through a modern web interface. This project consists of two main components:

## Components

### 1. [Pattern Solution Library Marketplace Registry Client](./patterns-solution-client/README.md)

A modern React-based web application wrapped in Spring Boot that provides:
- Interactive pattern browsing and visualization
- User-friendly interface for pattern management
- Seamless integration with the backend GraphQL API
- Responsive design for optimal viewing across devices

**Tech Stack:**
- React
- Apollo Client for GraphQL
- Spring Boot wrapper
- Modern UI/UX components

### 2. [Spring Boot Patterns Solution Service](./patterns-solution-service/README.md)

A robust backend service that provides:
- GraphQL API for pattern management
- RESTful API with Swagger/OpenAPI documentation
- Data persistence with H2 Database
- Comprehensive pattern and tag management
- Filtering and search capabilities

**Tech Stack:**
- Java 21
- Spring Boot 3.2.2
- GraphQL
- SpringDoc OpenAPI (Swagger)
- JPA/H2 Database

## System Architecture

The system follows a modern client-server architecture:
- Frontend: React-based SPA served through Spring Boot
- Backend: 
  - GraphQL API for complex queries and mutations
  - RESTful API with Swagger documentation for standard CRUD operations
- Clean separation of concerns between UI and business logic
- Scalable and maintainable codebase

## Getting Started

1. First, set up the backend service by following the instructions in the [service README](./patterns-solution-service/README.md)
2. Then, set up the client application by following the instructions in the [client README](./patterns-solution-client/README.md)

### Available Endpoints
- GraphiQL Interface: http://localhost:8080/graphiql
- Swagger UI Documentation: http://localhost:8080/swagger-ui/index.html
- H2 Database Console: http://localhost:8080/h2-console

## Development

For development purposes, you can run both components separately:
- Backend service on port 8080
- Frontend client on port 3000

Refer to individual component READMEs for detailed development instructions.
