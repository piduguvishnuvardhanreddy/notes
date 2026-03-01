# Full-Stack Note-Taking Application

A complete, responsive Note-Taking Application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## Features
- **User Authentication**: Secure JWT-based Login and Registration. Each user manages their own private notes.
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Rich Text Editing**: Enhanced note creation supporting Bold, Italic, Underline, and Bullet points (built with React-Quill).
- **Search Functionality**: Quickly find notes by searching titles or content.
- **Modern UI**: Clean, responsive design crafted with Tailwind CSS and Lucide React icons.

## Tech Stack
- **Frontend**: React (Vite), React Router, Axios, Tailwind CSS, React Quill
- **Backend**: Node.js, Express, Mongoose, JSONWebToken, Bcrypt.js
- **Database**: MongoDB (Atlas)

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Database (Local or MongoDB Atlas)

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (already created locally) and define:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Usage
- Open your browser to the URL provided by Vite (usually `http://localhost:5173`).
- Create an account, log in, and start managing your notes!

## Live URL
*(Pending Deployment on Vercel/Netlify)*
