// Mudando o modo de visualização
function change_listing_mode(mode) {
  localStorage.setItem("listing_mode_list_items", mode);

  links = document.querySelectorAll(".link-search-bar");

  for (i = 0; i < 2; i++) {
    link = links[i];
    if (link.classList.contains("active-link")) {
      link.classList.remove("active-link");
    }
  }

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

if (localStorage.getItem("listing_mode_list_items") == "block") {
  // Removendo a div com visualização em lista
  container_list = document.querySelectorAll(".task-list-container-list");
  container_list.forEach(function (container) {
    container.remove();
  });

  // Removendo o link da folhada de estilo da visualização em lista
  if (!(document.querySelector("#css-list") == null)) {
    container_list_css = document.querySelector("#css-list");
    container_list_css.remove();
  }

  // Setando a classe active-link no link de modo lista
  link = document.querySelector("#block-mode").parentElement;
  link.classList.add("active-link");

} else {  
  // Removendo a div com visualização em blocos
  container_block = document.querySelectorAll(".task-list-container-block");
  container_block.forEach(function (container) {
    container.remove();
  });

  // Removendo o link da folha de estilo da visualização em block
  if (!(document.querySelector("#css-block") == null)) {
    container_block_css = document.querySelector("#css-block");
    container_block_css.remove();
  }

  // Setando a classe active-link no link de modo lista
  link = document.querySelector("#list-mode").parentElement;
  link.classList.add("active-link");
}

window.onload = function () {
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
