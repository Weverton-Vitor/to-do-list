from project.apps.list_of_items.models import TaskList
from django import forms


class ModelFormTaskList(forms.ModelForm):

    class Meta:
        model = TaskList
        fields = ['title']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-field',
                'placeholder': "Título da lista"
            }),           
        }
