# MERN Stack Deployment Guide

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Deployment Architecture](#-deployment-architecture)
- [Prerequisites](#-prerequisites)
- [Setup Guide](#-setup-guide)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Monitoring](#-monitoring)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## 🌐 Project Overview
This guide documents the production deployment of a full-stack MERN (MongoDB, Express, React, Node.js) application, including CI/CD implementation and monitoring setup.

![Deployment Architecture Diagram](deployment/architecture.png)

## 🏗 Deployment Architecture

```
Production Environment
├── Frontend: Vercel (React)
├── Backend: Render (Node.js/Express)
├── Database: MongoDB Atlas
├── CI/CD: GitHub Actions
└── Monitoring: UptimeRobot + Sentry
```


## 🛠 Prerequisites

### Accounts Needed
| Service | Purpose | Free Tier |
|---------|---------|-----------|
| [GitHub](https://github.com) | Source code & CI/CD | Yes |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database hosting | Yes |
| [Render](https://render.com) | Backend hosting | Yes |
| [Vercel](https://vercel.com) | Frontend hosting | Yes |

### Development Tools
- Node.js v18+
- MongoDB Compass (optional)
- Git
- VS Code (recommended)

## 🚀 Setup Guide

### 1. Environment Configuration
```bash
# Clone repository
git clone https://github.com/your-repo/mern-app.git
cd mern-app

# Install dependencies
cd server && npm install
cd ../client && npm install
```

2. Production Builds
Frontend:

```
cd client
npm run build
```

Backend: 
```
// server.js - Production settings
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

```

3. Deployment
Backend (Render)
Create new Web Service
Connect GitHub repository
Configure:
Runtime: Node
Build Command: npm install
Start Command: node server.js
Add environment variables:
```
MONGO_URI=your_atlas_connection_string
NODE_ENV=production
```
Frontend (Vercel)
Import Git repository
Configure:
Framework: Create React App
Build Command: npm run build
Environment Variables:

```
REACT_APP_API_URL=https://your-api.onrender.com
```

⚙️ CI/CD Pipeline
Workflow Files
File	Purpose
.github/workflows/backend-ci.yml	Backend testing
.github/workflows/frontend-ci.yml	Frontend testing
.github/workflows/deploy-prod.yml	Production deployment
Example workflow:

```
name: Frontend CI
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: cd client && npm ci
      - run: cd client && npm test
```
📊 Monitoring
Implemented Checks
Health Endpoint: GET /api/health
```
{
  "status": "OK",
  "dbStatus": "connected",
  "timestamp": "2023-08-21T12:00:00Z"
}
```

Monitoring Tools:

UptimeRobot: HTTP checks every 5 minutes

Sentry: Error tracking

MongoDB Atlas: Database metrics

🚨 Troubleshooting
Common Issues
Error	Solution
MongoDB connection failed	Verify Atlas IP whitelisting
CORS errors	Check frontend API URL
Build failures	Examine CI/CD logs
📜 License
This project is part of the MERN Stack Development Course. Released under MIT License.

