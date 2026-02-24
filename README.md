<div align="center">

# 🧠 MindMate

### Emotional Tracking and Reflection Platform for Kenyan University Students

**BIT 420 Final Year Project (Year 4.2) - Group 5**

*Masinde Muliro University of Science and Technology (MMUST)*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.2-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)]()

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Documentation](#documentation) • [Team](#team)

</div>

---

## About

MindMate is a web-based platform designed specifically for Kenyan university students to track their emotional well-being, visualize mood patterns, receive AI-powered reflection prompts, and access mental health support resources. The system supports **UN Sustainable Development Goal 3** (Good Health and Well-being) by providing an accessible, private, and culturally-sensitive tool for mental health monitoring.

This project is developed as part of our **BIT 420 Final Year Project** in Year 4, Semester 2 at MMUST.

**The platform addresses critical challenges:**
- 30-40% of Kenyan university students show signs of depression and anxiety
- MMUST has only 2 counselors for 8,000 students (1:4,000 ratio)
- Stigma prevents 73% of students from seeking help
- Commercial mental health apps cost KES 750-1,950/month (unaffordable for most students)
- Existing apps lack Kenyan context (American helplines, no HELB delay understanding, etc.)

**MindMate provides:**
- **Free** - Zero cost using Render free tier and Gemini API
- **Lightweight** - Works on 500MB data bundles
- **Private** - No data sharing, encrypted communication
- **Culturally appropriate** - Kenya helplines, MMUST counseling contacts, understands local student challenges

---

## Features

### 1. Mood Logging
- Track daily mood on 1-5 scale (😢 😟 😐 🙂 😊)
- Select stress category: Academics, Finances, Relationships, Family, Career
- Add optional notes (max 500 characters)
- One entry per day with edit/delete capability

### 2. Insights & Visualization
- 7-day mood trend line chart
- Stress category breakdown bar chart
- Average mood calculation
- Pattern identification (recurring lows, stress spikes, improvements)
- Time period filtering (7/30/90 days)

### 3. AI-Guided Reflection
- Chat with MindAI assistant powered by Gemini API
- Context-aware responses based on mood patterns
- Sentiment analysis of user messages
- Crisis keyword detection with immediate helpline display
- Conversation history persistence

### 4. Support Resources Directory
- MMUST counseling office contact
- Kenya national helplines (1199, Befrienders Kenya)
- Online mental health resources
- Emergency contacts
- Search and filter by category

### 5. Privacy & Security
- JWT token authentication (24-hour expiration)
- Bcrypt password hashing
- User data isolation (Student A cannot see Student B's data)
- HTTPS encryption
- No third-party data sharing
- Account deletion with data export

### 6. User Profile Management
- View account statistics (total moods, days tracked, average mood)
- Change password
- Export data (JSON/CSV)
- Delete account permanently

---

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### AI Service
- **Gemini API** (Google) - AI chat responses
- **TextBlob/NLTK** - Sentiment analysis (fallback)

### Deployment
- **Render** - Hosting (free tier)
- **GitHub Actions** - CI/CD
- **Gunicorn** - WSGI server

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│              React Frontend (Tailwind CSS)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS/REST (JWT Token)
┌─────────────────────▼───────────────────────────────────────┐
│                   API GATEWAY LAYER                         │
│              Django REST API (JWT Auth)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┬─────────────┐
        │             │             │             │
  ┌───────▼──────┐ ┌───▼────┐ ┌─────▼─────┐ ┌────▼─────┐
  │ Auth Service │ │ Mood   │ │ Insights  │ │   AI     │
  │              │ │ Service│ │  Service  │ │ Service  │
  └───────┬──────┘ └───┬────┘ └─────┬─────┘ └────┬─────┘
          │            │            │             │
          └────────────┼────────────┼─────────────┘
                       │            │
              ┌──────▼────────────▼──────┐
              │   PostgreSQL Database    │
              └──────────────────────────┘
```

**Architecture Principles:**
- **Separation of Concerns** - Frontend, backend, database, AI are independent
- **Stateless API** - JWT tokens for authentication
- **Service-Oriented** - Domain services (Auth, Mood, Insights, AI, Support)
- **Async Communication** - AI processes reflection prompts asynchronously
- **Scalability** - Horizontal scaling at API and AI layers

---

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/saintlabs-droid/mindmate.git
cd mindmate
```

2. **Backend Setup**
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your database credentials and SECRET_KEY

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

3. **Frontend Setup**
```bash
cd frontend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with API URL (default: http://localhost:8000)

# Start development server
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin

---

## Project Structure

```
mindmate/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── auth/       # Login, Register
│   │   │   ├── mood/       # MoodLogger, MoodHistory
│   │   │   ├── insights/   # Charts, Visualizations
│   │   │   ├── ai-chat/    # Chat interface
│   │   │   ├── resources/  # Support directory
│   │   │   ├── layout/     # Header, Footer, Sidebar
│   │   │   └── common/     # Buttons, Forms, Cards
│   │   ├── pages/          # Page components
│   │   │   ├── Landing/    # Landing page
│   │   │   ├── Dashboard/  # Main dashboard
│   │   │   ├── LogMood/    # Mood logging
│   │   │   ├── Insights/   # Insights & charts
│   │   │   ├── AIAssistant/# AI chat
│   │   │   ├── Account/    # User profile
│   │   │   └── Support/    # Resources
│   │   ├── services/       # API clients
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React context
│   │   └── utils/          # Helper functions
│   └── package.json
├── backend/                 # Django backend
│   ├── apps/
│   │   ├── authentication/ # Auth service
│   │   ├── mood_tracking/  # Mood service
│   │   ├── insights/       # Insights service
│   │   ├── ai_service/     # AI service
│   │   └── support_resources/ # Resources service
│   ├── config/             # Django settings
│   ├── utils/              # Shared utilities
│   └── requirements.txt
├── ai/                      # AI service (separate)
│   ├── services/           # AI logic
│   ├── models/             # AI models
│   └── utils/              # AI utilities
├── tests/                   # Test suites
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/                # End-to-end tests
├── docs/                    # Documentation
│   ├── api/                # API documentation
│   ├── architecture/       # Architecture docs
│   └── deployment/         # Deployment guides
├── design/                  # UI mockups
│   └── mockups/            # 8 UI mockup pages
├── .kiro/                   # Kiro specs
│   └── specs/
│       └── mindmate-platform/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
└── README.md
```

---

## Development

### Running Tests

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

### Code Quality

```bash
# Backend linting
cd backend
flake8 .
black .

# Frontend linting
cd frontend
npm run lint
npm run format
```

### Git Workflow

- `main` - Protected branch, production-ready code
- `vincent` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

Branch naming:
- `feature/mood-logging-ui`
- `bugfix/login-validation`

Commit messages:
- `feat: Add mood logging component`
- `fix: Resolve JWT token expiration issue`
- `docs: Update API documentation`
- `test: Add unit tests for mood service`

---

## Documentation

- [BIT 420 Proposal](docs/BIT420-Project-Proposal.md) - Complete project proposal
- [Requirements](../.kiro/specs/mindmate-platform/requirements.md) - Functional & non-functional requirements
- [Design](../.kiro/specs/mindmate-platform/design.md) - System architecture & component design
- [API Documentation](docs/api.md) - REST API endpoints
- [Setup Guide](docs/setup.md) - Detailed setup instructions
- [Deployment Guide](docs/deployment.md) - Render deployment instructions
- [Frontend Guide](docs/frontend-guide.md) - React component documentation
- [AI Integration](docs/ai-integration.md) - Gemini API integration

---

## Deployment

### Render (Free Tier)

**Frontend (Static Site):**
1. Connect GitHub repo to Render
2. Build command: `cd frontend && npm install && npm run build`
3. Publish directory: `frontend/build`
4. Auto-deploy on push to main

**Backend (Web Service):**
1. Connect GitHub repo to Render
2. Build command: `cd backend && pip install -r requirements.txt`
3. Start command: `cd backend && gunicorn config.wsgi:application`
4. Environment variables: `SECRET_KEY`, `DATABASE_URL`, `GEMINI_API_KEY`
5. Auto-deploy on push to main

**Database (PostgreSQL):**
1. Create PostgreSQL instance on Render
2. Copy `DATABASE_URL` to backend environment variables
3. Run migrations: `python manage.py migrate`

**Cost:** KES 0/month (free tier)

**Limitations:**
- Backend sleeps after 15 minutes idle (30-second wake-up time)
- 750 hours/month backend uptime
- 1GB database storage
- Gemini API: 60 requests/minute, 1,500 requests/day

---

## Contributing

We welcome contributions from the team! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code Review Process:**
- All PRs require 1 approval
- CI/CD checks must pass
- Code must follow style guidelines
- Tests must be included for new features

---

## Team

**Group 5 - BIT 420 Final Year Project (Year 4.2)**

| Name | Role | Registration Number |
|------|------|---------------------|
| Peter Awori | Project Lead & Backend Developer | SIT/B/01-02911/2022 |
| [Student 2] | Frontend Developer | [Reg Number] |
| [Student 3] | AI/ML Engineer | [Reg Number] |
| [Student 4] | UI/UX Designer | [Reg Number] |

**Supervisors:**
- Academic Supervisor: [Name]
- Industry Supervisor: [Name]

**Institution:** Masinde Muliro University of Science and Technology (MMUST)

**Course:** BIT 420 - Final Year Project

**Academic Year:** 2025/2026

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- MMUST - For providing the platform and resources
- UN SDG 3 - Good Health and Well-being initiative
- Kenyan University Students - For inspiring this project
- Open Source Community - For the amazing tools and libraries

---

## Support

For questions or support:
- Email: peter.awori@mmust.ac.ke
- GitHub Issues: [Create an issue](https://github.com/saintlabs-droid/mindmate/issues)
- MMUST Counseling: 0712345678
