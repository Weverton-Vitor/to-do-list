// Botões para excluir uma anotação ou lista
btns_remove = document.querySelectorAll(".btn-remove");

// Botão para cancelar a exclusão
btn_cancel = document.querySelector("#btn-cancel");

// Botão para confirmar a exclusão
btn_confirm = document.querySelector("#btn-confirm");


for (let i = 0; i < btns_remove.length; i++) {
  
  btns_remove[i].onclick = function () {
    modal_confirmation = document.querySelector("#modal-confirmation");
    modal_confirmation.style.display = 'flex';

    btn_confirm.onclick = function () {
        form = btns_remove[i].parentElement;
        form.submit();
    }
  }
  
}

btn_cancel.onclick = function () {
    modal_confirmation = document.querySelector("#modal-confirmation");
    modal_confirmation.style.display = 'none';
}
