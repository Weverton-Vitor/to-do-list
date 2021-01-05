annotations = document.querySelectorAll(".annotation-container-block");
// Mostrando uma anotação de cada vez
annotations.forEach(function (annotation, i) {
  setTimeout(() => (annotation.style.display = "flex"), 100 * i);
});

window.onload = function () {
  truncateAnnotation();
  modifySearchBarToTrash("Annotation");

  // Atualizando os links da sidebar
  link_sidebar_task_list = new URL(window.location).href;  
  localStorage.setItem("link_sidebar_trash", link_sidebar_task_list);
  setLinkSideBar();
};
