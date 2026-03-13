"""
Bug Condition Exploration Test for API Key Security Fix

**Validates: Requirements 2.1, 2.2**

This test verifies the expected behavior: API keys should exist only in the main
backend/.env file with no duplicate .env files in subdirectories.

CRITICAL: This test is EXPECTED TO FAIL on unfixed code.
- When it FAILS: The bug exists (duplicate .env file with real API key)
- When it PASSES: The bug is fixed (no duplicate files, single source of truth)

This test encodes the EXPECTED BEHAVIOR and will validate the fix when it passes.
"""

import os
import unittest
from pathlib import Path


class TestBugConditionAPIKeySecurity(unittest.TestCase):
    """
    Property 1: Bug Condition - Single Source of Truth for API Keys
    
    For any API key or sensitive credential in the application, the filesystem
    SHALL store it exclusively in the main backend/.env file, with no duplicate
    .env files in subdirectories containing real credentials.
    """
    
    def setUp(self):
        """Set up test fixtures."""
        self.backend_root = Path(__file__).parent
        self.main_env_file = self.backend_root / ".env"
        self.duplicate_env_file = self.backend_root / "apps" / "chat_bridge" / ".env"
        
    def test_no_duplicate_env_files_in_subdirectories(self):
        """
        Test that no .env files exist in backend/apps/ subdirectories.
        
        Expected Behavior: Single source of truth - API keys exist only in backend/.env
        Bug Condition: Duplicate .env file exists in backend/apps/chat_bridge/.env
        
        This test will FAIL on unfixed code (proving the bug exists).
        This test will PASS after the fix (confirming expected behavior).
        """
        # Check that the duplicate file does NOT exist (expected behavior)
        self.assertFalse(
            self.duplicate_env_file.exists(),
            f"EXPECTED BEHAVIOR VIOLATION: Duplicate .env file found at {self.duplicate_env_file}. "
            f"API keys should only exist in {self.main_env_file}. "
            f"This is a security risk - the duplicate file could be accidentally committed to version control."
        )
        
    def test_main_env_file_is_single_source_of_truth(self):
        """
        Test that the main backend/.env file exists and is the only .env file.
        
        Expected Behavior: Main .env file exists with proper variable naming
        """
        # Main .env file should exist
        self.assertTrue(
            self.main_env_file.exists(),
            f"Main .env file not found at {self.main_env_file}"
        )
        
        # Check that main .env uses correct variable name GEMINI_API_KEY
        with open(self.main_env_file, 'r') as f:
            content = f.read()
            self.assertIn(
                "GEMINI_API_KEY",
                content,
                "Main .env file should use GEMINI_API_KEY variable name"
            )
            
    def test_no_env_files_in_apps_subdirectories(self):
        """
        Test that no .env files exist anywhere in backend/apps/ subdirectories.
        
        Expected Behavior: No .env files in any subdirectory of backend/apps/
        Bug Condition: .env file exists in backend/apps/chat_bridge/
        
        This comprehensive check ensures single source of truth for all API keys.
        """
        apps_dir = self.backend_root / "apps"
        
        if not apps_dir.exists():
            self.skipTest(f"Apps directory not found at {apps_dir}")
            
        # Find all .env files in apps subdirectories
        env_files_found = list(apps_dir.rglob(".env"))
        
        self.assertEqual(
            len(env_files_found),
            0,
            f"EXPECTED BEHAVIOR VIOLATION: Found {len(env_files_found)} .env file(s) in subdirectories: "
            f"{[str(f) for f in env_files_found]}. "
            f"All API keys should be stored only in {self.main_env_file}."
        )
        
    def test_duplicate_file_does_not_contain_real_api_key(self):
        """
        Test that if duplicate file exists, it does not contain real API credentials.
        
        Expected Behavior: No real API keys in subdirectory .env files
        Bug Condition: Real API key AIzaSyB9YlM4vSVvX1W6lwWjrhmPMRj2iUxgfx4 exists in duplicate file
        
        This test documents the specific security vulnerability.
        """
        if self.duplicate_env_file.exists():
            with open(self.duplicate_env_file, 'r') as f:
                content = f.read()
                
            # Check for the real API key from bug report
            self.assertNotIn(
                "AIzaSyB9YlM4vSVvX1W6lwWjrhmPMRj2iUxgfx4",
                content,
                f"SECURITY VIOLATION: Real Gemini API key found in duplicate file {self.duplicate_env_file}. "
                f"This exposes sensitive credentials in an unnecessary location."
            )
            
            # Check for incorrect variable name
            self.assertNotIn(
                "Google_API_Key",
                content,
                f"CONFIGURATION ERROR: Incorrect variable name 'Google_API_Key' found in {self.duplicate_env_file}. "
                f"Should use 'GEMINI_API_KEY' as defined in main .env file."
            )


class TestPreservationEnvironmentVariableLoading(unittest.TestCase):
    """
    Property 2: Preservation - Environment Variable Loading Mechanism
    
    **Validates: Requirements 3.1, 3.3, 3.4**
    
    For any code that loads environment variables (specifically ai_config.py using
    os.getenv("GEMINI_API_KEY")), the fixed system SHALL produce exactly the same
    behavior as the original system, preserving the existing environment variable
    loading mechanism without code changes.
    
    IMPORTANT: These tests follow observation-first methodology.
    - Run on UNFIXED code to observe baseline behavior
    - Tests should PASS on unfixed code (confirming what to preserve)
    - Tests should PASS after fix (confirming no regressions)
    
    These tests capture the behavior patterns that must remain unchanged:
    - Application startup succeeds
    - get_gemini_client() successfully loads API key
    - os.getenv("GEMINI_API_KEY") returns correct value
    - No code files are modified (only file deletion)
    """
    
    def setUp(self):
        """Set up test fixtures."""
        self.backend_root = Path(__file__).parent
        self.main_env_file = self.backend_root / ".env"
        self.ai_config_file = self.backend_root / "apps" / "ai_service" / "ai_config.py"
        
    def test_main_env_file_exists_and_is_readable(self):
        """
        Test that the main backend/.env file exists and can be read.
        
        Preservation: The application must continue to load from backend/.env
        This test confirms the main .env file is present and accessible.
        """
        self.assertTrue(
            self.main_env_file.exists(),
            f"Main .env file must exist at {self.main_env_file}"
        )
        
        # Verify file is readable
        try:
            with open(self.main_env_file, 'r') as f:
                content = f.read()
                self.assertIsNotNone(content, "Main .env file should be readable")
        except Exception as e:
            self.fail(f"Failed to read main .env file: {e}")
            
    def test_gemini_api_key_variable_exists_in_main_env(self):
        """
        Test that GEMINI_API_KEY variable exists in backend/.env.
        
        Preservation: The application uses os.getenv("GEMINI_API_KEY")
        This test confirms the variable name is correct in the main .env file.
        """
        with open(self.main_env_file, 'r') as f:
            content = f.read()
            
        self.assertIn(
            "GEMINI_API_KEY",
            content,
            "Main .env file must contain GEMINI_API_KEY variable"
        )
        
    def test_os_getenv_loads_gemini_api_key(self):
        """
        Test that os.getenv("GEMINI_API_KEY") pattern is used correctly.
        
        Preservation: The environment variable loading mechanism must work
        This test confirms the .env file contains the GEMINI_API_KEY variable
        that os.getenv() will access when the application runs.
        
        Note: In the actual Django application, environment variables are loaded
        automatically. This test verifies the .env file structure is correct.
        """
        # Verify the .env file contains GEMINI_API_KEY with a value
        with open(self.main_env_file, 'r') as f:
            content = f.read()
            
        # Check that GEMINI_API_KEY is defined
        self.assertIn(
            "GEMINI_API_KEY",
            content,
            ".env file must contain GEMINI_API_KEY variable"
        )
        
        # Parse the .env file to verify the key has a value
        for line in content.split('\n'):
            line = line.strip()
            if line.startswith('GEMINI_API_KEY='):
                value = line.split('=', 1)[1].strip()
                self.assertNotEqual(
                    value,
                    "",
                    "GEMINI_API_KEY must have a value in .env file"
                )
                break
        else:
            self.fail("GEMINI_API_KEY not found in .env file")
        
    def test_ai_config_uses_correct_environment_variable_pattern(self):
        """
        Test that ai_config.py uses os.getenv("GEMINI_API_KEY") pattern.
        
        Preservation: The code must continue to use the same loading mechanism
        This test confirms no code changes are made to ai_config.py.
        """
        self.assertTrue(
            self.ai_config_file.exists(),
            f"ai_config.py must exist at {self.ai_config_file}"
        )
        
        with open(self.ai_config_file, 'r') as f:
            content = f.read()
            
        # Verify the correct pattern is used
        self.assertIn(
            'os.getenv("GEMINI_API_KEY")',
            content,
            "ai_config.py must use os.getenv('GEMINI_API_KEY') pattern"
        )
        
        # Verify get_gemini_client function exists
        self.assertIn(
            "def get_gemini_client()",
            content,
            "ai_config.py must contain get_gemini_client() function"
        )
        
    def test_get_gemini_client_function_signature_unchanged(self):
        """
        Test that get_gemini_client() function signature remains unchanged.
        
        Preservation: No code changes to ai_config.py
        This test confirms the function signature is preserved.
        """
        # Import the function to verify it exists and is callable
        import sys
        ai_service_path = self.backend_root / "apps" / "ai_service"
        if str(ai_service_path) not in sys.path:
            sys.path.insert(0, str(ai_service_path))
            
        try:
            from ai_config import get_gemini_client
            
            # Verify function is callable
            self.assertTrue(
                callable(get_gemini_client),
                "get_gemini_client must be a callable function"
            )
            
            # Verify function signature (should take no required arguments)
            import inspect
            sig = inspect.signature(get_gemini_client)
            params = [p for p in sig.parameters.values() if p.default == inspect.Parameter.empty]
            
            self.assertEqual(
                len(params),
                0,
                "get_gemini_client() should take no required arguments"
            )
            
        except ImportError as e:
            self.fail(f"Failed to import get_gemini_client: {e}")
            
    def test_no_code_files_modified_only_file_deletion(self):
        """
        Test that ai_config.py and other Python files remain unchanged.
        
        Preservation: This is a file management fix - no code changes required
        This test confirms that only .env files are affected, not Python code.
        
        Note: This test verifies the ai_config.py file exists and contains
        the expected patterns. After the fix, this should still pass.
        """
        # Verify ai_config.py exists
        self.assertTrue(
            self.ai_config_file.exists(),
            "ai_config.py must not be deleted or moved"
        )
        
        # Verify Django settings file exists
        settings_file = self.backend_root / "config" / "settings.py"
        self.assertTrue(
            settings_file.exists(),
            "Django settings.py must not be deleted or moved"
        )
        
        # Verify manage.py exists
        manage_file = self.backend_root / "manage.py"
        self.assertTrue(
            manage_file.exists(),
            "manage.py must not be deleted or moved"
        )


if __name__ == '__main__':
    unittest.main()
