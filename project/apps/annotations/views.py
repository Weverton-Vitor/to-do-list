from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, DeleteView, ListView, UpdateView
from project.apps.annotations.forms import ModelFormAnnotation
from project.apps.annotations.models import Annotation
import json


class AnnotationListView(ListView):
    template_name = 'annotation_list.html'
    model = Annotation
    context_object_name = 'annotations'
    paginate_by = 8

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['new'] = 'Anotação'

        form = ModelFormAnnotation()
        context['form'] = form

        return context

    def get_queryset(self):
        queryset = Annotation.objects.all().order_by('priority')
        return queryset


class AnnotationCreateView(CreateView):
    model = Annotation
    form_class = ModelFormAnnotation
    success_url = reverse_lazy('annotations:annotation_list')

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list'))


class AnnotationUpdateView(UpdateView):
    model = Annotation
    form_class = ModelFormAnnotation    
    
    def post(self, request, *args, **kwargs):        
        annotation = self.get_object()
        
        # Pegando o conteúdo do json enviado na requisição
        data = json.loads(request.body)
        data = data['annotation']            
        
        annotation.title = data['title']
        annotation.description = data['description']
        annotation.priority = data['priority']            
        annotation.save()           
            
        return get_annotation(request, annotation.pk)        

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list'))


class AnnotationDeleteView(DeleteView):
    model = Annotation
    success_url = reverse_lazy('annotations:annotation_list')

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list'))


def get_annotation(request, pk):
    annotation = Annotation.objects.get(pk=pk)
    data = {
        'title': annotation.title,
        'description': annotation.description,
        'priority': annotation.priority,
    }
    return JsonResponse({'annotation': data})
