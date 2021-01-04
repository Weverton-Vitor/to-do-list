from django.urls import path
from project.apps.list_of_items import views

app_name = 'list_of_items'

urlpatterns = [
    path('', views.TaskListListView.as_view(), name='task_list_list'),
    path('Adicionar', views.TaskListCreateView.as_view(), name='task_list_create'),
    path('Adicionar/Item', views.TaskListItemCreateView.as_view(), name='task_list_item_create'),
    path('Editar/<int:pk>', views.TaskListUpdateView.as_view(), name='task_list_edit'),
    path('Deletar/<int:pk>', views.TaskListDeleteView.as_view(), name='task_list_delete'),
    path('Deletar/Item/<int:pk>', views.detele_task_list_item, name='task_list_delete_item'),
    path('Lista/<int:pk>', views.get_task_list, name='task_list_json'),
    path('Lixeira', views.TaskListTrashListView.as_view(), name='task_list_trash_list'),
]
