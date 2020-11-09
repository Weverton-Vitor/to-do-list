from django.shortcuts import render
from django.views.generic.base import TemplateView

class index(TemplateView):
    template_name = 'annotation_list.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['new'] = 'Anotação'
        
        return context

