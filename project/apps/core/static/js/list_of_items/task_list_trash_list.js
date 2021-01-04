task_lists = document.querySelectorAll(".task-list-container-block");

// Mostrando uma lista de cada vez
task_lists.forEach(function (task_list, i) {
  setTimeout(() => (task_list.style.display = "block"), 100 * i);
});

window.onload = function() {
    truncateTaskList();
    truncateTaskListItemBlockMode();

    delete_add_item = document.querySelectorAll('.delete-add-item');
    delete_add_item.forEach(function (delete_btn) {
      delete_btn.remove();
    });

    edit_btn = document.querySelector('#btn-edit-detail');
    edit_btn.remove();

    delete_btn = document.querySelector('#icon-trash-detail')
    delete_btn.style.width = '64%'

}