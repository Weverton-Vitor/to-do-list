from project.apps.annotations.views import get_annotation
from django.urls import path
from project.apps.annotations import views

app_name = 'annotations'

urlpatterns = [
    path('', views.AnnotationListView.as_view(), name='annotation_list'),
    path('Adicionar', views.AnnotationCreateView.as_view(), name='annotation_create'),
    path('Editar/<int:pk>', views.AnnotationUpdateView.as_view(), name='annotation_edit'),
    path('Deletar/<int:pk>', views.AnnotationDeleteView.as_view(), name='annotation_delete'),
    path('Anotacao/<int:pk>', views.get_annotation, name='annotation_json'),
]