from project.apps.annotations.models import Annotation
from django import forms


class ModelFormAnnotation(forms.ModelForm):

    class Meta:
        model = Annotation
        fields = ['title', 'description', 'priority']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-field',
                'placeholder': "Título da anotação"
            }),

            'description': forms.Textarea(attrs={
                'class': 'form-field',
                'placeholder': "Conteúdo da anotação"
            }),

            'priority': forms.Select(attrs={
                'class': 'form-field',
            }, choices=[(1, '1 - Vermelha'), (2, '2 - Amarela'), (3, '3 - Verde')]),
        }
