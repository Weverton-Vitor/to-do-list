function setLinkSideBar(){
    link_sidebar_annotation = document.querySelector('#link-annotations')
    link_sidebar_annotation.href = localStorage.getItem('link_sidebar_annotation')

    link_sidebar_task_list = document.querySelector('#link-task-lists')
    link_sidebar_task_list.href = localStorage.getItem('link_sidebar_task_list')    
}