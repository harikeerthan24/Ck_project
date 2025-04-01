# My Development Journey: Building a Student Survey Application

## How It All Started

When I first got this project, I knew it was going to be a challenge. The goal was to build a **Student Survey Application**, something that would let students submit feedback about their university experience while giving administrators a way to manage the responses. To make it happen, I decided to go with **Angular** for the frontend and **Spring Boot** for the backend—definitely a full-stack adventure.

## Choosing the Tech Stack

After some research and a bit of trial and error, I settled on:

* **Frontend:** Angular 17
* **Backend:** Spring Boot 3
* **Database:** MySQL 8.0 (running in a Docker container)
* **Tools:** VS Code, Docker Desktop

I hadn’t worked much with Docker before, so that part was going to be interesting.

## Setting Up (Day 1)

First things first, I set up the project structure:

```
student_survey_website/
├── frontend/    # Angular application
├── backend/     # Spring Boot application
```

Getting Angular up and running was straightforward:

```
ng new frontend
```

I set up routing, added dependencies, and configured a proxy for API communication. For the backend, I used **Spring Initializr** to generate the Spring Boot project and pulled in dependencies like Spring Web, Spring Data JPA, MySQL Driver, and Lombok. After tweaking the **application.properties** file for database connectivity, I was good to go.

## Backend Development (Days 2-3)

This part was a mix of fun and frustration. The backend needed a solid structure, so I created:

* **Student.java** (main entity class)
* **StudentDTO.java** and **StudentResponseDTO.java** (to manage data transfer)
* **OperationStatusResponse.java** (for standardized API responses)

I also built out:

* **StudentRepository** (custom query methods for analytics)
* **Service layer** (for CRUD operations and business logic)
* **Controllers** to expose RESTful APIs

I hit a roadblock when dealing with **date formats** between the frontend and backend, but I managed to fix it by implementing date formatting utilities in the API service.

## Frontend Development (Days 4-5)

Once the backend was functional, it was time to make the frontend interactive. I created components like:

* **WelcomeComponent** (Landing page)
* **StudentSurveyComponent** (Survey form)
* **SurveyListComponent** (For managing responses)

To handle data, I set up:

* **ApiService** (for API communication)
* **SurveyService** (for local data handling before integrating API calls)

I also styled everything with SCSS, making sure the design was **responsive and user-friendly**. Debugging form validation was a pain, but eventually, I got everything working smoothly.

## Putting It All Together (Day 6)

This was the moment of truth: testing the full integration. I set up MySQL using Docker:

```
docker run --name survey-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=student_survey -p 3306:3306 -d mysql:8.0
```

Then I configured the proxy:

```
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": true
  }
}
```

After testing form submissions and verifying that data was actually being saved, I breathed a sigh of relief—it was all working!

## Final Touches & Fixes (Day 7)

The last day was all about polishing and refining the project:

* **Form validation** (client-side + server-side)
* **Bug fixes** for CORS issues and API responses
* **Improved user experience** with loading indicators and better error handling

I also added features like:

* Survey editing & deletion
* Analytics display
* Pagination for large datasets
