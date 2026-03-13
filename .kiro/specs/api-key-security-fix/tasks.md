# Implementation Plan

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Duplicate .env File with Real API Key
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the duplicate .env file exists with real credentials
  - **Scoped PBT Approach**: For this deterministic bug, scope the property to the concrete failing case: existence of `backend/apps/chat_bridge/.env` with real API key
  - Test that `backend/apps/chat_bridge/.env` exists and contains real API key (from Bug Condition in design)
  - Test that the file uses incorrect variable name `Google_API_Key` instead of `GEMINI_API_KEY`
  - Test that the application loads from `backend/.env` instead (confirming duplicate is unused)
  - The test assertions should match the Expected Behavior Properties from design: single source of truth for API keys
  - Run test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document counterexamples found: duplicate file exists with exposed credentials
  - Mark task complete when test is written, run, and failure is documented
  - _Requirements: 2.1, 2.2_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Environment Variable Loading Mechanism
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code: application starts successfully and loads API key from `backend/.env`
  - Observe: `ai_config.py` uses `os.getenv("GEMINI_API_KEY")` and loads correctly
  - Observe: Django application starts without errors
  - Write tests capturing observed behavior patterns from Preservation Requirements:
    - Application startup succeeds
    - `get_gemini_client()` in `ai_config.py` successfully loads API key
    - `os.getenv("GEMINI_API_KEY")` returns correct value
    - No code files are modified (only file deletion)
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.3, 3.4_

- [x] 3. Fix for duplicate .env file security vulnerability

  - [x] 3.1 Implement the fix
    - Delete `backend/apps/chat_bridge/.env` file entirely
    - Verify `backend/.env` exists and contains `GEMINI_API_KEY` variable
    - Verify `.gitignore` includes `.env` pattern (already present)
    - No code changes required - this is a file management fix only
    - _Bug_Condition: isBugCondition(filesystem) where fileExists("backend/apps/chat_bridge/.env") AND fileContains(realAPIKey)_
    - _Expected_Behavior: Single source of truth - API keys exist only in backend/.env with no duplicate files in subdirectories_
    - _Preservation: Environment variable loading mechanism in ai_config.py remains unchanged, application continues to function identically_
    - _Requirements: 2.1, 2.2, 3.1, 3.3, 3.4_

  - [x] 3.2 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Single Source of Truth for API Keys
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Run bug condition exploration test from step 1
    - **EXPECTED OUTCOME**: Test PASSES (confirms duplicate file is removed and bug is fixed)
    - _Requirements: 2.1, 2.2_

  - [x] 3.3 Verify preservation tests still pass
    - **Property 2: Preservation** - Environment Variable Loading Mechanism
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run preservation property tests from step 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm application still starts successfully
    - Confirm API key loading still works correctly
    - Confirm no code files were modified

- [x] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Verify no .env files exist in `backend/apps/` subdirectories
  - Verify `backend/.env` is the single source of truth for API keys
  - Verify application functions identically to before the fix
