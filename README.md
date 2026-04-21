# HireMind

HireMind is an AI-powered mock interview platform that helps candidates practice role-based interviews, answer questions in a realistic timed setting, and review detailed performance reports after each session.

Users can sign in with Google, upload a resume for AI-assisted context extraction, generate interview questions based on role and experience, complete voice-enabled interview rounds, and track progress through history, analytics, and downloadable PDF reports.

## Links

- Live Deployment: Add your deployed app URL here
- GitHub Repository: [https://github.com/ShreyaD28/HireMind](https://github.com/ShreyaD28/HireMind)

## Why HireMind

Interview practice tools often feel static and repetitive. HireMind is built to make preparation feel more realistic by combining:

- AI-generated interview questions
- resume-aware interview setup
- timed question rounds
- voice interaction
- detailed per-question feedback
- reusable interview history and reports

## What It Does

- Authenticates users with Google sign-in
- Stores users and interview history in MongoDB
- Parses uploaded PDF resumes and extracts role, experience, skills, and projects
- Generates 5 interview questions with increasing difficulty
- Supports Technical and HR interview modes
- Runs timed interview sessions with speech synthesis and speech recognition in the browser
- Scores answers across confidence, communication, and correctness
- Produces a final interview report with charts and question-by-question breakdowns
- Lets users download a PDF version of their interview report
- Uses a credit system for interview generation
- Supports paid credit top-ups with Razorpay

## Core User Flow

1. Sign in with Google
2. Start a new interview
3. Enter role and experience
4. Optionally upload a PDF resume for AI analysis
5. Choose interview mode: `Technical` or `HR`
6. Generate interview questions
7. Answer questions in the timed interview interface
8. Receive per-question AI feedback and final scoring
9. Review past interviews from history
10. Download the final report as a PDF

## Main Screens

- `Home`: landing page and product overview
- `Auth`: Google sign-in flow
- `Interview`: 3-step interview experience
- `History`: previous interview sessions
- `Report`: detailed analytics for a completed interview
- `Pricing`: credit plans and payment flow

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Motion
- Recharts
- jsPDF + jspdf-autotable
- Firebase Auth

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Multer
- PDF.js

### AI and Integrations

- OpenRouter API with `openai/gpt-4o-mini`
- Firebase Google authentication
- Razorpay payments
- Browser Speech Recognition and Speech Synthesis APIs

## How The App Works

### 1. Authentication

The frontend uses Firebase Google sign-in. After login, the app sends the user name and email to the backend, which creates the user if needed and stores a JWT in an HTTP cookie.

### 2. Resume Analysis

Users can upload a PDF resume. The backend extracts text using `pdfjs-dist`, then sends the content to the AI service to return structured JSON:

- role
- experience
- projects
- skills

This data pre-fills the interview setup form.

### 3. Interview Generation

When the user starts an interview, the backend:

- validates the setup
- checks available credits
- sends a prompt to the AI service
- generates exactly 5 questions
- assigns difficulty and time limits
- stores the interview in MongoDB
- deducts 50 credits

### 4. Interview Session

The interview UI:

- reads questions aloud using text-to-speech
- captures spoken answers with browser speech recognition
- tracks time per question
- allows typed answers as well
- submits each answer for AI evaluation

### 5. Scoring and Reporting

Each answer is scored on:

- confidence
- communication
- correctness

At the end of the interview, the backend computes final averages and the frontend renders:

- overall score
- skill bars
- score trend chart
- question-by-question feedback
- PDF export

### 6. Payments and Credits

Users begin with free credits. Additional credits can be purchased through Razorpay, and successful payments update the user balance in MongoDB.

## Project Structure

```text
HireMind/
├── client/   # React frontend
└── server/   # Express backend
```

## Key Frontend Areas

- `client/src/pages/Home.jsx` - landing page
- `client/src/pages/Auth.jsx` - Google authentication UI
- `client/src/pages/InterviewPage.jsx` - interview step container
- `client/src/components/Step1SetUp.jsx` - role, resume, and mode setup
- `client/src/components/Step2Interview.jsx` - live interview flow
- `client/src/components/Step3Report.jsx` - final report and PDF export
- `client/src/pages/InterviewHistory.jsx` - interview history list
- `client/src/pages/Pricing.jsx` - credits and payments

## Key Backend Areas

- `server/index.js` - Express app entrypoint
- `server/controllers/auth.controller.js` - Google auth session handling
- `server/controllers/interview.controller.js` - resume analysis, question generation, scoring, reports
- `server/controllers/payment.controller.js` - Razorpay order creation and verification
- `server/services/openRouter.service.js` - AI request wrapper
- `server/models/user.model.js` - users and credits
- `server/models/interview.model.js` - interview sessions and question scores
- `server/models/payment.model.js` - payment records

## Environment Variables

### Frontend

Create `client/.env` and add:

```env
VITE_FIREBASE_APIKEY=your_firebase_web_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend

Create `server/.env` and add:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Local Development

### Prerequisites

- Node.js 20+
- MongoDB database
- Firebase project with Google sign-in enabled
- OpenRouter API key
- Razorpay account and API keys

### Install

```bash
cd client
npm install
```

```bash
cd server
npm install
```

### Run The App

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

### Default Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## API Overview

### Auth

- `POST /api/auth/google`
- `GET /api/auth/logout`

### User

- `GET /api/user/current-user`

### Interview

- `POST /api/interview/resume`
- `POST /api/interview/generate-questions`
- `POST /api/interview/submit-answer`
- `POST /api/interview/finish`
- `GET /api/interview/get-interview`
- `GET /api/interview/report/:id`

### Payment

- `POST /api/payment/order`
- `POST /api/payment/verify`

## Current Behavior Notes

- New users start with `100` credits
- Generating one interview currently costs `50` credits
- Each generated interview includes exactly `5` questions
- Supported interview modes are `Technical` and `HR`
- Resume upload currently expects a PDF file
- The app uses cookie-based auth between frontend and backend
- The backend currently allows CORS from `http://localhost:5173`

## Future Improvement Ideas

- Add admin-configurable interview templates
- Improve production auth cookie settings
- Add better validation and error handling across forms
- Add automated tests for controllers and UI flows
- Support more interview types and question counts
- Add stronger analytics and progress insights over time
- Add deployment-ready environment examples

## Notes

- This repository currently does not include a root `package.json`; frontend and backend are run separately from `client` and `server`.
- Firebase project identifiers are partially hardcoded in the frontend config, while the API key is read from environment variables.
- AI generation is implemented through OpenRouter in the current codebase.

## License

This project is for portfolio and educational use unless you define a separate license for redistribution or commercial use.
