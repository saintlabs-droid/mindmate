from django import forms
from django.core.exceptions import ValidationError

class StudentSignUpForm(forms.Form):
    full_name = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'e.g., Jane Wambui', 'class': 'mindmate-input'})
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'jane.w@uonbi.ac.ke', 'class': 'mindmate-input'})
    )
    university = forms.ChoiceField(
        choices=[('', 'Select institution'), ('UoN', 'UoN'), ('KU', 'KU'), ('JKUAT', 'JKUAT')],
        widget=forms.Select(attrs={'class': 'mindmate-input'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': '••••••••', 'class': 'mindmate-input'})
    )

    def clean_email(self):
        email = self.cleaned_data.get('email').lower()
        if not email.endswith('.ac.ke'):
            raise ValidationError("Please use your university email (.ac.ke)")
        return email