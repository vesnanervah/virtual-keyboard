import {EN, RU} from './letters.js';

export default class VirtualKeyboard{
    constructor(){
        this.enLetters = EN;
        this.ruLetters = RU;
        this.ctrl = false;
        this.alt = false;
        this.caps = false;
    }
    createKeyboard(){
        let dosKeyboard = document.createElement('div');
        let layoutsWrapper = document.createElement('div');
        let enLayout = this.createLayout(this.enLetters);
        let ruLayout = this.createLayout(this.ruLetters);
        dosKeyboard.className = 'dos__keyboard';
        dosKeyboard.classList.add('keyboard-en');
        layoutsWrapper.className = 'layouts-wrapper';
        layoutsWrapper.append(enLayout);
        layoutsWrapper.append(ruLayout);
        dosKeyboard.append(layoutsWrapper);
        return dosKeyboard;
    }
    createLayout(lang){
        let layout = document.createElement('div');
        layout.className = 'keyboard__layout';
        if(lang === this.enLetters){
            layout.classList.add('layout--en')
        }
        if(lang === this.ruLetters){
            layout.classList.add('layout--ru')
        }
        for(let letter of lang){
            let key = this.createBtn(letter)
            layout.append(key)
        }
        return layout;
    }
    createBtn(letter){
        let box = document.createElement('div');
        let mainLetter = document.createElement('span');
        let altLetter = document.createElement('span');
        box.className = 'keyboard__key';
        mainLetter.className = 'key__main';
        altLetter.className = 'key__alt';
        mainLetter.innerHTML = letter.mainDisplay;
        altLetter.innerHTML = letter.altDisplay;
        if(letter.space == 1){
            box.classList.add(`one-space`);
        }
        if(letter.space == 2){
            box.classList.add(`two-space`)
        }
        if(letter.space == 3){
            box.classList.add(`three-space`)
        }
        if(letter.space == 6){
            box.classList.add(`six-space`)
        }
        mainLetter.classList.add(`key-${letter.mainValue}`);
        altLetter.classList.add(`key-${letter.altValue}`)
        box.append(mainLetter);
        box.append(altLetter);
        return box;
    }
    handleTab(event){
        event.preventDefault();
        let txtArea = document.querySelector('.display__text')
        txtArea.value = txtArea.value.slice(0, txtArea.selectionStart)+'   '+txtArea.value.slice(txtArea.selectionStart);

    }
    changeLayout(){
        let keyboard = document.querySelector('.dos__keyboard');
        keyboard.classList.toggle('keyboard-en');
        keyboard.classList.toggle('keyboard-ru');
    }
    checkLocale(event){
        let ruLay = document.querySelector('.layout--ru');
        let enLay = document.querySelector('.layout--en');
        let pushedClass = `key-${event.key}`;
        let keybrd = document.querySelector('.dos__keyboard');
        if( 
        ( keybrd.classList.contains('keyboard-en') && !(enLay.getElementsByClassName(pushedClass)[0]) && (ruLay.getElementsByClassName(pushedClass)[0]) )
        || ( keybrd.classList.contains('keyboard-ru') && !(ruLay.getElementsByClassName(pushedClass)[0]) && (enLay.getElementsByClassName(pushedClass)[0]) )
        ) {
            this.changeLayout();
        }
    }
    checkCaps(event){
        this.caps = event.getModifierState('CapsLock');
        if(this.caps){
            document.querySelector('.dos__keyboard').classList.add('alt-mode');
        }
        else{
            document.querySelector('.dos__keyboard').classList.remove('alt-mode');
        }
    }
    handleShift(){
        if(document.querySelector('.dos__keyboard').classList.contains('alt-mode')){
            document.querySelector('.dos__keyboard').classList.remove('alt-mode');
        }
        else{
            document.querySelector('.dos__keyboard').classList.add('alt-mode');
        }
    }
    handleArrows(event){
        let textarea = document.querySelector('.display__text');
        let rows = textarea.value.split(/\r?\n/).map((item, index)=>index!=0?' '+item:item);
        let currentRow;
        let symbolsTotal = rows.reduce((acc, value)=>acc+value.length,0);
        let up = 0;
        for(let i = 0; i<rows.length; i++){
            if(up+rows[i].length < textarea.selectionStart){
                up+=rows[i].length;
            }
            else{
                currentRow = i;
                break
            }
        }    
        switch(event){
            case 'ArrowUp':
                if(rows.length == 1 || rows.length == 0 || textarea.selectionStart<=rows[0].length){
                    return
                }
                textarea.selectionStart = up;
                textarea.selectionEnd = textarea.selectionStart;
                break;
            case 'ArrowDown':
                if(rows.length == 1 || rows.length == 0|| (textarea.selectionStart+rows[rows.length-1].length)>symbolsTotal ){
                    return
                }
                textarea.selectionStart += rows[currentRow+1].length;
                textarea.selectionEnd = textarea.selectionStart;
                break;    
            case 'ArrowLeft':
                textarea.selectionStart = textarea.selectionStart-1;
                textarea.selectionEnd = textarea.selectionStart;
                break;
            case 'ArrowRight':
                textarea.selectionStart = textarea.selectionStart+1;
                textarea.selectionEnd = textarea.selectionStart;
                break;        
        }
    }
}