from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class StudentSignUpForm(forms.ModelForm):
    full_name = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'e.g., Jane Wambui', 'class': 'mindmate-input'}),
        label="Full Name"
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': '••••••••', 'class': 'mindmate-input'}),
        validators=[validate_password]
    )

    class Meta:
        model = User
        fields = ('full_name', 'email', 'university', 'password')
        widgets = {
            'email': forms.EmailInput(attrs={'placeholder': 'jane.w@uonbi.ac.ke', 'class': 'mindmate-input'}),
            'university': forms.Select(
                choices=[('', 'Select institution'), ('UoN', 'UoN'), ('KU', 'KU'), ('JKUAT', 'JKUAT')],
                attrs={'class': 'mindmate-input'}
            ),
        }

    def clean_email(self):
        email = self.cleaned_data.get('email').lower()
        # Temporarily allow any email for development
        # if not email.endswith('.ac.ke'):
        #     raise ValidationError("Please use your university email (.ac.ke)")
        if User.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        # Assuming we use the full name as the internal username or just handle it
        user.username = self.cleaned_data["email"] 
        if commit:
            user.save()
        return user
