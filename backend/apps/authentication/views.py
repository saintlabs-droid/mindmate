from django.shortcuts import render, redirect
from .forms import StudentSignUpForm

def signup_view(request):
    if request.method == 'POST':
        form = StudentSignUpForm(request.POST)
        if form.is_valid():
            # Data is valid (.ac.ke email confirmed)! 
            # Later we will add: form.save()
            return redirect('login')
    else:
        form = StudentSignUpForm()
    
    # Django looks in frontend/src/pages/profilemanagement/signup.html
    return render(request, 'profilemanagement/signup.html', {'form': form})

def login_view(request):
    return render(request, 'profilemanagement/login.html')