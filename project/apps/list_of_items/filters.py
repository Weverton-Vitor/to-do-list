import django_filters
from .models import TaskList

class TaskListFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='istartswith')
    class Meta:
        model = TaskList
        fields = ['title']