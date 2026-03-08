"""
Pytest configuration for property-based tests
"""
import pytest
from hypothesis import settings, Verbosity

# Configure Hypothesis settings for property tests
settings.register_profile("ci", max_examples=1000, verbosity=Verbosity.verbose)
settings.register_profile("dev", max_examples=100)
settings.register_profile("debug", max_examples=10, verbosity=Verbosity.verbose)

# Load the appropriate profile
settings.load_profile("dev")
