// Link padrão da sidebar para anotações
if (localStorage.getItem("link_sidebar_annotation") == null) {
    localStorage.setItem("link_sidebar_annotation", "/Anotacoes");
}

// Link padrão da sidebar para listas
if (localStorage.getItem("link_sidebar_task_lists") == null) {
    localStorage.setItem("link_sidebar_task_list", "/Listas");
}

//Link padrão par a Lixeira
if (localStorage.getItem("link_sidebar_trash") == null) {
  localStorage.setItem("link_sidebar_trash", "/Anotacoes/Lixeira");
}

// Função para setar os links da barra lateral
function setLinkSideBar() {
  link_sidebar_annotation = document.querySelector("#link-annotations");
  link_sidebar_annotation.href = localStorage.getItem("link_sidebar_annotation");

  link_sidebar_task_list = document.querySelector("#link-task-lists");
  link_sidebar_task_list.href = localStorage.getItem("link_sidebar_task_list");

  link_sidebar_task_list = document.querySelector("#link-trash");
  link_sidebar_task_list.href = localStorage.getItem("link_sidebar_trash");
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

// Função para setar a mensagem de sucesso ou falha na edição
function setMessage(msg, erro) {
  messages = document.querySelector(".messages");
  if (erro == 1) {
    mesages.innerHTML =
      '<p id="notification-message" class="error">' + msg + "</p>";
  } else {
    mesages.innerHTML =
      '<p id="notification-message" class="success">' + msg + "</p>";
  }

  showMessage();
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

// Função para truncar o title e a descrição da anotação
function truncateAnnotation() {
  if (localStorage.getItem("listing_mode") == "block") {
    max_length_description = 214;
    max_length_title = 13;
  } else {
    max_length_description = 120;
    max_length_title = 13;
  }

  descriptions = document.querySelectorAll(".annotation-description");
  for (let i = 0; i < descriptions.length; i++) {
    text = descriptions[i].innerText;
    if (text.length > max_length_description) {      
      text = text.slice(0, max_length_description);
      descriptions[i].innerText = text + "...";      
    }    
  }

  titles = document.querySelectorAll(".annotation-title");
  for (let i = 0; i < titles.length; i++) {
    title = titles[i].innerText;
    if (title.length > max_length_title) {
      title = title.slice(0, max_length_title);
      titles[i].innerText = title + '...';
    }
    
  }
}

// Função para truncar o title e a descrição da anotação
function truncateTaskList() {
  
  max_length_title = 10;

  titles = document.querySelectorAll(".task-list-title");
  for (let i = 0; i < titles.length; i++) {
    title = titles[i].innerText;
    if (title.length > max_length_title) {
      title = title.slice(0, max_length_title);
      titles[i].innerText = title + '...';
    }
    
  }
}