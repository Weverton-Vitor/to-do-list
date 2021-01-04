annotations = document.querySelectorAll(".annotation-container-block");
// Mostrando uma anotação de cada vez
annotations.forEach(function (annotation, i) {
  setTimeout(() => (annotation.style.display = "flex"), 100 * i);
});

window.onload = function() {
truncateAnnotation();

}