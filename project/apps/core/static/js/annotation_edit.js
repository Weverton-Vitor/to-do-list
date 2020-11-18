// Adicionando um evento de click nos botões de edição
btns = document.querySelectorAll(".btn-edit");

for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = get_data_edit
}


// Função para pegar os dados da anotação com AJAX 
function get_data_edit (){
    const annotation_id = this.dataset.id    

    let xhr = new XMLHttpRequest();    
    xhr.open('GET', 'http://127.0.0.1:8000/Anotacoes/Anotacao/' + annotation_id);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                annotation_data = JSON.parse(xhr.responseText);                
                change_modal(annotation_data.annotation, annotation_id);                
            }
        }
    };

    xhr.send();
    
}


// Função para editar a anotação sem recarregar a página
function post_data_edit() {   

    const btn = document.querySelector('#btn-add');
    const annotation_id = btn.dataset.id,

    //pegando o token csrf
    token = document.querySelector('[name=csrfmiddlewaretoken]')

    // Pegando a prioridade da anotação
    input_priority = document.querySelector('#id_priority');
    let priority
    for (let i = 0; i < input_priority.length; i++) {
        if (input_priority[i].selected == true) {
            priority = input_priority[i].value
        }        
    }    
    

    let annotation = {  
        annotation: {
            title: document.querySelector("#id_title").value,
            description: document.querySelector('#id_description').value,
            priority: parseInt(priority),
        }
    }       

    let xhr = new XMLHttpRequest();    
    xhr.open('POST', 'http://127.0.0.1:8000/Anotacoes/Editar/' + annotation_id, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", token.value);


    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {                
                new_annotation = JSON.parse(xhr.responseText)
                new_annotation = new_annotation.annotation
                                
                clearFormCreate(this)
                updateAnnotation(new_annotation)
                alert(new_annotation.msg)

            }
            
            if (xhr.status == 400) {
                response = JSON.parse(xhr.responseText)
                clearFormCreate(this)  
                this[1].required = true
                this[1].maxLength = "25"
                this[2].required = true
                alert(response.msg)
            }
        }
    }

    xhr.send(JSON.stringify(annotation))

    // Não submete o formulário
    return false
}


// Função para adaptar o modal de criação para edição
function change_modal(annotation_data, annotation_id) {

    // Adicionando evento no formulário para atualização da anotação
    form = document.querySelector('#form-create');        
    form.onsubmit = post_data_edit

    // Colocando os valores no formulário do modal
    input_title = document.querySelector('#id_title');
    input_title.value = annotation_data.title;
        
    input_description = document.querySelector('#id_description');
    input_description.value = annotation_data.description;

    // Selecionando a prioridade da anotação
    input_priority = document.querySelector('#id_priority');
    for (let i = 0; i < input_priority.length; i++) {
        if (input_priority[i].value == annotation_data.priority) {
            input_priority[i].selected = true;
        }        
    }    
    
    // Adapatando o modal de criação para edição
    modal = document.querySelector('#modal-new-item');    
    
    modal_title = document.querySelector('#title-modal');  
    modal_title.innerText = 'Editar anotação';
    
    modal_btn_form = document.querySelector('#btn-add') ;
    modal_btn_form.innerText = 'Editar';
    
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center'; 
    
    // Adicionando evento de edição ao botão do formulário
    btn = document.querySelector('#btn-add')
    btn.dataset.id = annotation_id
}


// Função para preparar o formulário para uma nova edição ou criação
function clearFormCreate(form){

    modal = document.querySelector('#modal-new-item'); 
    modal.style.display = 'none';                
    
    form.reset()
    form.onsubmit = 'none'
}


// Função para atualizar os dados da anotação no html
function updateAnnotation(annotation){
    title_annotation = document.querySelector('#annotation-title-'+ annotation.id)
    body_annotation_paragraph = document.querySelector('#annotation-body-'+ annotation.id).childNodes[1]
    status_bar = document.querySelector('#status-bar-'+ annotation.id)
        
    title_annotation.innerText = annotation.title
    body_annotation_paragraph.innerText = annotation.description

    if (annotation.priority == 1) {
        status_bar.style.background ='#8E0000'
    } else if(annotation.priority == 2){
        status_bar.style.background = '#EDF201'
    } else{
        status_bar.style.background = ' #44DE2B'
    } 
}