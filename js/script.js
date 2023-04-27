import Dos from "./dos.js";
import Note from './note.js';

let note = new Note();
let dos = new Dos();

let contentWrapper = document.createElement('section');
contentWrapper.className = 'content-wrapper';
document.body.append(contentWrapper);
contentWrapper.append(note.createNote());
contentWrapper.append(dos.createDos());
document.addEventListener('keydown', function(event){
    dos.handleKeyDown(event)
})
document.addEventListener('keyup', function(event){
    dos.handleKeyUp(event)
})
alert(`Привет!
 Раскладка автоматически определит язык, найдя знакомый символ, поэтому, если раскладка системы и отображаемая в приложении не совпадает, просто начните печатать.
 После синхронизации раскладок, можете переключать языки обычным Ctrl+Alt.
 Однако, так же прошу вас заметить, что на всех девайсах физические клавиатуры разные, приложение писалось с линукса под винду и линукс соответственно. Спасибо!`)