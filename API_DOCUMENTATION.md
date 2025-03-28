# Student Survey API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
Currently, the API does not require authentication.

## Endpoints

### 1. Create Student Survey
Creates a new student survey entry.

```
POST /students
```

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "streetAddress": "123 Main St",
    "city": "Fairfax",
    "state": "VA",
    "zip": "22030",
    "telephone": "703-123-4567",
    "email": "john.doe@example.com",
    "surveyDate": "2024-03-28",
    "interestSourceId": 1,
    "recommendationLikelihoodId": 1,
    "likedCampusFeatureIds": [1, 2],
    "additionalComments": "Great campus!"
}
```

**Response (201 Created):**
```json
{
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "surveyDate": "2024-03-28",
    "interestSource": {
        "id": 1,
        "name": "Website"
    },
    "recommendationLikelihood": {
        "id": 1,
        "name": "Very Likely"
    },
    "likedCampusFeatures": [
        {
            "id": 1,
            "name": "Location"
        },
        {
            "id": 2,
            "name": "Academic Programs"
        }
    ],
    "additionalComments": "Great campus!"
}
```

### 2. Get All Student Surveys
Retrieves a paginated list of all student surveys.

```
GET /students
```

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `sort` (optional): Sort field and direction (e.g., "createdAt,desc")

**Response (200 OK):**
```json
{
    "content": [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "surveyDate": "2024-03-28",
            "interestSource": {
                "id": 1,
                "name": "Website"
            },
            "recommendationLikelihood": {
                "id": 1,
                "name": "Very Likely"
            },
            "likedCampusFeatures": [
                {
                    "id": 1,
                    "name": "Location"
                }
            ],
            "additionalComments": "Great campus!"
        }
    ],
    "pageable": {
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "pageNumber": 0,
        "pageSize": 20,
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "totalElements": 1,
    "totalPages": 1,
    "last": true,
    "first": true,
    "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
    },
    "numberOfElements": 1,
    "size": 20,
    "number": 0,
    "empty": false
}
```

### 3. Get Student Survey by ID
Retrieves a specific student survey by its ID.

```
GET /students/{id}
```

**Response (200 OK):**
```json
{
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "surveyDate": "2024-03-28",
    "interestSource": {
        "id": 1,
        "name": "Website"
    },
    "recommendationLikelihood": {
        "id": 1,
        "name": "Very Likely"
    },
    "likedCampusFeatures": [
        {
            "id": 1,
            "name": "Location"
        }
    ],
    "additionalComments": "Great campus!"
}
```

### 4. Update Student Survey
Updates an existing student survey.

```
PUT /students/{id}
```

**Request Body:**
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "streetAddress": "123 Main St",
    "city": "Fairfax",
    "state": "VA",
    "zip": "22030",
    "telephone": "703-123-4567",
    "email": "john.doe@example.com",
    "surveyDate": "2024-03-28",
    "interestSourceId": 1,
    "recommendationLikelihoodId": 1,
    "likedCampusFeatureIds": [1, 2],
    "additionalComments": "Updated comment"
}
```

**Response (200 OK):**
```json
{
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "surveyDate": "2024-03-28",
    "interestSource": {
        "id": 1,
        "name": "Website"
    },
    "recommendationLikelihood": {
        "id": 1,
        "name": "Very Likely"
    },
    "likedCampusFeatures": [
        {
            "id": 1,
            "name": "Location"
        },
        {
            "id": 2,
            "name": "Academic Programs"
        }
    ],
    "additionalComments": "Updated comment"
}
```

### 5. Delete Student Survey
Deletes a student survey by its ID.

```
DELETE /students/{id}
```

**Response (204 No Content)**

### 6. Search Students
Searches for students based on first name, last name, or email.

```
GET /students/search
```

**Query Parameters:**
- `firstName` (optional): First name to search for
- `lastName` (optional): Last name to search for
- `email` (optional): Email to search for
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)

**Response (200 OK):**
```json
{
    "content": [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "surveyDate": "2024-03-28",
            "interestSource": {
                "id": 1,
                "name": "Website"
            },
            "recommendationLikelihood": {
                "id": 1,
                "name": "Very Likely"
            },
            "likedCampusFeatures": [
                {
                    "id": 1,
                    "name": "Location"
                }
            ],
            "additionalComments": "Great campus!"
        }
    ],
    "pageable": {
        "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
        },
        "pageNumber": 0,
        "pageSize": 20,
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "totalElements": 1,
    "totalPages": 1,
    "last": true,
    "first": true,
    "sort": {
        "sorted": true,
        "unsorted": false,
        "empty": false
    },
    "numberOfElements": 1,
    "size": 20,
    "number": 0,
    "empty": false
}
```

### 7. Get Students by Interest Source
Retrieves students filtered by interest source.

```
GET /students/by-interest/{interestSourceId}
```

**Response (200 OK):**
Same paginated response format as Get All Student Surveys.

### 8. Get Students by Recommendation Likelihood
Retrieves students filtered by recommendation likelihood.

```
GET /students/by-recommendation/{likelihoodId}
```

**Response (200 OK):**
Same paginated response format as Get All Student Surveys.

### 9. Get Recommendation Distribution
Retrieves statistics about recommendation likelihood distribution.

```
GET /students/stats/recommendation-distribution
```

**Response (200 OK):**
```json
[
    {
        "recommendation": "Very Likely",
        "count": 5
    },
    {
        "recommendation": "Likely",
        "count": 3
    },
    {
        "recommendation": "Neutral",
        "count": 2
    },
    {
        "recommendation": "Unlikely",
        "count": 1
    },
    {
        "recommendation": "Very Unlikely",
        "count": 0
    }
]
```

### 10. Get Interest Source Distribution
Retrieves statistics about interest source distribution.

```
GET /students/stats/interest-source-distribution
```

**Response (200 OK):**
```json
[
    {
        "source": "Website",
        "count": 5
    },
    {
        "source": "Social Media",
        "count": 3
    },
    {
        "source": "Friend/Family",
        "count": 2
    },
    {
        "source": "Email",
        "count": 1
    },
    {
        "source": "Other",
        "count": 0
    }
]
```

## Error Responses

### 404 Not Found
```json
{
    "timestamp": "2024-03-28T16:56:05.091+00:00",
    "status": 404,
    "error": "Not Found",
    "path": "/api/students/{id}"
}
```

### 400 Bad Request
```json
{
    "timestamp": "2024-03-28T16:56:05.091+00:00",
    "status": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "errors": [
        {
            "field": "email",
            "message": "Invalid email format"
        }
    ]
}
```

### 500 Internal Server Error
```json
{
    "timestamp": "2024-03-28T16:56:05.091+00:00",
    "status": 500,
    "error": "Internal Server Error",
    "message": "An unexpected error occurred"
}
```

## Data Validation Rules

1. First Name:
   - Required
   - Maximum length: 100 characters

2. Last Name:
   - Required
   - Maximum length: 100 characters

3. Street Address:
   - Required
   - Maximum length: 255 characters

4. City:
   - Required
   - Maximum length: 100 characters

5. State:
   - Required
   - Must be 2 characters

6. ZIP Code:
   - Required
   - Must match pattern: 5 digits or 5+4 digits (e.g., "12345" or "12345-6789")

7. Telephone:
   - Required
   - Must match pattern: digits, spaces, hyphens, and optional '+' prefix

8. Email:
   - Required
   - Must be a valid email format
   - Must be unique

9. Survey Date:
   - Required
   - Must be in the past or present

10. Interest Source:
    - Required
    - Must reference a valid interest source ID

11. Recommendation Likelihood:
    - Required
    - Must reference a valid recommendation likelihood ID

12. Campus Features:
    - Optional
    - Must reference valid campus feature IDs

13. Additional Comments:
    - Optional
    - Maximum length: 1000 characters 