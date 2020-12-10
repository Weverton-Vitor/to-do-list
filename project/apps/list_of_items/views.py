from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import ListView
from project.apps.list_of_items.models import TaskList


class TaskListListView(ListView):
    template_name = 'task_list_list.html'
    model = TaskList
    context_object_name = 'task_lists'
    paginate_by = 8

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['new'] = 'Lista'

    #     form = ModelFormAnnotation()
    #     context['form'] = form

        # Url da requisição atual
        context['url_list_mode'] = self.request.path

        # Só adiciona a query string ao contexto caso ela não exista,
        # Se ela existir, em uma proxima requisição vinda do botão de alteração ela não será adicionada
        if not (self.request.GET.get('change')):
            context['change_order'] = 'change=order'
        else:
            # Atualizando a url da requisção atual para seguir a ordem da listagem
            context['url_list_mode'] += '?change=order'

        # Link que o formulário de pesquisa vai ser submetido
        context['link_search'] = reverse('list_of_items:task_list_list')

        context['title'] = self.request.GET.get('title')

        return context

    def get_queryset(self):

        queryset = TaskList.objects.all().select_related()

        # Verificando em que ordem está a listagem
        if self.request.GET.get('change') == 'order':
            queryset = queryset.order_by('-modified')
        else:
            queryset = queryset.order_by('modified')

        # # Verificando se existe filtragem
        title = self.request.GET.get('title')
        if title:
            queryset = queryset.filter(title__istartswith=title)

        return queryset
