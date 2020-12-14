// Função para setar os links da barra lateral
function setLinkSideBar(){
    link_sidebar_annotation = document.querySelector('#link-annotations')
    link_sidebar_annotation.href = localStorage.getItem('link_sidebar_annotation')

    link_sidebar_task_list = document.querySelector('#link-task-lists')
    link_sidebar_task_list.href = localStorage.getItem('link_sidebar_task_list')    
}


// Função para preparar o formulário e o para uma nova edição ou criação
function clearFormCreate(id_form, id_modal){
    id_modal = "#" + id_modal
    id_form = "#" + id_form

    form = document.querySelector(id_form)
    form.reset()
    form.onsubmit = 'none'

    modal = document.querySelector(id_modal); 
    modal.style.display = 'none';                
    

}