// Botão que apenas criar a lista
btn_add_task_list = document.querySelector("#btn-add");

// Botão que cria a lista e abre o modal para adicionar itens a lista
btn_add_item = document.querySelector("#btn-add-item");

//Botão que adicionar um item a lista via AJAX
btn_add_task_list_item = document.querySelector("#btn-submit-add-item");

// Botão que fecha o modal
btn_close_add_item = document.querySelector("#close-modal-add-item");

//
btns_add_item_option = document.querySelectorAll(".add-item-option");

// Botões que removem um item da lista e do banco de dados
btns_remove_item = document.querySelectorAll(".delete-add-item");

// botão para deletar mais de um items
btn_multiple_exclude = document.querySelector("#btn-delete-selected-items-add-items");

// Evento de envio por AJAX do formulário
if (btn_add_item != null) {
  btn_add_item.onclick = postDataTaskList;
}

// Evento de adicionar um item por AJAX do formulário
if (btn_add_task_list_item) {
  btn_add_task_list_item.onclick = postDataTaskListItem;
}

// Evento para fechar o modal de novos itens
btn_close_add_item.onclick = function () {
  modal_add_item = document.querySelector("#modal-add-item");
  modal_add_item.style.display = "none";
  clearFormCreate("form-add-item", modal_add_item.id);
  clearTaskListItemsModal();
};

for (let i = 0; i < btns_add_item_option.length; i++) {
  btns_add_item_option[i].onclick = function () {
    task_list_id = this.dataset.id;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "Lista/" + task_list_id);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          task_list_data = JSON.parse(xhr.responseText);
          task_list = task_list_data.task_list;
          // mostrando o modal para adicionar itens
          showModalAddItem(task_list.title, task_list.id);

          // Adicionando os item existentes a lista
          updateTaskListItemsModal(task_list.items, false);
        }
      }
    };

    xhr.send();
  };
}

btn_multiple_exclude.onclick = postRemoveMultipleItems;

// Função para cadastrar listas de itens por AJAX
function postDataTaskList() {
  //pegando o token csrf
  token = document.querySelector("[name=csrfmiddlewaretoken]");

  form_task_list = document.querySelector("#form-create");
  title_task_list_input = document.querySelector("#id_title");

  // Checando se o formulário está valido
  if (
    form_task_list.checkValidity() &&
    title_task_list_input.required == true &&
    title_task_list_input.maxLength == 40
  ) {
    let task_list = {
      task_list: {
        title: title_task_list_input.value,
      },
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", form_task_list.action, true);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", token.value);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          response = JSON.parse(xhr.responseText);
          // Limpando o formulário
          clearFormCreate(form_task_list.id, "modal-new-item");

          // Mostrando o modal para adicionar itens
          showModalAddItem(response.task_title, response.task_id);
        } else if (xhr.status == 400) {
          response = JSON.parse(xhr.responseText);
        }
      }
    };

    xhr.send(JSON.stringify(task_list));
  } else {
    title_task_list_input.required = true;
    title_task_list_input.maxLength = 40;
  }
}

// Função para adicionar itens nas listas por AJAX
function postDataTaskListItem() {
  //pegando o token csrf
  token = document.querySelector("[name=csrfmiddlewaretoken]");

  form_task_list_item = document.querySelector("#form-add-item");
  title_task_list_item_input = document.querySelector("#id_description");
  task_id_input = document.querySelector("#task-id");

  // Checando se o formulário está valido
  if (
    form_task_list_item.checkValidity() &&
    title_task_list_item_input.required == true &&
    title_task_list_item_input.maxLength == 50
  ) {
    let task_list_item = {
      task_list_item: {
        task_list: task_id_input.value,
        description: title_task_list_item_input.value,
      },
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", form_task_list_item.action, true);

    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", token.value);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          response = JSON.parse(xhr.responseText);
          // Limpando o formulário
          title_task_list_item_input.value = "";
          addItem(response.description, response.id);
        } else if (xhr.status == 400) {
          response = JSON.parse(xhr.responseText);
        }
      }
    };

    xhr.send(JSON.stringify(task_list_item));
  } else {
    title_task_list_input.required = true;
    title_task_list_input.maxLength = 50;
  }
}

// Função para mostrar o modal de adicão de items
function showModalAddItem(task_title, task_id) {
  // Mostrando o modal de adicionar items
  modal_add_item = document.querySelector("#modal-add-item");
  modal_add_item.style.display = "flex";

  // Mudando o titulo do modal
  add_item_title = document.querySelector("#add-item-title");
  add_item_title.innerText = 'Adicionar items a "' + task_title + '"';

  // Setando o id da nova lista que vai receber items
  task_id_input = document.querySelector("#task-id");
  task_id_input.value = task_id;

  // Setando o id da lista no dataset do botão
  btn_delete_selected_items = document.querySelector('#btn-delete-selected-items-add-items');
  btn_delete_selected_items.dataset.id = task_id;

  // Elemento ul que contém os itens
  task_list_ul = document.querySelector('#task-list-add-item');
  task_list_ul.dataset.taskId = task_id;

}

// Função para adicionar os novos itens em uma lista para visualização do usuário
function addItem(item_description, item_id) {
  empty_msg = document.querySelector("#empty-msg-list");
  list_item = document.querySelector("#list-items-add-item").childNodes[3];
  template_item = document.querySelector("#template-item");
  new_item = template_item.cloneNode(true);
  close_button = new_item.childNodes[1].childNodes[3];
  input_select = new_item.childNodes[1].childNodes[5];  

  empty_msg.style.display = "none";

  // Mudando o id do item
  new_item.id = "item-" + item_id;

  // Alterando a descrição do item
  new_item.childNodes[1].childNodes[1].innerText = item_description;

  new_item.style.display = "block";

  // Modificando o botão de remover o item
  // E adicionando evento para remover o item da lista e do banco de dados
  close_button.id = "delete-add-item-" + item_id;
  close_button.dataset.id = item_id;

  // Setando o id da lista no botão para remover um item,
  // para atualizar a data da de edição da lista
  task_id_input = document.querySelector("#task-id");
  close_button.dataset.taskId = task_id_input.value;  
  close_button.onclick = postRemoveItem;

  // Setando evente para selecionar o item
  text_item = new_item.children[0].children[0];  
  text_item.onclick = selectItem;

  // Setando o valor do input do item 
  // para excluir mais de um item
  input_select.value = item_id;

  // Adicionando o item
  list_item.appendChild(new_item);
}

// Função para para limpar os itens da lista do modal de criação
function clearTaskListItemsModal() {
  list_item = document.querySelector("#list-items-add-item");
  ul = list_item.childNodes[3];

  // Função de task_list_detail.js
  clearTaskListItemsDetailModal(list_item.id);

  // Verificando se a lista está vazia
  if (ul.childElementCount == 1) {
    empty_msg = document.querySelector("#empty-msg-list");
    empty_msg.style.display = "block";
  }
}

// Função para remover um item do modal e no banco de dados
function postRemoveItem() {
  id = this.dataset.id;

  task_list_ul = document.querySelector('#task-list-add-item');
  token = document.querySelector("[name=csrfmiddlewaretoken]");

  // id do item e id da lista
  let item = {
    ids: [id],
    task_list_id: task_list_ul.dataset.taskId
  };  

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/Listas/Deletar/Item/" + id, true);

  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", token.value);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        item = this.parentElement.parentElement;

        // Testando se a lista está vazia e mostrando a mensagem de lista vazia
        if (item.parentElement.childElementCount - 1 == 1) {
          if (item.parentElement.parentElement.id.includes("detail")) {
            empty_msg = document.querySelector("#empty-msg-list-detail");
            empty_msg.style.display = "block";
          } else {
            empty_msg = document.querySelector("#empty-msg-list");
            empty_msg.style.display = "block";
          }
        }

        // Removendo o item(<li>)
        item.remove();

        // Removendo o item da lista na listagem geral
        overview_item = document.getElementById("item-" + this.dataset.id);
        if (overview_item != null) {
          overview_item.remove();
        }
      } else if (xhr.status == 400) {
      }
    }
  };

  xhr.send(JSON.stringify(item));
}

// Função para coletar os ids dos items que serão deletados
function postRemoveMultipleItems() {  
  task_list_ul = document.querySelector('#task-list-add-item');  
  inputs_id = document.querySelectorAll("[name=items]");
  inputs_checked = [];

  let items = {
    ids: [],
    task_list_id: task_list_ul.dataset.taskId
  };  

  // Pegando o id dos item selecionandos e agrupandos os itens selecionados
  inputs_id.forEach((input) => {
    if (input.checked) {
      id = input.value;
      items.ids.push(id);
      inputs_checked.push(input);
    }
  });

  token = document.querySelector("[name=csrfmiddlewaretoken]");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/Listas/Deletar/Item/" + items.ids[0], true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", token.value);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        response = JSON.parse(xhr.responseText);

        // Removendo os itens que foram excluidos
        inputs_checked.forEach((input) => {
          item = input.parentElement.parentElement;
          // Testando se a lista está vazia e mostrando a mensagem de lista vazia
          if (item.parentElement.childElementCount - 1 == 1) {
            if (item.parentElement.parentElement.id.includes("detail")) {
              empty_msg = document.querySelector("#empty-msg-list-detail");
              empty_msg.style.display = "block";
            } else {
              empty_msg = document.querySelector("#empty-msg-list");
              empty_msg.style.display = "block";
            }
          }

          item.remove();

          // Removendo o item da lista na listagem geral
          overview_item = document.getElementById("item-" + input.value);
          if (overview_item != null) {
            overview_item.remove();
          }
        });
      } else if (xhr.status == 400) {
        response = JSON.parse(xhr.responseText);
      }
    }
  };

  xhr.send(JSON.stringify(items));
}
