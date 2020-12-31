function truncateTaskListItemBlockMode() {
  items = document.querySelectorAll(".item-description");

  items.forEach((item) => {
    text = item.innerText;
    if (text.length > 20) {
      text = text.slice(0, 25);
    }
    item.innerText = text;
  });
}

function truncateTaskListItemListMode() {
  listas = document.querySelectorAll(".list-item-description");

  listas.forEach((lista) => {
    text = "";    
    for (let i = 0; i < lista.children.length; i++) {
      text += lista.children[i].innerText;
    }

    while (text.length > 121) {      
      text = "";       

      for (let i = 0; i < lista.children.length; i++) {
        text += lista.children[i].innerText;
      }                    

      if (text.length > 121) {                
        lista.removeChild(lista.lastElementChild);

      }      
    }

  });
}
