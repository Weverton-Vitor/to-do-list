// Adicionando um evento de click nos botões de edição
btns = document.querySelectorAll(".btn-edit");

for (let i = 0; i < btns.length; i++) {
  btns[i].onclick = get_data_task_list;
}

// Função para que busca os dados da lista de tarefas
function get_data_task_list() {
  // Buscando os dados da anotação
  task_list_id = this.dataset.id;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "Lista/" + task_list_id);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        task_list_data = JSON.parse(xhr.responseText);
        task_list = task_list_data.task_list;
        change_modal_task_list(task_list.title, task_list.id);
      }
    }
  };

  xhr.send();
}

// Função para editar a anotação sem recarregar a página
function post_data_edit_task_list() {
  const btn = document.querySelector("#btn-add");
  const task_list_id = btn.dataset.id;
  //pegando o token csrf
  token = document.querySelector("[name=csrfmiddlewaretoken]");

  form_task_list = document.querySelector("#form-create");
  title_task_list_input = document.querySelector("#id_title");
  btn_add_item = document.querySelector("#btn-add-item");  

  // Checando se o formulário está valido
  if (
    form_task_list.checkValidity() &&
    title_task_list_input.required == true &&
    title_task_list_input.maxLength == 40
  ) {
    let task_list = {
      task_list: {
        id: task_list_id,
        title: title_task_list_input.value,
      },
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/Listas/Editar/" + task_list_id, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", token.value);

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          new_task_list = JSON.parse(xhr.responseText);
          new_task_list = new_task_list.task_list;

          // Limpando o formulário
          clearFormCreate(this.id, "modal-new-item");
          btn_add_item.style.display = "flex";

          // Atualizando o titulo da lista
          updateTaskList(new_task_list);

          // Setando a mensagem de sucesso
          setMessage(new_task_list.msg, 0);

        // Reduzindo o tamanho do titulo da lista         
         truncateTaskList()
        } else if (xhr.status == 400) {
          response = JSON.parse(xhr.responseText);

          // Limpando o formulário
          clearFormCreate(this.id, "modal-new-item");
          btn_add_item.style.display = "flex";

          // Setando as propiedades da validação do formulário
          this[1].required = true;
          this[1].maxLength = "60";

          // Setando a mensagem de falha
          setMessage(response.msg, 1);
        }
      }
    };

    xhr.send(JSON.stringify(task_list));
  } else {
    title_task_list_input.required = true;
    title_task_list_input.maxLength = 40;
  }

  // Não submete o formulário
  return false;
}

// Função para adaptar o modal de criação para edição
function change_modal_task_list(task_list_title, task_list_id) {
  // Adicionando evento no formulário para atualização da lista de tarefas
  form = document.querySelector("#form-create");
  form.onsubmit = post_data_edit_task_list;

  btn_add_item = document.querySelector("#btn-add-item");
  btn_add_item.style.display = "none";

  // Colocando os valores no formulário do modal
  input_title = document.querySelector("#id_title");
  input_title.value = task_list_title;

  // Adapatando o modal de criação para edição
  modal = document.querySelector("#modal-new-item");

  modal_title = document.querySelector("#title-modal");
  modal_title.innerText = "Editar anotação";

  modal_btn_form = document.querySelector("#btn-add");
  modal_btn_form.innerText = "Editar";

  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";

  // Adicionando evento de edição ao botão do formulário
  btn = document.querySelector("#btn-add");
  btn.dataset.id = task_list_id;

  // Fechando o modal de detalhes
  modal_detail_task_list = document.querySelector("#modal-task-list-detail");
  modal_detail_task_list.style.display = "none";
}

// Função para atualizar os dados da lista no html
function updateTaskList(task_list) {
  title_task_list = document.querySelector("#task-list-title-" + task_list.id);

  // Encurtando o titulo da lista para melhorar a visualização
  title = task_list.title;
  if (title.length > 12) {
    title = title.slice(0, 10) + "...";
  }

  title_task_list.innerText = title;
}
