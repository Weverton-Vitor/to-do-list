input_change_order = document.querySelector('#change-order')
if (input_change_order) {
  const urlParams = new URLSearchParams(window.location.search);
  const title_search = urlParams.get('title');

  if (title_search) {
    btn_change_order = document.querySelector('#btn-change-order')
    btn_change_order.href += ('&title=' + title_search)
  }

}

function modifySearchBarToTrash(section) {
  // Removendo o botão de detalhes
  edit_btn = document.querySelector('#btn-edit-detail');
  edit_btn.remove();

  // Adapantando o icone de lixeira
  delete_btn = document.querySelector('#icon-trash-detail');
  delete_btn.style.width = '64%';

  // Substituindo o botão de adicionar um novo item
  btn_new = document.querySelector('#new-item-button');
  btn_new.removeChild(btn_new.children[0]);
  if (section == 'task_list') {
    // Botão para a lixeira de anotações
    btn_new.title = 'Lixera de Anotações'
    btn_new.children[0].innerText = 'Anotações'
    btn_new.onclick = function () {
      window.location.replace("/Anotacoes/Lixeira");
    }
  } else {
    // Botão para a lixeira de listas        
    btn_new.title = 'Lixera de Listas'        
    btn_new.children[0].innerText = 'Listas'
    btn_new.onclick = function () {
      window.location.replace("/Listas/Lixeira");
    }
  }


  // Removendo os botões para mudar o modo de listagem
  btn_block = document.querySelector('#block-mode-link');
  btn_block.remove();

  
  btn_list = document.querySelector('#list-mode-link');
  btn_list.remove();
}