from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, DeleteView, ListView, UpdateView
from project.apps.list_of_items.forms import ModelFormTaskList, ModelFormTaskListItem
from project.apps.list_of_items.models import TaskList, TaskListItem
import json


class TaskListListView(ListView):
    template_name = 'task_list_list.html'
    model = TaskList
    context_object_name = 'task_lists'
    paginate_by = 8

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['new'] = 'Lista'

        form = ModelFormTaskList()
        context['form'] = form

        form_item = ModelFormTaskListItem()
        context['form_item'] = form_item

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
        context['link_search'] = reverse('list_of_items:task_list_list')

        # Descrição para o botão de alterar a ordem da listagem
        context['title_btn_change'] = 'Alterar ordem de listagem por data de alteração'

        # Mensagem para caso a lista estiver vazia
        context['empty_msg'] = 'Sem Itens'
        title = self.request.GET.get('title')
        if title:
            context['empty_msg'] = f'Sem resultados para {title}'

        return context

    def get_queryset(self):

        queryset = TaskList.objects.filter(is_trash=False).select_related().order_by('-modified')

        # Verificando em que ordem está a listagem
        if self.request.GET.get('change') == 'order':
            queryset = queryset.order_by('modified')

        # Verificando se existe filtragem
        title = self.request.GET.get('title')
        if title:
            queryset = queryset.filter(title__istartswith=title)

        return queryset


class TaskListTrashListView(ListView):
    template_name = 'task_list_trash_list.html'
    model = TaskList
    context_object_name = 'task_lists'
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
        context['link_search'] = reverse('list_of_items:task_list_trash_list')

        # Descrição para o botão de alterar a ordem da listagem
        context['title_btn_change'] = 'Alterar ordem de listagem por data de alteração'

        # Mensagem para caso a lista estiver vazia
        context['empty_msg'] = 'Sem Itens'
        title = self.request.GET.get('title')
        if title:
            context['empty_msg'] = f'Sem resultados para {title}'

        return context

    def get_queryset(self):

        queryset = TaskList.objects.filter(is_trash=True).select_related().order_by('-modified')

        # Verificando em que ordem está a listagem
        if self.request.GET.get('change') == 'order':
            queryset = queryset.order_by('modified')

        # Verificando se existe filtragem
        title = self.request.GET.get('title')
        if title:
            queryset = queryset.filter(title__istartswith=title)        
        return queryset


class TaskListCreateView(CreateView):
    model = TaskList
    form_class = ModelFormTaskList

    def get(self, request, *args, **kwargs):
        # Verificando qual será a ordem da listagem pela QueryString da requisição
        if self.request.GET.get('change'):
            return HttpResponseRedirect(reverse('list_of_items:task_list_list') + '?' + self.request.GET.urlencode())

        return HttpResponseRedirect(reverse('list_of_items:task_list_list'))

    def post(self, request, *args, **kwargs):
        if not self.request.POST:
            data = json.loads(self.request.body)
            form = ModelFormTaskList(data['task_list'])
            if form.is_valid():
                task_list = form.save()
                return JsonResponse({'task_title': task_list.title, 'task_id': task_list.id})

            return JsonResponse({'erro': 'o'}, status=400)
        else:
            form = self.get_form()
            if form.is_valid():
                return self.form_valid(form)
            else:
                return self.form_invalid(form)

    def form_invalid(self, form):
        messages.error(self.request, "Erro ao adicionar")

        # Verificando qual será a ordem da listagem pela QueryString da requisição
        if self.request.GET.get('change'):
            return HttpResponseRedirect(reverse('list_of_items:task_list_list') + '?' + self.request.GET.urlencode())

        return HttpResponseRedirect(reverse('list_of_items:task_list_list'))

    def form_valid(self, form):
        messages.success(self.request, "Sucesso ao adicionar")
        return super().form_valid(form)

    def get_success_url(self):
        # Verificando qual será a ordem da listagem pela QueryString da requisição
        if self.request.GET.get('change'):
            return reverse('list_of_items:task_list_list') + '?change=order'

        return reverse('list_of_items:task_list_list')


class TaskListUpdateView(UpdateView):
    model = TaskList
    form_class = ModelFormTaskList

    def post(self, request, *args, **kwargs):
        task_list = self.get_object()

        # Pegando o conteúdo do json enviado na requisição
        data = json.loads(request.body)
        data = data['task_list']

        # Validando os dados com o Model Form
        form = ModelFormTaskList(data)
        if form.is_valid():
            TaskList.objects.filter(
                pk=task_list.pk).update(**form.cleaned_data)
            task_list = TaskList.objects.get(pk=task_list.pk)
            task_list.save()
            return get_task_list(request, task_list.pk, msg=f'Sucesso ao editar "{task_list.title}"')

        return JsonResponse({'msg': 'Erro ao editar'}, status=400)

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('list_of_items:task_list_edit'))


class TaskListDeleteView(DeleteView):
    model = TaskList
    success_url = reverse_lazy('list_of_items:task_list_list')

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(reverse('list_of_items:task_list_list') + '?' + self.request.GET.urlencode)

    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        success_url = self.get_success_url()

        if self.object.is_trash:
            success = self.object.delete()
            success = success[0]
            if success:
                msg = f'"{self.object.title}" foi excluido em definitivo'
            else:
                msg = f'Erro ao excluir "{self.object.title}"'

        else:
            success = TaskList.objects.filter(
                pk=self.object.pk).update(is_trash=True)

            if success:
                msg = f'Sucesso ao mover "{self.object.title}" para a lixeira'
            else:
                msg = f'Erro ao mover "{self.object.title}" para a lixeira'

        if success:
            messages.success(self.request, msg)
        else:
            messages.error(self.request, msg)

        return HttpResponseRedirect(success_url)

    def get_success_url(self):
        # Verificando qual será a ordem da listagem pela QueryString da requisição
        if self.request.GET.get('change'):
            return reverse('list_of_items:task_list_list') + '?change=order'

        return reverse('list_of_items:task_list_list')


class TaskListItemCreateView(CreateView):
    model = TaskListItem
    form_class = ModelFormTaskList

    def get(self, request, *args, **kwargs):
        # Verificando qual será a ordem da listagem pela QueryString da requisição
        if self.request.GET.get('change'):
            return HttpResponseRedirect(reverse('list_of_items:task_list_list') + '?' + self.request.GET.urlencode())

        return HttpResponseRedirect(reverse('list_of_items:task_list_list'))

    def post(self, request, *args, **kwargs):
        data = json.loads(self.request.body)
        data = data['task_list_item']
        form = ModelFormTaskListItem(data)
        if form.is_valid():
            task_list = TaskList.objects.get(pk=data['task_list'])
            task_list.save()
            item = TaskListItem(task_list=task_list,
                                description=form.cleaned_data['description'])
            item.save()
            return JsonResponse({'id': item.id, 'description': item.description})

        return JsonResponse({'erro': 0}, status=400)


def get_task_list(request, pk, **kwargs):
    task_list = TaskList.objects.select_related().get(pk=pk)
    items = task_list.tasklistitem_set.values_list('id', 'description')
    data = {
        'id': task_list.pk,
        'title': task_list.title,
        'items': list(items)
    }

    data.update(kwargs)
    return JsonResponse({'task_list': data})


def detele_task_list_item(request, pk):
    item = TaskListItem.objects.filter(pk=pk)
    item = item.delete()

    return JsonResponse({'sucess': item[0]})
