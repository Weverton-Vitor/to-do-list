// Mudando o modo de visualização
function change_listing_mode(mode) {
  localStorage.setItem("listing_mode_list_items", mode);

  link = document.querySelectorAll(".active-link")[0];
  link.classList.remove("active-link");

  // Escondendo o conteudo e a páginação
  content = document.querySelector("#content");
  content.style.display = "none";

  pagination = document.querySelectorAll(".container-pagination")[0];
  pagination.style.display = "none";

  location.reload();
}

// Setando o modo de listagem padrão
if (localStorage.getItem("listing_mode_list_items") == null) {
  localStorage.setItem("listing_mode_list_items", "block");

  // Setando a classe active-link no link de modo lista
  link = document.querySelector("#block-mode").parentElement;
  link.classList.add("active-link");
}

// Setando o link padrão para as listas na side bar
if (localStorage.getItem("link_sidebar_task_list") == null) {
  localStorage.setItem("link_sidebar_task_list", "/Listas");
}

if (localStorage.getItem("link_sidebar_annotation") == null) {
  localStorage.setItem("link_sidebar_annotation", "/Anotacoes");
}

window.onload = function () {  
  if (localStorage.getItem("listing_mode_list_items") == "block") {
    // Removendo a div com visualização em lista e a sua folha de estilo
    removeContainer("task-list-container-list", "css-list");

    // Setando a classe active-link no link de modo block
    link = document.querySelector("#block-mode-link");
    link.classList.add("active-link");

    truncateTaskListItemBlockMode();
  } else {
    // Removendo a div com visualização em blocos e a sua folha de estilo
    removeContainer("task-list-container-block", "css-block");

    // Setando a classe active-link no link de modo lista
    link = document.querySelector("#list-mode-link");
    link.classList.add("active-link");

   truncateTaskListItemListMode();
  }
  // Reduzindo o tamanho do titulo da lista
  truncateTaskList();

  // Pegando as anotações
  annotations = document.querySelectorAll(".task-list-container-block");

  if (annotations.length == 0) {
    annotations = document.querySelectorAll(".task-list-container-list");
  }

  // Mostrando uma anotação de cada vez
  annotations.forEach(function (annotation, i) {
    setTimeout(() => (annotation.style.display = "block"), 100 * i);
  });

  // Atualizando os links da sidebar
  link_sidebar_task_list = new URL(window.location).href;
  localStorage.setItem("link_sidebar_task_list", link_sidebar_task_list);
  setLinkSideBar();
};


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
