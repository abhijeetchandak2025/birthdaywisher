# Full Stack React + Node.js Project

This is a full-stack web application consisting of:

- **Frontend**: React (TypeScript/JavaScript)  
- **Backend**: Node.js + Express  + MongoDB

## 🚀 Getting Started
### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd project-root
```

## 2. Backend Setup
**Environment Variables**

- Create a .env file inside backend/ and add the following keys:
```bash
MONGO_URI=<your-mongodb-connection-uri>
PORT=5000
GEMINI_API_KEY=<your-gemini-api-key>
ELEVENLABS_API_KEY=<your-elevenlabs-api-key>
```
- Install & Run
```bash
cd backend
npm install
npm run dev
```
- Backend will run on: http://localhost:5000 (configurable)

## 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
- Frontend will run on: http://localhost:3000 by default
