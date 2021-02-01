import json
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, DeleteView, ListView, UpdateView
from project.apps.core.views import FilteredListView, TrashDeleteView, TrashUpdateView
from .filters import AnnotationFilter
from .forms import ModelFormAnnotation
from .models import Annotation


class AnnotationListView(FilteredListView):
    filterset_class = AnnotationFilter
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
        context['url_list_mode'] = self.request.path

        # Só adiciona a query string ao contexto caso ela não exista,
        # Se ela existir, em uma proxima requisição vinda do botão de alteração ela não será adicionada
        if not (self.request.GET.get('change')):
            context['change_order'] = 'change=order'
        else:
            # Atualizando a url da requição atual para seguir a ordem da listagem
            context['url_list_mode'] += '?change=order'

        # Link que o formulário de pesquisa vai ser submetido
        context['link_search'] = reverse('annotations:annotation_list')

        # Descrição para o botão de alterar a ordem da listagem
        context['title_btn_change'] = 'Alterar ordem de listagem por prioridade'

        # Mensagem para caso a lista estiver vazia
        context['empty_msg'] = 'Sem Anotações'
        title = self.request.GET.get('title')
        if title:
            context['empty_msg'] = f'Sem resultados para "{title}"'

        return context

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(
            is_trash=False).order_by('priority')
        # Verificando em que ordem está a listagem
        if self.request.GET.get('change') == 'order':
            queryset = queryset.order_by('-priority')

        # Verificando se existe filtragem
        title = self.request.GET.get('title')
        if title:
            queryset = queryset.filter(title__istartswith=title)

        return queryset


class AnnotationTrashListView(ListView):
    template_name = 'annotation_trash_list.html'
    model = Annotation
    context_object_name = 'annotations'
    paginate_by = 8

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['trash'] = True

        # Url da requisição atual
        context['url_list_mode'] = self.request.path

        # Só adiciona a query string ao contexto caso ela não exista,
        # Se ela existir, em uma proxima requisição vinda do botão de alteração ela não será adicionada
        if not (self.request.GET.get('change')):
            context['change_order'] = 'change=order'
        else:
            # Atualizando a url da requição atual para seguir a ordem da listagem
            context['url_list_mode'] += '?change=order'

        # Link que o formulário de pesquisa vai ser submetido
        context['link_search'] = reverse('annotations:annotation_trash_list')

        # Descrição para o botão de alterar a ordem da listagem
        context['title_btn_change'] = 'Alterar ordem de listagem por prioridade'

        # Mensagem para caso a lista estiver vazia
        context['empty_msg'] = 'Sem Anotações'
        title = self.request.GET.get('title')
        if title:
            context['empty_msg'] = f'Sem resultados para "{title}"'

        return context

    def get_queryset(self):
        queryset = Annotation.objects.filter(
            is_trash=True).order_by('priority')
        # Verificando em que ordem está a listagem
        if self.request.GET.get('change') == 'order':
            queryset = queryset.order_by('-priority')

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


class AnnotationUpdateView(TrashUpdateView):
    model = Annotation
    form_class = ModelFormAnnotation
    success_url = reverse_lazy('annotations:annotation_list')
    type_of = 'annotation'

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('annotations:annotation_list'))

    def ajax_method(self, request, pk, **kwargs):
        return get_annotation(request, pk, **kwargs)


class AnnotationDeleteView(TrashDeleteView):
    model = Annotation
    success_url = reverse_lazy('annotations:annotation_list')
    trash_url = reverse_lazy('annotations:annotation_trash_list')

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(success_url + '?' + self.request.GET.urlencode)


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
