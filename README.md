# Expense Tracker

A full-stack personal management application built with Next.js, TypeScript, Express, PostgreSQL, and Prisma.
Expense Tracker allows users to securely manage their expenses, analyze sepending, and generate yearly reports through a responsive dashboard.

## Live Demo

**Live Application:** https://expense-tracker-me-2740.vercel.app

## Application Preview

b

## Features

### Authentication

- User registration and login

- JWT-based authentication using secure htttpOnly cookies
- Persistent login sessions across page refreshes
- Protected dashboard routes
- Email availability validation during registration
- Secure logout and session handling

### Expense Management

- Create, view, edit, and delete personal expenses

- Search expenses by title or note
- Filter expenses by category and date
- Sort expense records

- Paginated expense table
- Form validation with React Hook Form and Zod
- User specific expense data protected by backend authorization

### Dahboard & Analytics

- Total spending, average expense, and transaction statistics

- Month-over-month spending comparison
- Spending trend visualization
- Category-based spending breakdown
- Recent transaction overview

### Reports

- Year-based expense reports

- Monthly spending analysis
- Category spending summaries
- Top spending category calculation
- CSV export

### User Preferences

- Currency preference

- Date format preference
- Preferences persisted between session

## Tech Stack

### Frontend

- Next.js 16

- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Recharts

### Backend

- Node.js

- Express 5
- TypeScript
- Prisma ORM
- JWT (JSON Web Token)
- bcrypt
- Zod

### Database

- PostgreSQL
- Neon

### Deployment

- Vercel -- Frontend
- Render -- Backend API
- Neon -- PostgreSQL database

## Architecture

The application uses a separated frontend and backend architecture.

POST PICTURE HERE

The frontend communicates with the Express backend through REST API requests.
The backend handles authentication, authorization, business logic, and database access.
Expense data is scoped to the authenticated user, preventing user from accessing or modifying expenses that belong to another account.

## Authentication Flow

Authentication is handled by the Express backend using JWT stored in secure httpOnly cookies.

POST PICTURE HERE

The authentication system include:

- Password hashing and verification with bcrypt

- JWT-based authentication
- Secure HttpOnly cookies for storing authentication tokens
- Protected API routes using authentication middleware
- Session restoration through the `/api/auth/me` endpoint
- User-specific authorization for expense operation
- secure logout by clearing the authentication cookie
