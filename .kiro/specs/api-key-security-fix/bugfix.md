# Bugfix Requirements Document

## Introduction

This bugfix addresses a critical security vulnerability where API keys are exposed in plain text in a duplicate .env file located in a subdirectory (`backend/apps/chat_bridge/.env`). While the application correctly loads environment variables from the main `backend/.env` file, the presence of a duplicate .env file containing the actual Gemini API key (AIzaSyB9YlM4vSVvX1W6lwWjrhmPMRj2iUxgfx4) creates a security risk. This duplicate file serves no functional purpose and could be accidentally committed to version control, exposing sensitive credentials.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a duplicate .env file exists in `backend/apps/chat_bridge/.env` THEN the system exposes the real Gemini API key in plain text in an unnecessary location

1.2 WHEN developers navigate the codebase THEN the system presents multiple .env files with inconsistent content (real key in subdirectory, placeholder in main .env)

1.3 WHEN the duplicate .env file exists THEN the system creates confusion about which .env file is the authoritative source for configuration

### Expected Behavior (Correct)

2.1 WHEN managing API keys THEN the system SHALL store them only in the main `backend/.env` file and nowhere else

2.2 WHEN developers navigate the codebase THEN the system SHALL present a single, clear .env file location with proper documentation

2.3 WHEN configuring the application THEN the system SHALL provide clear documentation on secure key management practices including .env.example templates

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the application loads environment variables THEN the system SHALL CONTINUE TO load from `backend/.env` using `os.getenv("GEMINI_API_KEY")` in `ai_config.py`

3.2 WHEN .env files are present THEN the system SHALL CONTINUE TO exclude them from version control via `.gitignore`

3.3 WHEN the application runs THEN the system SHALL CONTINUE TO function with the same API key loading mechanism without code changes to `ai_config.py`

3.4 WHEN developers set up the project THEN the system SHALL CONTINUE TO use the existing environment variable loading pattern
