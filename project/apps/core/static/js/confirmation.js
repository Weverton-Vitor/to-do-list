// Modal de confirmação
modal_confirmation = document.querySelector("#modal-confirmation");

// Messagem do modal
msg_confirmation = document.querySelector("#msg-confirmation");

// Botões para excluir uma anotação ou lista
btns_remove = document.querySelectorAll(".btn-remove");

// Botão para cancelar a exclusão
btn_cancel = document.querySelector("#btn-cancel");

// Botão para confirmar a exclusão
btn_confirm = document.querySelector("#btn-confirm");

// Botão para limpar a lixera inteira
btn_clear_trash = document.querySelector("#btn-clear-trash");

// Evento de click nos botões de exclusão
for (let i = 0; i < btns_remove.length; i++) {
  
  btns_remove[i].onclick = function () {
    modal_confirmation.style.display = 'flex';
    msg_confirmation.innerText = 'Deseja excluir este item permanentemente';

    // Setando a submissão do formulário para o botão de confirmação
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

btn_clear_trash.onclick = function () {
  modal_confirmation.style.display = 'flex';
  msg_confirmation.innerText = 'Dejesa excluir todos os itens da lixeira';

  // Setando a submissão do formulário para excluir todos para o botão de confirmação
  btn_confirm.onclick = function () {
    form = document.querySelector("#form-clear-trash");
    form.submit();
}
}