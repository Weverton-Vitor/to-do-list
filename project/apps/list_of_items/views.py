from django.contrib import messages
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import DeleteView, ListView
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


class TaskListDeleteView(DeleteView):
    model = TaskList
    success_url = reverse_lazy('list_of_items:task_list_list')

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('list_of_items:task_list_list') + '?' + self.request.GET.urlencode)       

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
            return reverse('list_of_items:task_list_list') + '?change=order'

        return reverse('list_of_items:task_list_list')
