# Portfolio Website

A modern, responsive portfolio website built with React (Vite) and Node.js/Express backend.

## 🚀 Features

- **Frontend**: React + Vite with Tailwind CSS
- **Backend**: Node.js/Express REST API
- **Contact Form**: Email integration via Nodemailer
- **API Integration**: Metrics, Case Studies, and Contact endpoints
- **Responsive Design**: Modern, clean UI that works on all devices

## 📁 Project Structure

```
Portfolio/
├── my-portfolio/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx       # Main app component
│   │   ├── services/     # API service utilities
│   │   └── ...
│   └── ...
├── backend/               # Backend (Node.js + Express)
│   ├── routes/           # API routes
│   ├── controllers/      # Request handlers
│   └── server.js         # Main server file
├── DEPLOYMENT.md         # Deployment guide
└── LOCAL_SETUP.md        # Local development guide
```

## 🏃 Quick Start (Local Development)

### Option 1: Quick Setup

1. **Start Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend** (new terminal):
   ```bash
   cd my-portfolio
   npm install
   npm run dev
   ```

3. **Open Browser**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/health

### Option 2: Detailed Setup

See [LOCAL_SETUP.md](./LOCAL_SETUP.md) for detailed instructions.

## 🌐 Deployment

### Frontend (Vercel)
- Free hosting for React apps
- Automatic deployments from GitHub
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for details

### Backend (Railway/Render)
- Free tier available
- Easy Node.js deployment
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for details

## 📚 Documentation

- **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** - Local development setup
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[backend/README.md](./backend/README.md)** - Backend API documentation
- **[backend/QUICK_START.md](./backend/QUICK_START.md)** - Backend quick start

## 🔧 Tech Stack

### Frontend
- React 19
- Vite 7
- Tailwind CSS (via inline classes)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- Nodemailer (email)
- CORS enabled

## 📡 API Endpoints

- `GET /api/health` - Health check
- `GET /api/metrics` - Get all metrics
- `GET /api/metrics/:channel` - Get metrics by channel
- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/:id` - Get case study by ID
- `POST /api/contact` - Send contact form email

See [backend/README.md](./backend/README.md) for detailed API documentation.

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api  # Leave empty for local dev (uses proxy)
```

### Backend (.env)
```env
PORT=5000
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
FRONTEND_URL=http://localhost:5173
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production configuration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📝 License

ISC

## 🙏 Acknowledgments

Built with modern web technologies and best practices.
