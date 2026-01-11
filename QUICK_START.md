# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Local Development

### Step 1: Start Backend
```bash
cd backend
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 2: Start Frontend (new terminal)
```bash
cd my-portfolio
npm install
npm run dev
```
✅ Frontend running on http://localhost:5173

### Step 3: Open Browser
Visit http://localhost:5173 and explore your portfolio!

## 🌐 Deployment

### Frontend → Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Set root directory: `my-portfolio`
5. Add environment variable: `VITE_API_URL=https://your-backend.railway.app`
6. Deploy!

### Backend → Railway
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Set root directory: `backend`
4. Add environment variables (see `backend/.env.example`)
5. Deploy!

## 📖 Need More Help?

- **Detailed Local Setup**: See [LOCAL_SETUP.md](./LOCAL_SETUP.md)
- **Full Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Backend API Docs**: See [backend/README.md](./backend/README.md)

## ✅ Checklist

- [ ] Backend running locally
- [ ] Frontend running locally
- [ ] Can see portfolio in browser
- [ ] Metrics page loads data from API
- [ ] Ready to deploy!
