# Deployment Guide

This guide covers deploying both the frontend and backend of your portfolio application.

## Table of Contents
- [Local Development Setup](#local-development-setup)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Railway)](#backend-deployment-railway)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Environment Variables](#environment-variables)
- [Connecting Frontend to Backend](#connecting-frontend-to-backend)

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Running Locally

1. **Start the Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

2. **Start the Frontend** (in a new terminal):
   ```bash
   cd my-portfolio
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

The Vite proxy automatically forwards `/api/*` requests to the backend.

## Frontend Deployment (Vercel)

Vercel is recommended for React/Vite applications - it's free, fast, and easy to use.

### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set the root directory to `my-portfolio`
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Add environment variable:
     - `VITE_API_URL`: Your backend API URL (e.g., `https://your-api.railway.app`)
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   cd my-portfolio
   vercel
   ```
   Follow the prompts and add environment variables when asked.

### Environment Variables for Frontend:
- `VITE_API_URL`: Your backend API URL (required for production)

## Backend Deployment (Railway)

Railway is recommended for Node.js backends - simple and free tier available.

### Steps:

1. **Sign up** at [railway.app](https://railway.app)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload the backend folder)
   - Select your repository and set root directory to `backend`

3. **Configure Environment Variables**:
   - Go to the "Variables" tab
   - Add all variables from `.env.example`:
     ```
     PORT=5000
     EMAIL_SERVICE=gmail
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     CONTACT_EMAIL=your-email@gmail.com
     SEND_AUTO_REPLY=false
     FRONTEND_URL=https://your-frontend.vercel.app
     ```

4. **Deploy**:
   - Railway auto-detects Node.js and runs `npm install` and `npm start`
   - Your API will be available at `https://your-project.railway.app`

5. **Get Your API URL**:
   - Copy the public URL from Railway dashboard
   - Update `VITE_API_URL` in your Vercel deployment

## Backend Deployment (Render)

Alternative to Railway, also has a free tier.

### Steps:

1. **Sign up** at [render.com](https://render.com)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `portfolio-backend`
     - Environment: `Node`
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add all variables from `.env.example`

4. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Your API will be available at `https://portfolio-backend.onrender.com`

## Environment Variables

### Backend (.env)
```env
PORT=5000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
CONTACT_EMAIL=your-email@gmail.com
SEND_AUTO_REPLY=false
FRONTEND_URL=https://your-frontend.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.railway.app
```

**Important**: 
- For local development, leave `VITE_API_URL` empty to use the Vite proxy
- For production, set `VITE_API_URL` to your deployed backend URL
- Update `FRONTEND_URL` in backend to match your deployed frontend URL

## Connecting Frontend to Backend

### Development (Local)
1. Backend runs on `http://localhost:5000`
2. Frontend runs on `http://localhost:5173`
3. Vite proxy automatically forwards `/api/*` to backend
4. No configuration needed!

### Production
1. Deploy backend first and get the URL (e.g., `https://api.railway.app`)
2. Deploy frontend and set `VITE_API_URL` environment variable
3. Update backend `FRONTEND_URL` to match frontend URL
4. Rebuild frontend to pick up new API URL

### Testing the Connection

1. **Health Check**:
   ```bash
   curl https://your-backend.railway.app/api/health
   ```

2. **From Frontend**:
   ```javascript
   // Should work automatically with the API service
   import { healthAPI } from './services/api';
   const health = await healthAPI.check();
   ```

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check that CORS is configured in `backend/server.js`

### API Not Found
- Verify `VITE_API_URL` is set correctly in frontend
- Check backend is deployed and accessible
- Test backend endpoints directly (e.g., `/api/health`)

### Build Failures
- Ensure all environment variables are set
- Check build logs for specific errors
- Verify Node.js version compatibility

## Next Steps

- Set up custom domains (optional)
- Configure email service for contact form
- Add monitoring and logging
- Set up CI/CD for automatic deployments
