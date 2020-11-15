from django.urls import path
from project.apps.annotations import views

app_name = 'annotations'

urlpatterns = [
    path('', views.AnnotationListView.as_view(), name='annotation_list'),
    path('Adicionar', views.AnnotationCreateView.as_view(), name='annotation_create'),
    path('Deletar/<int:pk>', views.AnnotationDeleteView.as_view(), name='annotation_delete')
]