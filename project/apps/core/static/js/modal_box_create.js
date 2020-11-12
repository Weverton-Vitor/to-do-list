// Pegando o modal
var modal = document.getElementById('modal-new-item')

// Pegando o botão que abre o  modal
var btn = document.getElementById('new-item-button')

// Pegando o elemento span que fecha o modal
var span = document.getElementsByClassName("close-modal-new-item")[0];

// Evento de click no botão que abre o modal
btn.onclick = function() {
    modal.style.display = "block";
  }

// Evento de click no span que fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando qualquer click fora do modal
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
