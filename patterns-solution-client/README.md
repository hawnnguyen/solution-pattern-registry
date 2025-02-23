# Pattern Solution Library Marketplace Registry Client

This is a Spring Boot wrapped React application for the Pattern Solution Library Marketplace Registry.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Node.js 18.x (will be installed by Maven)
- NPM 9.x (will be installed by Maven)

## Building the Application

The application uses Maven to build both the Spring Boot backend and the React frontend. To build the entire application:

```bash
mvn clean install
```

This will:
1. Install Node.js and NPM (using frontend-maven-plugin)
2. Install NPM dependencies
3. Build the React application
4. Package everything into a Spring Boot JAR

## Running the Application

After building, you can run the application using:

```bash
mvn spring-boot:run
```

Or run the JAR directly:

```bash
java -jar target/patterns-solution-client-0.0.1-SNAPSHOT.jar
```

The application will be available at:
- http://localhost:3000

## Development Mode

For development, you can:

1. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

2. In a separate terminal, run the React development server:
```bash
npm start
```

This will give you hot-reloading for the React frontend while still proxying API requests to the backend service.

## Project Structure

- `/src/main/java` - Spring Boot application code
- `/src/main/resources` - Spring Boot configuration
- `/src` - React application code
- `/public` - Static web resources
- `/build` - Built React application (generated)

## Configuration

- `application.properties` - Spring Boot configuration
- `package.json` - React/NPM configuration
- `pom.xml` - Maven configuration
