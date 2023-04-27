import {EN, RU} from './letters.js';

export default class VirtualKeyboard{
    constructor(){
        this.enLetters = EN;
        this.ruLetters = RU;
        this.ctrl = false;
        this.alt = false;
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
        let pushedClass = `.key-${event.key}`;
        let keybrd = document.querySelector('.dos__keyboard');
        if( 
        ( keybrd.classList.contains('keyboard-en') && !(enLay.querySelector(pushedClass)) && (ruLay.querySelector(pushedClass)) )
        || ( keybrd.classList.contains('keyboard-ru') && !(ruLay.querySelector(pushedClass)) && (enLay.querySelector(pushedClass)) )
        ) {
            this.changeLayout();
        }
    }
    viewAlt(){
        document.querySelector('.dos__keyboard').classList.add('alt-mode');
    }
    hideAlt(){
        document.querySelector('.dos__keyboard').classList.remove('alt-mode');
    }
}