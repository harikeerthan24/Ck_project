# Student Survey Application - Vue.js Frontend

This is the Vue.js frontend for the Student Survey Application, converted from Angular. It connects to a Spring Boot backend API.

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `src/` - Source code
  - `assets/` - Static assets like images and CSS
  - `components/` - Reusable Vue components
  - `models/` - TypeScript interfaces and types
  - `router/` - Vue Router configuration
  - `services/` - API services
  - `stores/` - Pinia stores for state management
  - `views/` - View components for pages

## Backend Connection

This frontend connects to a Spring Boot backend running at `http://localhost:8080/api/surveys`. The connection is configured in:

- `vite.config.ts` - Development proxy configuration
- `src/services/api.service.ts` - API service for production

## Features

- Create, read, update, and delete student surveys
- Form validation
- Responsive design
- Data visualization for survey analytics

## Technologies Used

- Vue 3
- TypeScript
- Vue Router for navigation
- Axios for API requests
- Vite for build tools
- SCSS for styling 