# EventUp

EventUp is a full-stack event booking application with a React frontend and an Express/MongoDB backend.

## Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## 1. Clone and open the project

```bash
git clone <your-repo-url>
cd EventUp
```

## 2. Install backend dependencies

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/eventup
```

If you are using MongoDB Atlas, replace the value with your connection string.

## 3. Start the backend server

From the `server` folder:

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:5000
```

## 4. Install frontend dependencies

Open a new terminal and run:

```bash
cd client
npm install
```

## 5. Start the frontend

```bash
npm run dev
```

The frontend should open at:

```text
http://localhost:5173
```

## Optional: Build the frontend for production

```bash
cd client
npm run build
```

## Project structure

- `client/` - React + Vite frontend
- `server/` - Express backend and API routes

## Notes

- The frontend expects the backend API at `http://localhost:5000/api`.
- Make sure MongoDB is running before starting the server.
