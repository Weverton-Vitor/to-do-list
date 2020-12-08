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

        # Url da requisição atual
        context['url_annotations_list'] = self.request.path

        # Só adiciona a query string ao contexto caso ela não exista,
        # Se ela existir, em uma proxima requisição vinda do botão de alteração ela não será adicionada
        if not (self.request.GET.get('change')):
            context['change_order'] = 'change=order'
        else:
            # Atualizando a url da requisção atual para seguir a ordem da listagem
            context['url_annotations_list'] += '?change=order'
            
        # Link que o formulário de pesquisa vai ser submetido
        context['link_search'] = reverse('annotations:annotation_list')
        
        context['title'] = self.request.GET.get('title')

        return context

    def get_queryset(self):
        # Verificando em que ordem está a listagem
        if self.request.GET.get('change') == 'order':
            queryset = Annotation.objects.all().order_by('-priority')
        else:
            queryset = Annotation.objects.all().order_by('priority')
            
        # Verificando se existe filtragem
        title = self.request.GET.get('title')
        if title:
            queryset = queryset.filter(title__istartswith=title)
            
        return queryset


class AnnotationCreateView(CreateView):
    model = Annotation
    form_class = ModelFormAnnotation

    def get(self, request, *args, **kwargs):
        # Verificando qual será a ordem da listagem pela QueryString da requisição        
        if self.request.GET.get('change'):
            return HttpResponseRedirect(reverse('annotations:annotation_list') + '?' + self.request.GET.urlencode())

        return HttpResponseRedirect(reverse('annotations:annotation_list'))

    def form_invalid(self, form):
        messages.error(self.request, "Erro ao adicionar")        
        
        # Verificando qual será a ordem da listagem pela QueryString da requisição
        if self.request.GET.get('change'):
            return HttpResponseRedirect(reverse('annotations:annotation_list') + '?' + self.request.GET.urlencode())

        return HttpResponseRedirect(reverse('annotations:annotation_list'))
        

    def form_valid(self, form):                        
        messages.success(self.request, "Sucesso ao adicionar")        
        return super().form_valid(form)

    def get_success_url(self):
        # Verificando qual será a ordem da listagem pela QueryString da requisição        
        if self.request.GET.get('change'):
            return reverse('annotations:annotation_list') + '?change=order'

        return reverse('annotations:annotation_list')


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

                return get_annotation(request, annotation.pk, msg='Sucesso ao editar ' +  data['title'])

        return JsonResponse({'msg': 'Erro ao editar'}, status=400)

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list'))


class AnnotationDeleteView(DeleteView):
    model = Annotation
    success_url = reverse_lazy('annotations:annotation_list')

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list') + '?' + self.request.GET.urlencode)       

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        success_url = self.get_success_url()
        success = self.object.delete()
        if success[0]:
            messages.success(
                self.request, f'Sucesso ao deletar {self.object.title}')

        return HttpResponseRedirect(success_url)
    
    def get_success_url(self):
        # Verificando qual será a ordem da listagem pela QueryString da requisição        
        if self.request.GET.get('change'):
            return reverse('annotations:annotation_list') + '?change=order'

        return reverse('annotations:annotation_list')


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
