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
            if(event.key == 'Control'){
                this.keyboard.ctrl = true;

            }
            if(event.key == 'Alt'){
                this.keyboard.alt = true;

            }
            if(event.key == 'Shift'){
                this.keyboard.handleShift();
            }
            if(event.key == 'Tab'){
                this.keyboard.handleTab(event)
            }
            if( event.key == 'Alt'&&this.keyboard.ctrl ){
                this.keyboard.changeLayout();
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
            if(event.key == 'CapsLock'){
                this.keyboard.checkCaps(event);
            }
            if(event.key == 'Control'){
                this.keyboard.ctrl = false;

            }
            if(event.key == 'Alt'){
                this.keyboard.alt = false;

            }
            if(event.key == 'Shift'){
                this.keyboard.handleShift();
            }
        }
        else{
            event.preventDefault();
        }
    }
    handleMouseClick(event){
        if( event.target.classList.contains('layouts-wrapper') || event.target.classList.contains('keyboard__layout') ){
            return
        }
        let pressedClass;
        let pressedValue;
        let pressedAll;
        let searchingValue = ()=> this.keyboard.caps?'.key__alt':'.key__main';
        let textarea = document.querySelector('.display__text');
        textarea.focus()
        if( event.target.classList.contains('keyboard__key') ){
            pressedClass = event.target.querySelector(searchingValue()).classList[1]
        }
        if( event.target.classList.contains('key__alt') || event.target.classList.contains('key__main')){
            pressedClass = event.target.classList[1]
        }
        pressedAll = document.getElementsByClassName(pressedClass)
        for(let pressed of pressedAll){
            pressed.closest('.keyboard__key').classList.add('pressed')
        }
        pressedValue = pressedClass.slice(4);
        switch(pressedValue){
            case 'Tab':
                this.keyboard.handleTab(event)
                break;
            case 'Spacebar':
                textarea.value = textarea.value.slice(0, textarea.selectionStart)+' '+textarea.value.slice(textarea.selectionStart);
                break;
            case 'Enter':
                textarea.value = textarea.value.slice(0, textarea.selectionStart)+'\n'+textarea.value.slice(textarea.selectionEnd);
                break;
            case 'Backspace':
                textarea.value = textarea.value.slice(0, textarea.selectionStart-1)+textarea.value.slice(textarea.selectionEnd);
                break;
            case 'CapsLock':
                this.keyboard.caps = !this.keyboard.caps;
                if(this.keyboard.caps){
                    document.querySelector('.dos__keyboard').classList.add('alt-mode');
                }
                else{
                    document.querySelector('.dos__keyboard').classList.remove('alt-mode');
                }
                break;
            case 'ArrowUp':
                this.keyboard.handleArrows(pressedValue);
                break;  
            case 'ArrowDown':
                this.keyboard.handleArrows(pressedValue);
                break;
            case 'ArrowLeft':
                this.keyboard.handleArrows(pressedValue);
                break;
            case 'ArrowRight':
                this.keyboard.handleArrows(pressedValue);
                break;
            case 'Shift':
                break;
            default:
                textarea.value = textarea.value.slice(0, textarea.selectionStart)+pressedValue+textarea.value.slice(textarea.selectionEnd);                  
            }
        for(let pressed of pressedAll){
            setTimeout(()=>
            pressed.closest('.keyboard__key').classList.remove('pressed')
            , 100)
        }
    }

}