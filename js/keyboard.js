import { EN, RU } from './letters.js';

export default class VirtualKeyboard {
  constructor(document) {
    this.enLetters = EN;
    this.ruLetters = RU;
    this.ctrl = false;
    this.alt = false;
    this.caps = false;
    this.document = document;
  }

  createKeyboard() {
    const dosKeyboard = this.document.createElement('div');
    const layoutsWrapper = this.document.createElement('div');
    const enLayout = this.createLayout(this.enLetters);
    const ruLayout = this.createLayout(this.ruLetters);
    dosKeyboard.className = 'dos__keyboard';
    dosKeyboard.classList.add('keyboard-en');
    layoutsWrapper.className = 'layouts-wrapper';
    layoutsWrapper.append(enLayout);
    layoutsWrapper.append(ruLayout);
    dosKeyboard.append(layoutsWrapper);
    return dosKeyboard;
  }

  createLayout(lang) {
    const layout = this.document.createElement('div');
    layout.className = 'keyboard__layout';
    if (lang === this.enLetters) {
      layout.classList.add('layout--en');
    }
    if (lang === this.ruLetters) {
      layout.classList.add('layout--ru');
    }
    for (const letter of lang) {
      const key = this.createBtn(letter);
      layout.append(key);
    }
    return layout;
  }

  createBtn(letter) {
    const box = this.document.createElement('div');
    const mainLetter = this.document.createElement('span');
    const altLetter = this.document.createElement('span');
    box.className = 'keyboard__key';
    mainLetter.className = 'key__main';
    altLetter.className = 'key__alt';
    mainLetter.innerHTML = letter.mainDisplay;
    altLetter.innerHTML = letter.altDisplay;
    if (letter.space === 1) {
      box.classList.add('one-space');
    }
    if (letter.space === 2) {
      box.classList.add('two-space');
    }
    if (letter.space === 3) {
      box.classList.add('three-space');
    }
    if (letter.space === 6) {
      box.classList.add('six-space');
    }
    mainLetter.classList.add(`key-${letter.mainValue}`);
    altLetter.classList.add(`key-${letter.altValue}`);
    box.append(mainLetter);
    box.append(altLetter);
    return box;
  }

  handleTab(event) {
    event.preventDefault();
    const txtArea = this.document.querySelector('.display__text');
    txtArea.value = txtArea.value.slice(0, txtArea.selectionStart) + '   ' + txtArea.value.slice(txtArea.selectionStart);
  }

  changeLayout() {
    const keyboard = this.document.querySelector('.dos__keyboard');
    keyboard.classList.toggle('keyboard-en');
    keyboard.classList.toggle('keyboard-ru');
  }

  checkLocale(event) {
    const ruLay = this.document.querySelector('.layout--ru');
    const enLay = this.document.querySelector('.layout--en');
    const pushedClass = `key-${event.key}`;
    const keybrd = this.document.querySelector('.dos__keyboard');
    if (
      (keybrd.classList.contains('keyboard-en') && !(enLay.getElementsByClassName(pushedClass)[0]) && (ruLay.getElementsByClassName(pushedClass)[0]))
    || (keybrd.classList.contains('keyboard-ru') && !(ruLay.getElementsByClassName(pushedClass)[0]) && (enLay.getElementsByClassName(pushedClass)[0]))
    ) {
      this.changeLayout();
    }
  }

  checkCaps(event) {
    this.caps = event.getModifierState('CapsLock');
    if (this.caps) {
      this.document.querySelector('.dos__keyboard').classList.add('alt-mode');
    }
    else {
      this.document.querySelector('.dos__keyboard').classList.remove('alt-mode');
    }
  }

  handleShift() {
    if (this.document.querySelector('.dos__keyboard').classList.contains('alt-mode')) {
      this.document.querySelector('.dos__keyboard').classList.remove('alt-mode');
    }
    else {
      this.document.querySelector('.dos__keyboard').classList.add('alt-mode');
    }
  }

  handleArrows(event) {
    const textarea = this.document.querySelector('.display__text');
    const rows = textarea.value.split(/\r?\n/).map((item, index) => index != 0?' '+item:item);
    let currentRow;
    const symbolsTotal = rows.reduce((acc, value) => acc + value.length, 0);
    let up = 0;
    for (let i = 0; i < rows.length; i += 1) {
      if (up + rows[i].length < textarea.selectionStart) {
        up += rows[i].length;
      }
      else {
        currentRow = i;
        break;
      }
    }
    switch (event) {
      case 'ArrowUp':
        if (rows.length === 1 || rows.length === 0
        || textarea.selectionStart <= rows[0].length || currentRow === 0) {
          return;
        }
        textarea.selectionStart = up;
        textarea.selectionEnd = textarea.selectionStart;
        break;
      case 'ArrowDown':
        if (rows.length === 1 || rows.length === 0
            || (textarea.selectionStart + rows[rows.length - 1].length) > symbolsTotal) {
          return;
        }
        textarea.selectionStart += rows[currentRow + 1].length
        + ((up + rows[currentRow].length) - textarea.selectionStart);
        textarea.selectionEnd = textarea.selectionStart;
        break;
      case 'ArrowLeft':
        textarea.selectionStart -= 1;
        textarea.selectionEnd = textarea.selectionStart;
        break;
      case 'ArrowRight':
        textarea.selectionStart += 1;
        textarea.selectionEnd = textarea.selectionStart;
        break;
      default:
        break;
    }
  }
}
