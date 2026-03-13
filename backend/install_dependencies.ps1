# Install missing dependencies for mood-to-chat bridge

Write-Host "`nInstalling required packages..." -ForegroundColor Yellow
Write-Host "This will install: pydantic and google-genai`n" -ForegroundColor Cyan

# Install packages
pip install pydantic==2.5.0
pip install google-genai==0.2.0

Write-Host "`n✓ Dependencies installed successfully!" -ForegroundColor Green
Write-Host "`nYou can now run:" -ForegroundColor Yellow
Write-Host "  python quick_test.py" -ForegroundColor Cyan
Write-Host "  python manage.py migrate" -ForegroundColor Cyan
Write-Host "  python manage.py runserver" -ForegroundColor Cyan
