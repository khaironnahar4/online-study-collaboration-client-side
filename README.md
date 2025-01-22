# E-Learn

This project focuses on creating a platform to connect students, tutors, and administrators, enabling streamlined study session scheduling, resource sharing, and user management. The goal is to enhance collaboration, improve access to study materials, and provide an effective management system for educational activities.

## Live Demo: https://online-tech-8af27.web.app/

## Features

### General
- **Authentication & Authorization**: 
  - Email/password registration and login.
  - Social login using Google and GitHub (default role: Student).
  - JWT-based session management for secure access.
- **Role-Based Access Control**:
  - Role-specific functionalities for Students, Tutors, and Admins.

### Home Page
- **Navbar**: Dynamic buttons for login, signup, logout, and dashboard based on user status.
- **Banner**: Professional and responsive design.
- **Study Sessions**: Display 6 approved sessions with details and "Read More" options.
- **Tutor Section**: List of all registered tutors.
- **Footer**: Contact information and navigation links.

### Student Dashboard
- **Booked Sessions**: View booked session details and post reviews/ratings.
- **Notes**: Create, view, update, and delete personal notes.
- **Study Materials**: Access materials for booked sessions, download resources, and visit provided links.

### Tutor Dashboard
- **Create Study Sessions**: Form to create sessions with default pending status.
- **Manage Sessions**: View approved, pending, and rejected sessions. Resend approval requests for rejected sessions.
- **Upload Materials**: Add images and resource links (Google Drive) for approved sessions.
- **Manage Materials**: Update and delete uploaded materials.

### Admin Dashboard
- **User Management**: View and update user roles. Search by name or email.
- **Study Session Management**: Approve, reject, update, or delete study sessions.
- **Material Management**: View and remove inappropriate materials.

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- TanStack Query
- Sweetalert2
- React Icons
- React hook form
- Axios

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication
- Firebase (Social Login)
- JWT for secure authentication

### Deployment
- **Frontend**: Firebase
- **Backend**: Vercel

