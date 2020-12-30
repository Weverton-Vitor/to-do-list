// Setando o modo de listagem padrão
if (localStorage.getItem("listing_mode") == null) {
  localStorage.setItem("listing_mode", "block");

  // Setando a classe active-link no link de modo lista
  link = document.querySelector("#block-mode").parentElement;
  link.classList.add("active-link");
}

// Setando o link padrão para as anotações na side bar
if (localStorage.getItem("link_sidebar_annotation") == null) {
  localStorage.setItem("link_sidebar_annotation", "/Anotacoes");
}

window.onload = function () {  
  if (localStorage.getItem("listing_mode") == "block") {
    truncateAnnotation();

    // Removendo a div com visualização em lista e a sua folha de estilo
    removeContainer("annotation-container-list", "css-list");

    // Setando a classe active-link no link de modo block
    link = document.querySelector("#block-mode-link");
    link.classList.add("active-link");
  } else {
    truncateAnnotation();

    // Removendo a div com visualização em blocos e a sua folha de estilo
    removeContainer("annotation-container-block", "css-block");

    // Setando a classe active-link no link de modo lista
    link = document.querySelector("#list-mode-link");
    link.classList.add("active-link");
  }

  // Pegando as anotações
  annotations = document.querySelectorAll(".annotation-container-block");

  if (annotations.length == 0) {
    annotations = document.querySelectorAll(".annotation-container-list");
  }

  // Mostrando uma anotação de cada vez
  annotations.forEach(function (annotation, i) {
    setTimeout(() => (annotation.style.display = "flex"), 100 * i);
  });

  // Atualizando os links da sidebar
  link_sidebar_annotation = new URL(window.location).href;
  localStorage.setItem("link_sidebar_annotation", link_sidebar_annotation);  
  setLinkSideBar();
};

// Função para mudar o modo de visualização
function change_listing_mode(mode) {
  localStorage.setItem("listing_mode", mode);

  link = document.querySelectorAll(".active-link")[0];
  link.classList.remove("active-link");

  // Escondendo o conteudo e a páginação
  content = document.querySelector("#content");
  content.style.display = "none";

  pagination = document.querySelectorAll(".container-pagination")[0];
  pagination.style.display = "none";

  location.reload();
}

// Função para truncar o title e a descrição da anotação
function truncateAnnotation() {
  if (localStorage.getItem("listing_mode") == "block") {
    max_length_description = 240;
    max_length_title = 15;
  } else {
    max_length_description = 140;
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

