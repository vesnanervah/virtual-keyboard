import VirtualKeyboard from "./keyboard.js";
import Monitor from "./monitor.js";

export default class Dos{
    constructor(){
        this.monitor = new Monitor();
        this.keyboard = new VirtualKeyboard()
    }
    createDos(){
        let dos = document.createElement('div');
        dos.append(this.monitor.createMonitor());
        dos.append(this.keyboard.createLayout());
        dos.className='dos';
        return dos;
    }
    handleKeyDown(event){
        console.log(event.key);
        document.querySelector('.display__text').focus();
        document.getElementById(`key-${event.key}`).closest('.keyboard__key').classList.add('pressed');
        if(event.key == 'Shift'){
            this.keyboard.viewAlt();
        }
    }
    handleKeyUp(event){
        document.getElementById(`key-${event.key}`).closest('.keyboard__key').classList.remove('pressed');
        if(event.key == 'Shift'){
            this.keyboard.hideAlt();
        }
    }
}