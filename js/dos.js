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
        document.querySelector('.display__text').focus();
        if(event.key == 'GroupNext'){
            event.preventDefault();
            for( let btn of document.getElementsByClassName(`key-Alt`) ){
                btn.closest('.keyboard__key').classList.add('pressed')
            }
            this.keyboard.changeLayout();
        }
        if(document.getElementsByClassName(`key-${event.key}`)){
            this.keyboard.checkLocale(event);
            for( let btn of document.getElementsByClassName(`key-${event.key}`) ){
                btn.closest('.keyboard__key').classList.add('pressed');
            }
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
            for( let btn of document.getElementsByClassName(`key-Alt`) ){
                btn.closest('.keyboard__key').classList.remove('pressed')
            }
        }
        if(document.getElementsByClassName(`key-${event.key}`)){
            for( let btn of document.getElementsByClassName(`key-${event.key}`) ){
                btn.closest('.keyboard__key').classList.remove('pressed')
            }
            if(event.key == 'Shift'){
                this.keyboard.hideAlt();
            }
        }
        else{
            event.preventDefault();
        }
    }
}