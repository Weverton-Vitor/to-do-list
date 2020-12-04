// Pegando o modal
modal_detail_annotation = document.querySelector("#modal-detail");

// Pegando o elemento  que fecha o modal
annotation_close = document.getElementById("close-modal-detail");

// Pegando todos os corpos das anotações
annotation_body = document.querySelectorAll(".annotation-body");

// Fechando o modal pelo botão de Fechamento
annotation_close.onclick = function () {  
    modal_detail_annotation.style.display = 'none'
};


// Fechando o modal pelo click fora do modal
window.onclick = function (event) {
    if (event.target == modal_detail_annotation) {

        modal_detail_annotation.style.display = 'none'
    }
};


for (let i = 0; i < annotation_body.length; i++) {
    // Só adicionar o evento se o annotation_body não for o annotation_body do modal de detalhes
    if(annotation_body[i].id != 'annotation-body-detail') {
        annotation_body[i].onclick = showDetail           
    } 
}

function showDetail() {

    // Buscando os dados da anotação
    annotation_id = this.childNodes[1].dataset.id    
     
    let xhr = new XMLHttpRequest();    
    xhr.open('GET', 'http://127.0.0.1:8000/Anotacoes/Anotacao/' + annotation_id);
    
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                annotation_data = JSON.parse(xhr.responseText);                    
                annotation = annotation_data.annotation                
                console.log('a')

                // Pegando os elementos do modal de detalhes
                title_annotation = document.querySelector('#annotation-title-detail')
                description_annotation = document.querySelector('#annotation-p-detail')
                status_bar = document.querySelector('#status-bar-detail')
                

                // Setando valores para os elementos do modal de detalhes
                title_annotation.innerText = annotation.title    
                description_annotation.innerText = annotation.description

                // Mudando a cor da barra lateral do modal de acordo com a prioridade
                if (annotation.priority == 1) {
                    status_bar.style.background ='#8E0000'
                } else if(annotation.priority == 2){
                    status_bar.style.background = '#EDF201'
                } else{
                    status_bar.style.background = ' #44DE2B'
                }

                // Mudando o display do modal de detalhes
                modal_detail = document.querySelector('#modal-detail')
                modal_detail.style.display = 'flex'
            }
        }
    };
    
    xhr.send();
            
}