task_lists = document.querySelectorAll(".task-list-container-block");

// Mostrando uma lista de cada vez
task_lists.forEach(function (task_list, i) {
  setTimeout(() => (task_list.style.display = "block"), 100 * i);
});

window.onload = function() {
    truncateTaskList();
    truncateTaskListItemBlockMode();

    // Removendo os botões para deletar itens da lista
    delete_add_item = document.querySelectorAll('.delete-add-item');
    delete_add_item.forEach(function (delete_btn) {
      delete_btn.remove();
    });

    modifySearchBarToTrash('task_list');

    // Atualizando os links da sidebar
    link_sidebar_task_list = new URL(window.location).href;  
    localStorage.setItem("link_sidebar_trash", link_sidebar_task_list);
    setLinkSideBar();
}
