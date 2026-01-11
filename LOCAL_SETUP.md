# Local Development Setup

Quick guide to run frontend and backend together locally.

## Prerequisites
- Node.js (v18 or higher)
- npm

## Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

**Note**: Email functionality will work without configuration (logs to console). To enable email:
1. Create a `.env` file in the `backend` directory
2. Copy contents from `.env.example`
3. Configure your email credentials (see `backend/README.md`)

### 2. Start the Frontend

Open a **new terminal** and run:

```bash
cd my-portfolio
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## How It Works

- Vite proxy automatically forwards `/api/*` requests to `http://localhost:5000`
- No CORS issues in development
- Hot reload for both frontend and backend

## Testing the Connection

1. **Check Backend Health**:
   - Open: `http://localhost:5000/api/health`
   - Should return: `{"status":"ok","message":"Portfolio API is running"}`

2. **Check Frontend**:
   - Open: `http://localhost:5173`
   - Navigate to "Metrics" page
   - Data should load from the backend API

## API Endpoints Available

- `GET /api/health` - Health check
- `GET /api/metrics` - Get all metrics
- `GET /api/metrics/:channel` - Get metrics by channel
- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/:id` - Get case study by ID
- `POST /api/contact` - Send contact form email

## Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `backend/.env` (default: 5000)
- Frontend: Vite will automatically use next available port

### Backend Not Connecting
- Make sure backend is running on port 5000
- Check terminal for errors
- Verify `backend/server.js` is running

### Frontend Build Errors
- Run `npm install` again
- Clear `node_modules` and reinstall
- Check Node.js version (should be v18+)

## Next Steps

- See `DEPLOYMENT.md` for production deployment
- See `backend/README.md` for backend API documentation
- Configure email service for contact form functionality
