input_change_order = document.querySelector('#change-order')
if (input_change_order) {
  const urlParams = new URLSearchParams(window.location.search);
  const title_search = urlParams.get('title');

  if (title_search) {
    btn_change_order = document.querySelector('#btn-change-order')
    btn_change_order.href += ('&title=' + title_search)
  }

}