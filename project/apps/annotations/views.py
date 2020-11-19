from django.contrib import messages
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

    def form_invalid(self, form):
        messages.error(self.request, "Erro ao adicionar")
        return HttpResponseRedirect(reverse('annotations:annotation_list'))
    
    def form_valid(self, form):
        messages.success(self.request, "Sucesso ao adicionar")        
        return super().form_valid(form)


class AnnotationUpdateView(UpdateView):
    model = Annotation
    form_class = ModelFormAnnotation    

    def post(self, request, *args, **kwargs):
        annotation = self.get_object()

        # Pegando o conteúdo do json enviado na requisição
        data = json.loads(request.body)
        data = data['annotation']

        # Validando os dados
        if data['title'] != '' and len(data['title']) <= 25 and data['description'] != '':
            if data['priority'] in [1, 2, 3]:
                annotation.title = data['title']
                annotation.description = data['description']
                annotation.priority = data['priority']
                annotation.save()                              
                
                return get_annotation(request, annotation.pk, msg="Sucesso ao editar")
                
        return JsonResponse({'msg': 'Erro ao editar'}, status=400)
            

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list'))


class AnnotationDeleteView(DeleteView):
    model = Annotation
    success_url = reverse_lazy('annotations:annotation_list')

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list'))


def get_annotation(request, pk, **kwargs):
    annotation = Annotation.objects.get(pk=pk)
    data = {
        'id': annotation.pk,
        'title': annotation.title,
        'description': annotation.description,
        'priority': annotation.priority,
        
    }
        
    data.update(kwargs)
    return JsonResponse({'annotation': data})
