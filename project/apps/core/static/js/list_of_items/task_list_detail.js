// Pegando o modal
modal_detail_task_list = document.querySelector("#modal-task-list-detail");

// Pegando o elemento  que fecha o modal
task_list_close = document.getElementById("close-modal-detail");

// Pegando todos os corpos das anotações
task_list_body = document.querySelectorAll(".task-list-body");

// Fechando o modal pelo botão de Fechamento
task_list_close.onclick = function () {
  modal_detail_task_list.style.display = "none";
  clearTaskListItemsDetailModal();
};

for (let i = 0; i < task_list_body.length; i++) {
  task_list_body[i].onclick = showTaskListDetail;
}

// Função para que busca os dados da lista de tarefas
function showTaskListDetail() {
  // Buscando os dados da anotação
  task_list_id = this.dataset.id;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "Lista/" + task_list_id);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        task_list_data = JSON.parse(xhr.responseText);
        task_list = task_list_data.task_list;
        clearTaskListItemsDetailModal();
        updateTaskListDetailModal(task_list);
      }
    }
  };

  xhr.send();
}

// Função para atualizar o modal de detalhes das anotações
function updateTaskListDetailModal(task_list) {
  // Pegando os elementos do modal de detalhes
  title_task_list = document.querySelector("#task-list-title-detail");

  // Setando valores para os elementos do modal de detalhes
  title_task_list.innerText = task_list.title;

  // Mudando o display do modal de detalhes
  modal_detail = document.querySelector("#modal-task-list-detail");
  modal_detail.style.display = "flex";

  // Setando os items da lista
  updateTaskListItemsDetailModal(task_list.items);

  // Setando o id em um dataset para edição
  btn_edit_detail = document.querySelector("#btn-edit-detail");
  btn_edit_detail.dataset.id = task_list.id;

  // Setando action do formulário para excluir pelo modal de detalhes
  form_task_list_detail = document.querySelector("#form-delete-detail");
  form_task_list_detail.action = "/Anotacoes/Deletar/" + task_list.id;

  // Verificando a ordem de listagem das listas
  action_form_create_task_list = document.querySelector("#form-create").action;
  if (action_form_create_task_list.includes("change=order")) {
    form_task_list_detail.action += "?change=order";
  }
}

// Função para atualizar os itens da lista
function updateTaskListItemsDetailModal(items) {
  empty_msg = document.querySelector("#empty-msg-list-detail");
  list_item = document.querySelector("#list-items-add-item-detail")
    .childNodes[3];
  template_item = document.querySelector("#template-item-detail");

  empty_msg.style.display = "none";

  // Adicionando os itens a lista
  items.forEach((item) => {
    new_item = template_item.cloneNode(true);
    item_id = item[0];
    item_description = item[1];

    // Mudando o id do item
    new_item.id = "item-" + item_id;

    // Alterando a descrição do item
    new_item.childNodes[1].childNodes[1].innerText = item_description;

    new_item.style.display = "block";

    // Modificando o botão de remover o item
    new_item.childNodes[1].childNodes[3].id = "delete-detail-item-" + item_id;
    new_item.childNodes[1].childNodes[3].dataset.id = item_id;

    // Adicionando o item
    list_item.appendChild(new_item);
  });

  // Verificando se a lista está vazia
  if (list_item.childElementCount == 1) {
    empty_msg = document.querySelector("#empty-msg-list-detail");
    empty_msg.style.display = "block";    
  }
}

// Função para para limpar os itens da lista
function clearTaskListItemsDetailModal() {
  list_item = document.querySelector("#list-items-add-item-detail").childNodes[3];
  
  while (list_item.lastElementChild) {
    if (list_item.lastElementChild.id != "template-item-detail") {
      list_item.removeChild(list_item.lastElementChild);
    } else {
      break;
    }
  }
}
