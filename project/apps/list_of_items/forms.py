from project.apps.list_of_items.models import TaskList, TaskListItem
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


class ModelFormTaskListItem(forms.ModelForm):

    class Meta:
        model = TaskListItem
        fields = ['description']
        widgets = {
            'description': forms.TextInput(attrs={
                'class': 'form-field',
                'placeholder': "Descrição do item"
            }),           
        }