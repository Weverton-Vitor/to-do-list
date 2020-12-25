// Pegando o modal
modal_detail_task_list = document.querySelector("#modal-task-list-detail");

// Pegando o elemento  que fecha o modal
task_list_close = document.getElementById("close-modal-detail");

// Pegando todos os corpos das anotações
task_list_body = document.querySelectorAll(".task-list-body");

// Fechando o modal pelo botão de Fechamento
task_list_close.onclick = function () {
  modal_detail_task_list.style.display = "none";
};