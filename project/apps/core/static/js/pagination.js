links_pagination = document.querySelectorAll('.page-link');
block_mode_link = document.querySelector('#block-mode-link');
if (block_mode_link.href.includes("change=order")) {
  links_pagination.forEach(link => {
    link.href = link.href + '&change=order'
  }) 
}