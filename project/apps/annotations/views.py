from django.shortcuts import render
from django.views.generic.list import ListView
from project.apps.annotations.models import Annotation

class ListAnnotation(ListView):
    template_name = 'annotation_list.html'
    model = Annotation   
    context_object_name = 'annotations' 
    paginate_by = 8
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['new'] = 'Anotação'
        
        return context
    
    def get_queryset(self):
        queryset = Annotation.objects.all().order_by('priority')
        return queryset
        

        
        