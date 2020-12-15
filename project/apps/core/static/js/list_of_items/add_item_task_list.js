// Formulário para criação da lita de tarefas
form_task_list = document.querySelector("#form-create");

form_task_list.onsubmit = () => {
  return false;
};

// Botão que apenas criar a lista
btn_add_task_list = document.querySelector("#btn-add");

// Botão que cria a lista e abre o modal para adicionar itens a lista
btn_add_item = document.querySelector("#btn-add-item");

btn_add_task_list.onclick = function () {
  form_task_list.submit();
};

btn_add_item.onclick = post_data_task_list

function post_data_task_list() {
  //pegando o token csrf
  token = document.querySelector("[name=csrfmiddlewaretoken]");

  form_task_list = document.querySelector("#form-create");

  let task_list = {
    task_list: {
      title: document.querySelector("#id_title").value,
    }
  };

  let xhr = new XMLHttpRequest();  
  xhr.open("POST", form_task_list.action, true);

  xhr.setRequestHeader("Content-type", "application/json");
  xhr.setRequestHeader("X-CSRFToken", token.value);

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        response = JSON.parse(xhr.responseText);        
      } else if (xhr.status == 400) {
        response = JSON.parse(xhr.responseText);
      }
    }
  };

  xhr.send(JSON.stringify(task_list));

}
