// Pegando o modal
var modal = document.getElementById("modal-new-item");

// Pegando o botão que abre o  modal
var btn = document.getElementById("new-item-button");

// Pegando o elemento span que fecha o modal
var span = document.getElementsByClassName("close-modal-new-item")[0];

// Evento de click no botão que abre o modal
btn.onclick = function () {
  modal.style.display = "block";
};

// Evento de click no span que fecha o modal
span.onclick = function () {
  modal.style.display = "none";
  form = document.querySelector("#form-create");
  clearFormCreate(form); // Função do arquivo modal_box_create

  modal_title = document.querySelector('#title-modal');  
  modal_title.innerText = 'Criar anotação';
  
  modal_btn_form = document.querySelector('#btn-add') ;
  modal_btn_form.innerText = 'Adicionar';
};

// Quando qualquer click fora do modal
window.onclick = function (event) {
  if (event.target == modal) {
    form = document.querySelector("#form-create");
    clearFormCreate(form); // Função do arquivo modal_box_create
    modal_title = document.querySelector('#title-modal');  
    modal_title.innerText = 'Criar anotação';
    
    modal_btn_form = document.querySelector('#btn-add') ;
    modal_btn_form.innerText = 'Adicionar';
  }
};
