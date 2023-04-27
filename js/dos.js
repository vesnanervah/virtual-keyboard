import VirtualKeyboard from "./keyboard.js";
import Monitor from "./monitor.js";

export default class Dos{
    constructor(){
        this.monitor = new Monitor();
        this.keyboard = new VirtualKeyboard();
    }
    createDos(){
        let dos = document.createElement('div');
        dos.append(this.monitor.createMonitor());
        dos.append(this.keyboard.createKeyboard());
        dos.className='dos';
        return dos;
    }
    handleKeyDown(event){
        console.log(event.key)
        document.querySelector('.display__text').focus();
        if(event.key == 'GroupNext'){
            event.preventDefault();
            this.keyboard.changeLayout();
        }
        if(document.getElementById(`key-${event.key}`)){
            document.getElementById(`key-${event.key}`).closest('.keyboard__key').classList.add('pressed');
            if(event.key == 'Shift'){
                this.keyboard.viewAlt();
            }
            if(event.key == 'Tab'){
                this.keyboard.handleTab(event)
            }
        }
        else{
            event.preventDefault()
        }
    }
    handleKeyUp(event){
        if(event.key == 'GroupNext'){
            event.preventDefault();
        }
        if(document.getElementById(`key-${event.key}`)){
            document.getElementById(`key-${event.key}`).closest('.keyboard__key').classList.remove('pressed');
            if(event.key == 'Shift'){
                this.keyboard.hideAlt();
            }
        }
        else{
            event.preventDefault();
        }
    }
}