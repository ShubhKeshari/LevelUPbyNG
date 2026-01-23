# LevelUP by NG - Setup Guide

This guide will help you set up both the frontend and backend for the LevelUP by NG Campus Placement Portal.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory with the following content:
```
MONGODB_URI=mongodb+srv://Shubham:Shubham%40123@navgurukullearning.lxmqtve.mongodb.net/levelUPbyNG?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
```

4. Seed the database with initial data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. Navigate to the project root (if not already there):
```bash
cd ..
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Create a `.env` file in the root directory with:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns)

## Default Login Credentials

After seeding the database, you can use these credentials:

- **Admin**: 
  - Email: `admin@example.com`
  - Password: `admin123`

- **Student**: 
  - Email: `student@example.com`
  - Password: `password123`

## Project Structure

```
LevelUPbyNG/
├── backend/          # Node.js/Express backend
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Auth middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── scripts/      # Database seed script
│   └── server.js     # Express server
├── src/              # React frontend
│   ├── components/   # React components
│   ├── context/      # React contexts
│   ├── pages/        # Page components
│   ├── utils/        # Utility functions
│   └── data/         # Dummy data (for reference)
└── package.json      # Frontend dependencies
```

## Features

- ✅ User authentication with JWT
- ✅ Role-based access (Admin/Student)
- ✅ Job posting and management
- ✅ Application submission
- ✅ Password hashing
- ✅ MongoDB integration
- ✅ RESTful API

## Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Ensure port 5000 is not in use
- Verify all dependencies are installed

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env file
- Verify CORS is enabled in backend

### Database connection issues
- Verify MongoDB URI is correct
- Check network connectivity
- Ensure MongoDB cluster allows connections from your IP

## Notes

- Passwords are stored in hashed format using bcrypt
- JWT tokens are used for authentication
- All API endpoints require authentication except login
- Admin can create, update, and delete jobs
- Students can view available jobs and apply
