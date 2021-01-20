// Pegando o modal
modal_detail_task_list = document.querySelector("#modal-task-list-detail");

// Pegando o elemento  que fecha o modal
task_list_close = document.getElementById("close-modal-detail");

// Pegando todos os corpos das anotações
task_list_body = document.querySelectorAll(".task-list-body");

btn_multiple_exclude_detail = document.querySelector("#btn-delete-selected-items-detail");

// Fechando o modal pelo botão de Fechamento
task_list_close.onclick = function () {
  modal_detail_task_list.style.display = "none";
  clearTaskListItemsDetailModal("list-items-add-item-detail");
};

// botão para deletar mais de um items

for (let i = 0; i < task_list_body.length; i++) {
  task_list_body[i].onclick = showTaskListDetail;
}

btn_multiple_exclude_detail.onclick = postRemoveMultipleItems;

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
        updateTaskListDetailModal(task_list);
      }
    }
  };

  xhr.send();
}

// Função para atualizar o modal de detalhes das anotações
function updateTaskListDetailModal(task_list) {
  task_list_ul = document.querySelector('#task-list-add-item');
  task_list_ul.dataset.taskId = task_list.id

  // Elemento ul que contém os Itens
  task_list_ul = document.querySelector('#task-list-detail');
  task_list_ul.dataset.taskId = task_list.id;

  // Pegando os elementos do modal de detalhes
  title_task_list = document.querySelector("#task-list-title-detail");

  // Setando valores para os elementos do modal de detalhes
  title_task_list.innerText = task_list.title;

  // Mudando o display do modal de detalhes
  modal_detail = document.querySelector("#modal-task-list-detail");
  modal_detail.style.display = "flex";

  // Setando os items da lista
  updateTaskListItemsModal(task_list.items, true);

  // Setando o id em um dataset para edição
  btn_edit_detail = document.querySelector("#btn-edit-detail");
  if (btn_edit_detail != null) {
    btn_edit_detail.dataset.id = task_list.id;
  }

  // Setando o id em um dataset para removeção de vários itens
  btn_multiple_exclude_detail.dataset.id = task_list.id

  // Setando action do formulário para excluir pelo modal de detalhes
  form_task_list_detail = document.querySelector("#form-delete-detail");
  form_task_list_detail.action = "/Listas/Deletar/" + task_list.id;

  // Verificando a ordem de listagem das listas
  if (document.querySelector("#form-create") != null) {
    action_form_create_task_list = document.querySelector("#form-create")
      .action;
    if (action_form_create_task_list.includes("change=order")) {
      form_task_list_detail.action += "?change=order";
    }
  }

}

// Função para atualizar os itens da lista
function updateTaskListItemsModal(items, detail) {
  if (detail) {
    // Itens para o modal de detalhes
    empty_msg = document.querySelector("#empty-msg-list-detail");
    list_item = document.querySelector("#list-items-add-item-detail")
      .childNodes[3];
    template_item = document.querySelector("#template-item-detail");
  } else {
    // Itens para o modal de adição de itens
    empty_msg = document.querySelector("#empty-msg-list");
    list_item = document.querySelector("#list-items-add-item").childNodes[3];
    template_item = document.querySelector("#template-item");
  }

  empty_msg.style.display = "none";

  // Adicionando os itens a lista
  items.forEach((item) => {
    new_item = template_item.cloneNode(true);
    close_button = new_item.childNodes[1].childNodes[3];
    item_id = item[0];
    item_description = item[1];
    checkbox_delete_item = new_item.children[0].children[2];

    // Mudando valor do checkbox para excluir
    checkbox_delete_item.value = item_id;

    // Mudando o id do item
    new_item.id = "item-" + item_id;

    // Alterando a descrição do item
    new_item.childNodes[1].childNodes[1].innerText = item_description;

    new_item.style.display = "block";

    // Só adiciona os dados ao botão caso seja uma tag span
    if (close_button.tagName == "SPAN") {
      // Modificando o id do botão de remover o item
      if (detail) {
        close_button.id = "delete-detail-item-" + item_id;
      } else {
        close_button.id = "delete-item-" + item_id;
      }

      // Adicionando evento para remover o item da lista e do banco de dados
      close_button.dataset.id = item_id;            
      close_button.onclick = postRemoveItem;
    }

    // Adicionando o item
    list_item.appendChild(new_item);


    // Setando evento para selecionar o item
    new_item_div =  new_item.children[0];      
    new_item_p =  new_item_div.children[0];  
    new_item_p.onclick = selectItem;

  });

  // Verificando se a lista está vazia
  if (list_item.childElementCount == 1) {
    if (detail) {
      empty_msg = document.querySelector("#empty-msg-list-detail");
    } else {
      empty_msg = document.querySelector("#empty-msg-list");
    }
    empty_msg.style.display = "block";
  }
}

// Função para para limpar os itens da lista do modal de detalhes
function clearTaskListItemsDetailModal(id_body_add) {
  id_body = "#" + id_body_add;
  list_item = document.querySelector(id_body).childNodes[3];

  while (list_item.lastElementChild) {
    if (
      list_item.lastElementChild.id != "template-item-detail" &&
      list_item.lastElementChild.id != "template-item"
    ) {
      list_item.removeChild(list_item.lastElementChild);
    } else {
      break;
    }
  }
}


function selectItem() {
  if (this.classList.contains('selected-item')) {
        this.style.width = '95%';
        this.classList.remove('selected-item');        
        this.parentElement.children[1].style.display = "block";      
        this.parentElement.children[2].checked = false;
      } else {
        this.classList.add('selected-item');           
        this.style.width = '100%';
        this.parentElement.children[1].style.display = "none";  
        this.parentElement.children[2].checked = true;
      }  
}
