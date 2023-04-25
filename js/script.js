import Dos from "./dos.js";

let dos = new Dos();

let contentWrapper = document.createElement('section');
contentWrapper.className = 'content-wrapper';
document.body.append(contentWrapper);
contentWrapper.append(dos.createDos());
document.addEventListener('keydown', function(event){
    dos.handleKeyDown(event)
})
document.addEventListener('keyup', function(event){
    dos.handleKeyUp(event)
})