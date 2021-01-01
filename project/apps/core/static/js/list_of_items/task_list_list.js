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
    text_length = 0
    list_length = lista.children.length;  

    for (let i = 0; i < list_length; i++) {
      item = lista.children[i];
      text_length += item.innerText.length;
    
    }

    for (let i = 0; i < list_length; i++) {
      item = lista.children[i];
      text = item.innerText
      if (list_length > 2) {     
        if (text_length > 95) {
          text = text.slice(0, (95/list_length)-3);
          item.innerText = text + '...';
        }       

      } 
    }   

  });
}
