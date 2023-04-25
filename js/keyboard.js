import {EN} from './letters.js';

export default class VirtualKeyboard{
    constructor(){
        this.enLetters = EN;
    }
    createLayout(){
        let layout = document.createElement('div');
        layout.className = 'dos__keyboard';
        for(let letter of this.enLetters){
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
        mainLetter.setAttribute('id', `key-${letter.mainValue}`);
        altLetter.setAttribute('id', `key-${letter.altValue}`)
        box.append(mainLetter);
        box.append(altLetter);
        return box;
    }
    viewAlt(){
        document.querySelector('.dos__keyboard').classList.add('alt-mode');
    }
    hideAlt(){
        document.querySelector('.dos__keyboard').classList.remove('alt-mode');
    }
}