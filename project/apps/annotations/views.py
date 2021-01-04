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
        context['empty_msg'] = 'Sem Itens'
        title = self.request.GET.get('title')
        if title:
            context['empty_msg'] = f'Sem resultados para {title}'

        return context

    def get_queryset(self):
        queryset = Annotation.objects.filter(
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
        context['new'] = 'Anotação'

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
        context['empty_msg'] = 'Sem Itens'
        title = self.request.GET.get('title')
        if title:
            context['empty_msg'] = f'Sem resultados para {title}'

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


class AnnotationUpdateView(UpdateView):
    model = Annotation
    form_class = ModelFormAnnotation
    success_url = reverse_lazy('annotations:annotation_list')

    def post(self, request, *args, **kwargs):
        annotation = self.get_object()
        is_ajax = request.META.get('CONTENT_TYPE') == 'application/json'

        # Requisição AJAX para edição
        if is_ajax:
            # Pegando o conteúdo do json enviado na requisição
            data = json.loads(request.body)
            data = data['annotation']

            # Validando os dados com o Model Form
            form = ModelFormAnnotation(data)
            if form.is_valid():
                Annotation.objects.filter(
                    pk=annotation.pk).update(**form.cleaned_data)
                annotation = Annotation.objects.get(pk=annotation.pk)
                annotation.save()
                return get_annotation(request, annotation.pk, msg=f'Sucesso ao editar "{annotation.title}"')

            return JsonResponse({'msg': 'Erro ao editar'}, status=400)

        # Restauração de uma anotação
        if 'restore' in request.POST.keys():
            url = reverse('annotations:annotation_trash_list')
            if self.request.GET.get('change'):
                return HttpResponseRedirect(url + '?change=order')

            success = Annotation.objects.filter(
                pk=annotation.pk).update(is_trash=False)
            print(success)
            if success:
                messages.success(
                    self.request, f'Sucesso ao restaurar "{annotation.title}"')
                return HttpResponseRedirect(url)

            messages.error(
                self.request, f'Erro ao restaurar "{annotation.title}"')
            return HttpResponseRedirect(url)
        else:
            return self.get(request, *args, **kwargs)

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

        if self.object.is_trash:
            success = self.object.delete()
            success = success[0]
            if success:
                msg = f'"{self.object.title}" foi excluido em definitivo'
            else:
                msg = f'Erro ao excluir "{self.object.title}"'

        else:
            success = Annotation.objects.filter(
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
        if self.object.is_trash:
            # Verificando qual será a ordem da listagem pela QueryString da requisição
            if self.request.GET.get('change'):
                return reverse('annotations:annotation_trash_list') + '?change=order'

            return reverse('annotations:annotation_trash_list')
        else:
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
