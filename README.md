# Tailor Website

Full-stack web application with React frontend and Spring Boot backend.

## Project Structure

```text
tailor/
|-- backend/   # Spring Boot application
`-- frontend/  # React application
```

## Backend (Spring Boot)

### Prerequisites
- Java 17 or higher
- Maven

### Dependencies
- Spring Boot Web
- Spring Data JPA
- H2 Database
- Lombok
- Validation

### Run Backend
```bash
cd backend
mvn spring-boot:run
```

Backend runs on: http://localhost:8080

## Frontend (React)

### Prerequisites
- Node.js 14+ and npm

### Dependencies
- React 18
- React Router DOM
- Axios

### Run Frontend
```bash
cd frontend
npm start
```

Frontend runs on: http://localhost:3000

## Development

1. Start the backend server first
2. Start the frontend development server
3. Frontend will proxy API requests to backend

## Build for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/tailor-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
```
