# Student Survey Application - Documentation

This document provides comprehensive instructions for setting up, running, and understanding the Student Survey application. This application uses Angular for the frontend, Spring Boot for the backend, and MySQL for the database.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Technology Stack](#technology-stack)
3. [Setup Instructions](#setup-instructions)
   - [Database Setup](#database-setup)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
4. [Running the Application](#running-the-application)
5. [Application Features](#application-features)
6. [User Guide](#user-guide)
7. [Key Components](#key-components)
8. [Architecture Overview](#architecture-overview)
9. [Troubleshooting](#troubleshooting)

## System Requirements

- **Java Development Kit (JDK)** - Version 17 or higher
- **Node.js** - Version 18.x or higher
- **npm** - Version 9.x or higher
- **Docker** - For running the MySQL database container
- **VS Code** - Recommended IDE with extensions
- **Git** - For version control

## Technology Stack

- **Frontend**: Angular 17
- **Backend**: Spring Boot 3.2.x
- **Database**: MySQL 8.x (running in Docker)
- **API Communication**: RESTful HTTP endpoints

## Setup Instructions

### Database Setup

The application uses MySQL running in a Docker container. Here's how to set it up:

1. **Install Docker** if not already installed ([Docker Website](https://www.docker.com/products/docker-desktop))
2. **Pull the MySQL Docker image**:

   ```bash
   docker pull mysql:8.0
   ```
3. **Create and start the MySQL container**:

   ```bash
   docker run --name survey-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=student_survey -p 3306:3306 -d mysql:8.0
   ```
4. **Verify the container is running**:

   ```bash
   docker ps
   ```

### Backend Setup

1. **Install VS Code Extensions for Spring Boot development**:

   - Spring Boot Extension Pack
   - Spring Boot Tools
   - Spring Initializr Java Support
   - Java Extension Pack
   - Lombok Annotations Support
2. **Clone the repository** (if using version control)
3. **Open the backend project** in VS Code

   - Navigate to the backend directory in the project
4. **Configure the database connection**:

   - Open `src/main/resources/application.properties`
   - Verify the following settings match your MySQL container configuration:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/student_survey?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=root
   spring.jpa.hibernate.ddl-auto=create-drop
   ```
5. **Build the backend**:

   ```bash
   cd backend
   ./mvnw clean install 
   or 
   .\mvnw.cmd spring-boot:run                                      
   ```

   (On Windows, use `mvnw.cmd` instead of `./mvnw`)

### Frontend Setup

1. **Install Node.js dependencies**:

   ```bash
   cd frontend
   npm install
   ```
2. **Verify proxy configuration**:

   - Check `frontend/proxy.conf.json` - this file routes API requests to the backend server
   - It should contain:

   ```json
   {
     "/api": {
       "target": "http://localhost:8080",
       "secure": false,
       "changeOrigin": true,
       "logLevel": "debug",
       "pathRewrite": {
         "^/api": "/api"
       }
     }
   }
   ```

## Running the Application

### Start the Backend

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```
2. **Run the Spring Boot application**:

   ```bash
   ./mvnw spring-boot:run
   ```

   (On Windows, use `mvnw.cmd spring-boot:run`)
3. **Verify the backend is running** by opening `http://localhost:8080/api/enums/genders` in a browser - you should see JSON output

### Start the Frontend

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```
2. **Start the Angular development server with proxy configuration**:

   ```bash
   ng serve --proxy-config proxy.conf.json
   ```

   or

   ```bash
   npm start -- --proxy-config proxy.conf.json
   ```
3. **Access the application** by opening `http://localhost:4200` in a browser

## Key Components

### Backend Key Files

- **Main Application**: `src/main/java/com/student/StudentSurvey_Backend/StudentSurveyBackendApplication.java`
- **Controller Classes**:
  - `src/main/java/com/student/StudentSurvey_Backend/controller/StudentController.java` - Handles survey CRUD operations
  - `src/main/java/com/student/StudentSurvey_Backend/controller/EnumController.java` - Provides enum values for dropdowns
- **Service Classes**: `src/main/java/com/student/StudentSurvey_Backend/StudentService.java` - Contains business logic
- **Model Classes**:
  - `src/main/java/com/student/StudentSurvey_Backend/model/Student.java` - The entity model
  - `src/main/java/com/student/StudentSurvey_Backend/model/StudentDTO.java` - Data transfer object for API
- **Repository**: `src/main/java/com/student/StudentSurvey_Backend/repository/StudentRepository.java` - Data access
- **CORS Configuration**: `src/main/java/com/student/StudentSurvey_Backend/config/WebConfig.java` - Enables cross-origin requests

### Frontend Key Files

- **API Service**: `src/app/services/api.service.ts` - Handles HTTP communication with backend
- **Components**:
  - `src/app/student-survey/student-survey.component.ts` - Form for creating/editing surveys
  - `src/app/survey-list/survey-list.component.ts` - Displays surveys and handles delete/edit actions
  - `src/app/welcome/welcome.component.ts` - Landing page
- **Models**: `src/app/models/survey.ts` - Survey data interface
- **Routing**: `src/app/app.routes.ts` - Application navigation routes
- **Proxy Configuration**: `proxy.conf.json` - Routes API requests to the backend

## Architecture Overview

The application follows a standard 3-tier architecture:

1. **Presentation Layer (Frontend)**

   - Angular components handle user interface
   - Services manage HTTP communication with the backend
   - Angular Router manages navigation between components
2. **Business Logic Layer (Backend)**

   - Spring Boot REST controllers expose API endpoints
   - Service classes contain business logic
   - DTOs (Data Transfer Objects) and validation handle data conversion
3. **Data Access Layer (Backend)**

   - Spring Data JPA repositories manage database operations
   - Entity models represent database tables
   - MySQL database stores the data

### API Communication Flow

1. User interacts with Angular components
2. Angular services make HTTP requests to backend API endpoints
3. Spring controllers process requests and call service methods
4. Services use repositories to interact with the database
5. Data is returned to the frontend through HTTP responses

## Troubleshooting

### Database Connection Issues

- Verify Docker container is running: `docker ps`
- Check database credentials in `application.properties`
- Restart the MySQL container: `docker restart survey-mysql`

### Backend Issues

- Check Spring Boot logs for errors
- Verify application.properties configuration
- Make sure the backend is running on port 8080
- Try rebuilding: `./mvnw clean install`

### Frontend Issues

- Check browser console for errors
- Verify the Angular proxy configuration is correct
- Try clearing npm cache: `npm cache clean --force`
- Reinstall dependencies: `npm install`

### CORS Issues

- Verify CORS configuration in `WebConfig.java`
- Check that the frontend is running on the allowed origin (http://localhost:4200)

## Application Features

The Student Survey Application provides a full-featured system for collecting and managing student survey responses:

### For End Users

1. **Home Page** (`/welcome`):

   - Welcome screen with introduction to the survey
   - Links to fill out a survey or view existing responses
2. **Survey Form** (`/student-survey`):

   - Comprehensive form with validation
   - Personal information (name, contact details, address)
   - Campus preferences with multi-select options
   - Interest source selection with conditional fields
   - Feedback section with recommendation likelihood
3. **Survey List** (`/survey-list`):

   - Table view of all submitted surveys
   - Edit existing survey responses
   - Delete unwanted survey entries
   - Sortable and navigable table

### For Administrators

1. **CRUD Operations**:

   - Create: Submit new survey responses
   - Read: View all submitted surveys
   - Update: Modify existing survey data
   - Delete: Remove survey entries
2. **Data Persistence**:

   - All data is stored in a MySQL database
   - Can survive application restarts
   - Automatic schema creation and updates
3. **Error Handling**:

   - Form validation to prevent invalid data
   - Backend validation for data integrity
   - Graceful error messages for users

## User Guide

### Submitting a New Survey

1. Navigate to the home page
2. Click "Fill a Survey" button
3. Complete all required fields in the form
4. Click "Submit Survey"
5. You'll see a confirmation message upon successful submission

### Viewing Survey Responses

1. Navigate to the home page
2. Click "View Surveys" button or navigate to `/survey-list`
3. All submitted surveys will be displayed in a table

### Editing a Survey

1. Go to the survey list
2. Find the survey you want to edit
3. Click the "Edit" button
4. Update the form fields as needed
5. Click "Update Survey"

### Deleting a Survey

1. Go to the survey list
2. Find the survey you want to delete
3. Click the "Delete" button
4. Confirm the deletion in the popup dialog

---

This application implements a complete student survey system with a modern tech stack. It demonstrates CRUD operations, form validation, responsive design, and proper separation of concerns between frontend and backend.
