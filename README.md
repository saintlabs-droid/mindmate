<div align="center">

# MindMate

### Emotional Tracking and Reflection Platform for Kenyan University Students

**BIT 420 Final Year Project (Year 4.2) - Group 5**

*Masinde Muliro University of Science and Technology (MMUST)*

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.2-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow.svg)]()

</div>

---

## About

MindMate is a web-based platform designed specifically for Kenyan university students to track their emotional well-being, visualize mood patterns, receive AI-powered reflection prompts, and access mental health support resources. The system supports **UN Sustainable Development Goal 3** (Good Health and Well-being) by providing an accessible, private, and culturally-sensitive tool for mental health monitoring.

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

### 5. Privacy & Security
- JWT token authentication (24-hour expiration)
- Bcrypt password hashing
- User data isolation
- HTTPS encryption
- Account deletion with data export

### 6. User Profile Management
- View account statistics (total moods, days tracked, average mood)
- Change password
- Export data (JSON/CSV)
- Delete account permanently

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Tailwind CSS, Chart.js, Axios, React Router |
| Backend | Django 4.2, Django REST Framework, PostgreSQL, JWT |
| AI Service | Gemini API (Google), TextBlob/NLTK |
| Deployment | Render (free tier), GitHub Actions, Gunicorn |

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

---

## Project Structure

```
mindmate/
├── ai/                          # AI/ML module for chatbot and sentiment analysis
│   ├── chatbot_logic.py         # Core chatbot conversation logic
│   ├── model_config.py          # AI model configuration settings
│   ├── sentiment_analysis.py    # Sentiment analysis for user messages
│   ├── models/                  # Trained ML models storage
│   ├── services/                # AI service layer
│   └── utils/                   # AI utility functions
│
├── backend/                     # Django REST API backend
│   ├── apps/                    # Django applications
│   │   ├── ai_service/          # AI chatbot API endpoints
│   │   ├── authentication/      # User auth (login, register, JWT)
│   │   ├── insights/            # Mood analytics and visualizations
│   │   ├── mood_tracking/       # Mood logging CRUD operations
│   │   ├── resources/           # Static resources management
│   │   ├── support_resources/   # Mental health resources directory
│   │   └── users/               # User profile management
│   ├── config/                  # Django project settings
│   │   ├── settings.py          # Main configuration
│   │   ├── urls.py              # URL routing
│   │   └── wsgi.py / asgi.py    # Server interfaces
│   ├── middleware/              # Custom middleware (auth, logging)
│   ├── utils/                   # Shared backend utilities
│   ├── manage.py                # Django CLI
│   └── requirements.txt         # Python dependencies
│
├── frontend/                    # React frontend application
│   ├── public/                  # Static assets (index.html, favicon)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── ai-chat/         # Chat interface components
│   │   │   ├── auth/            # Login/register forms
│   │   │   ├── common/          # Shared components (buttons, modals)
│   │   │   ├── insights/        # Charts and analytics components
│   │   │   ├── layout/          # Header, footer, navigation
│   │   │   ├── mood/            # Mood logging components
│   │   │   └── resources/       # Resource display components
│   │   ├── pages/               # Page-level components
│   │   │   ├── About/           # About page
│   │   │   ├── Account/         # User profile page
│   │   │   ├── AIAssistant/     # Chat with MindAI page
│   │   │   ├── Dashboard/       # Main dashboard
│   │   │   ├── Insights/        # Analytics page
│   │   │   ├── Landing/         # Home/landing page
│   │   │   ├── LogMood/         # Mood entry page
│   │   │   └── Support/         # Support resources page
│   │   ├── context/             # React context providers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API service layer (Axios)
│   │   ├── styles/              # Global CSS/Tailwind styles
│   │   ├── utils/               # Frontend utility functions
│   │   └── App.js               # Main app component
│   └── package.json             # Node.js dependencies
│
├── design/                      # UI/UX design assets
│   └── mockups/                 # Page mockups (HTML + screenshots)
│       ├── about page/
│       ├── Account/
│       ├── Ai assistant/
│       ├── dashboard page/
│       ├── insights/
│       ├── landing page/
│       ├── log mood page/
│       └── support/
│
├── docs/                        # Project documentation
│   ├── BIT420-Project-Proposal.md
│   ├── api.md                   # API endpoint documentation
│   ├── ai-integration.md        # AI/Gemini integration guide
│   ├── deployment.md            # Deployment instructions
│   ├── frontend-guide.md        # Frontend development guide
│   ├── setup.md                 # Local setup instructions
│   └── images/                  # Documentation images
│
├── scripts/                     # Automation scripts
│   ├── setup.sh                 # Initial project setup
│   └── deploy.sh                # Deployment automation
│
├── tests/                       # Test suites
│   ├── backend-tests/           # Django/API tests
│   ├── frontend-tests/          # React component tests
│   ├── e2e/                     # End-to-end tests
│   ├── integration/             # Integration tests
│   └── unit/                    # Unit tests
│       ├── backend/
│       └── frontend/
│
├── .github/                     # GitHub configuration
│   ├── workflows/               # CI/CD pipelines
│   │   └── django-tests.yml     # Automated testing
│   ├── ISSUE_TEMPLATE.md
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/saintlabs-droid/mindmate.git
cd mindmate
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

---

## Documentation

- [BIT 420 Proposal](docs/BIT420-Project-Proposal.md)
- [API Documentation](docs/api.md)
- [Setup Guide](docs/setup.md)
- [Frontend Guide](docs/frontend-guide.md)
- [AI Integration](docs/ai-integration.md)

---

## Team

**Group 5 - BIT 420 Final Year Project (Year 4.2)**

| Name | Registration Number |
|------|---------------------|
| Peter Awori | SIT/B/01-02911/2022 |
| Samira Alenya | SIT/B/01-02897/2022 |
| Richard Ochieng | SIT/B/01-02904/2022 |
| Vincent Omondi | SIT/B/01-02924/2022 |
| Enos Odondi | SIT/B/01-02913/2022 |

**Supervisors:**
- Academic Supervisor: [Name]
- Industry Supervisor: [Name]

**Institution:** Masinde Muliro University of Science and Technology (MMUST)

**Course:** BIT 420 - Final Year Project

**Academic Year:** 2025/2026
