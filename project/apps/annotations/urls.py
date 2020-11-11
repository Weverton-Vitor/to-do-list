from django.urls import path
from project.apps.annotations import views

app_name = 'annotations'

urlpatterns = [
    path('', views.ListAnnotation.as_view(), name='annotation_list')
]