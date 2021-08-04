/* 
this section is responsible for opening new windows, focus if it's already opened
*/
const divs = document.querySelectorAll('.editorbutton');

divs.forEach(el => el.addEventListener('click', event => {
    window.open('editor.html?id=' + event.target.id, "editor","",true).focus()
}));