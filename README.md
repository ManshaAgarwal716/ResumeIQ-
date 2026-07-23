# ResumeIQ

ResumeIQ is an AI-powered resume analysis platform that helps job seekers improve their resumes by providing personalized feedback based on a target job description. Users can upload their resume, submit a job description, and receive AI-generated insights to strengthen their application.

---

## Overview

The application combines a modern React frontend with a Node.js backend and integrates Google's Gemini API to analyze resumes. Uploaded files are processed securely, and the generated feedback focuses on improving relevance, clarity, and ATS compatibility.

---

## Features

- Upload resumes in PDF format
- Analyze resumes against a job description
- AI-generated resume feedback
- Resume scoring and improvement suggestions
- Secure file upload handling
- REST API architecture
- Responsive user interface

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- dotenv

### AI

- Google Gemini API

---

## Project Structure

```
ResumeIQ
├── backend
│   ├── src
│   ├── uploads
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend
    └── resumeiq-frontend
        ├── src
        ├── public
        ├── package.json
        ├── vite.config.js
        └── tailwind.config.js
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/ManshaAgarwal716/ResumeIQ.git
cd ResumeIQ
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
npm install
```

Create a `.env` file.

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm run dev
```

---

## Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend/resumeiq-frontend
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:8000
```

Start the development server.

```bash
npm run dev
```

---

## API Workflow

1. User uploads a resume.
2. Resume is securely stored on the server.
3. User provides a target job description.
4. The backend extracts resume content.
5. Gemini API analyzes the resume against the job description.
6. AI-generated feedback is returned to the frontend.

---

