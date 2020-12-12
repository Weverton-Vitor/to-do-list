from django.urls import path
from project.apps.list_of_items import views

app_name='list_of_items'

urlpatterns = [
    path('', views.TaskListListView.as_view(), name='task_list_list'),
    path('Adicionar', views.TaskListCreateView.as_view(), name='task_list_create'),    
    path('Deletar/<int:pk>', views.TaskListDeleteView.as_view(), name='task_list_delete'),

]