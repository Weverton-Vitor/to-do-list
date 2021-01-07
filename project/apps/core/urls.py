from django.urls import path
from project.apps.core import views
from project.apps.annotations.urls import app_name

app_name = 'core'

urlpatterns = [
    path('', views.Index.as_view(), name='index'),
    path('Limpar-lixeira', views.delete_all, name='delete-all'),    
]