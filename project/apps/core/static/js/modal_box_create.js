// Pegando o modal
var modal_create = document.getElementById("modal-new-item");

// Pegando o botão que abre o  modal
var btn_open = document.getElementById("new-item-button");

// Pegando o elemento span que fecha o modal
var span_create = document.getElementsByClassName("close-modal-new-item")[0];

// Evento de click no botão que abre o modal
btn_open.onclick = function () {
  modal_create.style.display = "block";
};

// Evento de click no span que fecha o modal
span_create.onclick = function () {    
  clearFormCreate('form-create', 'modal-new-item'); // Função do arquivo base.js

  modal_title = document.querySelector('#title-modal');  
  modal_title.innerText = 'Criar anotação';
  
  modal_btn_form = document.querySelector('#btn-add') ;
  modal_btn_form.innerText = 'Adicionar';
};

// Qualquer click fora do modal
window.onclick = function (event) {
  if (event.target == modal_create) {    
    clearFormCreate('form-create', 'modal-new-item'); // Função do arquivo base.js
    modal_title = document.querySelector('#title-modal');  
    modal_title.innerText = 'Criar anotação';
    
    modal_btn_form = document.querySelector('#btn-add') ;
    modal_btn_form.innerText = 'Adicionar';
  }
};

function setTextBtnAndTitle(){
  
}
