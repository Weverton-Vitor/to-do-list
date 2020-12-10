// Setando o modo de listagem padrão
if (localStorage.getItem('listing_mode_list_items_list_items') == null) {
    localStorage.setItem('listing_mode_list_items', 'block')    

    // Setando a classe active-link no link de modo lista
    link = document.querySelector('#block-mode').parentElement
    link.classList.add('active-link')
}

// Mudando o modo de visualização
function change_listing_mode_list_items(mode) {    
    localStorage.setItem('listing_mode_list_items', mode)

    links = document.querySelectorAll('.link-search-bar')
    
    for ( i = 0; i < 2; i++) {
        link = links[i]                     
        if ( link.classList.contains('active-link') ) {
            link.classList.remove('active-link')
        }                        
    }
    
    console.log(this)

    // Escondendo o conteudo e a páginação
    content = document.querySelector('#content')
    content.style.display = 'none'

    pagination = document.querySelectorAll('.container-pagination')[0]
    pagination.style.display ='none'

    location.reload();

}

// if (localStorage.getItem('listing_mode_list_items') == 'block') {
    // Encurtando o conteúdo da anotação para melhorar a visualização
    // descriptions = document.querySelectorAll('.annotation-description')
    // for (let i = 0; i < descriptions.length; i++) {
    //     text = descriptions[i].innerText
    //     if (text.length > 240) {
    //         text = text.slice(0, 240)
    //         descriptions[i].innerText = text + '...'
    //     }}

    // // Removendo a div com visualização em lista
    // container_list = document.querySelectorAll('.annotation-container-list')
    // container_list.forEach(function(container) {
    //     container.remove()
    // })
    
    // // Removendo o link da folhada de estilo da visualização em lista
    // if (!(document.querySelector('#css-list') == null)) {
    //     container_list_css = document.querySelector('#css-list')
    //     container_list_css.remove()
    // }

    // // Setando a classe active-link no link de modo lista
    // link = document.querySelector('#block-mode').parentElement
    // link.classList.add('active-link')
    
// } else {
//     // Encurtando o conteúdo da anotação para melhorar a visualização
//     descriptions = document.querySelectorAll('.annotation-description')
//     for (let i = 0; i < descriptions.length; i++) {
//         text = descriptions[i].innerText
//         if (text.length > 140) {
//             text = text.slice(0, 140)
//             descriptions[i].innerText = text + '...'
//         }
//     }

//     // Removendo a div com visualização em blocos    
//     container_block = document.querySelectorAll('.annotation-container-block')
//     container_block.forEach(function(container) {        
//         container.remove()                    
//     })

//     // Removendo o link da folha de estilo da visualização em block
//     if (!(document.querySelector('#css-block') == null)) {
//         container_block_css = document.querySelector('#css-block')
//         container_block_css.remove()
//     }

//     // Setando a classe active-link no link de modo lista
//     link = document.querySelector('#list-mode').parentElement
//     link.classList.add('active-link')

// }

window.onload = function () {
    // Pegando as anotações 
    annotations = document.querySelectorAll('.task-list-container-block')

    if (annotations.length == 0) {
        annotations = document.querySelectorAll('.task-list-container-list')        
    }
    
    // Mostrando uma anotação de cada vez
    annotations.forEach(function(annotation, i){
        setTimeout(() => annotation.style.display = 'block', 100 * i);
        
    })
 }