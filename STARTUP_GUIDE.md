# HireForge - Project Start Guide

This guide will help you get the HireForge project up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
1.  **Node.js**: (Version 18+ recommended). You can download it from [nodejs.org](https://nodejs.org/).
2.  **Git**: For version control.
3.  **MongoDB**: Either a local instance or a MongoDB Atlas cluster URI.

## Project Structure

The project is split into two main directories:
*   `backend/`: Contains the Express.js server, API routes, database models, and service logic.
*   `frontend/`: Contains the React application created with Vite.

## Step-by-Step Startup

You will need to open **two separate terminal windows** to run the frontend and backend simultaneously.

### 1. Starting the Backend

1.  Open your first terminal.
2.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
3.  (First time only) Install the dependencies:
    ```bash
    npm install
    ```
4.  Ensure your `.env` file is properly configured in the `backend/` folder (requires `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, etc.).
5.  Start the development server:
    ```bash
    npm run dev
    ```
    *You should see a message indicating the server is running on port 5000 and that MongoDB connected successfully.*

### 2. Starting the Frontend

1.  Open your second terminal.
2.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
3.  (First time only) Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development build:
    ```bash
    npm run dev
    ```
    *You should see a message indicating the Vite server is running, usually on `http://localhost:5173/`.*

## Accessing the Application

Once both servers are running without errors, open your web browser and navigate to the frontend URL (typically `http://localhost:5173`).

## Troubleshooting

*   **MongoDB Connection Errors (`ECONNREFUSED` or similar)**:
    *   Ensure your IP address is whitelisted in your MongoDB Atlas Network Access settings.
    *   If you are on a VPN or restrictive network, try changing your computer's DNS settings to `8.8.8.8` (Google) or `1.1.1.1` (Cloudflare).
*   **Port Conflicts**: If port 5000 or 5173 is already in use, you may need to stop other services or change the configured ports in your `.env` and `vite.config.ts` files.
