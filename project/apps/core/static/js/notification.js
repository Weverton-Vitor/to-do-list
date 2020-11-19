// Pegando o modal
var modal_annotation = document.querySelector("#modal-notification");

// Pegando o elemento span que fecha o modal
var span_annotation = document.querySelector(".close-modal-notification");

// verificando se existe uma mensagem toda vez que a tela recarregar
window.onload = showMessage()

// Evento de click no span que fecha o modal
span_annotation.onclick = function () {        
    modal_annotation.style.display = "none";       
};


function showMessage() {
    mesages = document.querySelector('.messages')  
    if (mesages.childElementCount >= 1) {        
        mesages_paragraph_class = document.querySelector('#notification-message').classList[0]
        if (mesages_paragraph_class == 'success') {
            mesages.parentNode.style.background = '#00A65A'
        } else {
            mesages.parentNode.style.background = '#DD4B39'            
        }
        modal_annotation.style.display = "block";            
    }

}
