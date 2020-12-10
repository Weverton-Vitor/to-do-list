from django.urls import path
from project.apps.list_of_items import views

app_name='list_of_items'

urlpatterns = [
    path('', views.TaskListListView.as_view(), name='task_list_list')
]