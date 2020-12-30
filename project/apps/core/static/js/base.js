// Link padrão da sidebar para anotações
if (localStorage.getItem("link_sidebar_annotation") == null) {
    localStorage.setItem("link_sidebar_annotation", "/Anotacoes");
}

// Link padrão da sidebar para listas
if (localStorage.getItem("link_sidebar_task_lists") == null) {
    localStorage.setItem("link_sidebar_task_list", "/Listas");
}

// Função para setar os links da barra lateral
function setLinkSideBar() {
  link_sidebar_annotation = document.querySelector("#link-annotations");
  link_sidebar_annotation.href = localStorage.getItem(
    "link_sidebar_annotation"
  );

  link_sidebar_task_list = document.querySelector("#link-task-lists");
  link_sidebar_task_list.href = localStorage.getItem("link_sidebar_task_list");
}

// Função para preparar o formulário e o para uma nova edição ou criação
function clearFormCreate(id_form, id_modal) {
  id_modal = "#" + id_modal;
  id_form = "#" + id_form;

  form = document.querySelector(id_form);
  modal = document.querySelector(id_modal);

  if (form != null) {
    form.reset();
    form.onsubmit = "none";
  }

  if (modal != null) {
    modal.style.display = "none";
  }
}

// Função para remover um modo de visualização da Annotaiton ou Task List e sua folha de estilo
function removeContainer(class_container, css_id) {
  container = document.querySelectorAll("." + class_container);
  container.forEach(function (container) {    
    container.remove();
  });

  // Removendo o link da folha de estilo da visualização em block
  if (!(document.querySelector("#" + css_id) == null)) {
    container_css = document.querySelector("#" + css_id);
    container_css.remove();
  }
}
