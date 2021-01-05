import json
from django.contrib import messages
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.views.generic import UpdateView, DeleteView
from django.views.generic.base import RedirectView


class Index(RedirectView):
    pattern_name = 'annotations:annotation_list'


class TrashUpdateView(UpdateView):
    type_of = ''

    def post(self, request, *args, **kwargs):
        obj = self.get_object()
        is_ajax = request.META.get('CONTENT_TYPE') == 'application/json'

        # Requisição AJAX para edição
        if is_ajax:
            # Pegando o conteúdo do json enviado na requisição
            data = json.loads(request.body)
            if self.get_type_obj() == 'annotation':                
                data = data['annotation']
            else:
                data = data['task_list']

            # Validando os dados com o Model Form
            form = sefl.form_class(data)
            if form.is_valid():
                msg = f'Sucesso ao editar "{obj.title}"'
                self.model.objects.filter(pk=obj.pk).update(**form.cleaned_data)
                obj = self.model.objects.get(pk=obj.pk)
                obj.save()
                if self.get_type_obj() == 'annotation':                                
                    return get_annotation(request, obj.pk, msg=msg)
                else:
                    return get_task_list(request, obj.pk, msg=msg)                    

            return JsonResponse({'msg': 'Erro ao editar'}, status=400)

        # Restauração de um objeto
        if 'restore' in request.POST.keys():
            url = self.success_url
            if self.request.GET.get('change'):
                return HttpResponseRedirect(url + '?change=order')

            success = self.model.objects.filter(pk=obj.pk).update(is_trash=False)
            if success:
                messages.success(self.request, f'Sucesso ao restaurar "{obj.title}"')
                return HttpResponseRedirect(url)

            messages.error(self.request, f'Erro ao restaurar "{obj.title}"')
            return HttpResponseRedirect(url)
        else:
            return self.get(request, *args, **kwargs)

    def get_type_obj(self):
        return self.type_obj

class TrashDeleteView(DeleteView):
    trash_url = ''
    
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
            success = self.model.objects.filter(
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
                return self.trash_url + '?change=order'

            return self.trash_url
        else:
            # Verificando qual será a ordem da listagem pela QueryString da requisição
            if self.request.GET.get('change'):
                return self.success_url + '?change=order'

            return self.success_url