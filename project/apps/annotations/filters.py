import django_filters
from .models import Annotation

class AnnotationFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='istartswith')
    class Meta:
        model = Annotation
        fields = ['title']