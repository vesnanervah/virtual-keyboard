export default class Note {
  createNote() {
    let noteWrapper = document.createElement('div');
    let noteHeader = document.createElement('div');
    let noteLines = document.createElement('div');
    let lineOne = document.createElement('div');
    let lineTwo = document.createElement('div');
    let lineThree = document.createElement('div');
    let lineFour = document.createElement('div');
    let lineFive = document.createElement('div');
    let lineSix = document.createElement('div');
    noteWrapper.className = 'note';
    noteHeader.className = 'note__header';
    noteLines.className = 'note__lines';
    lineOne.className = 'note__line';
    lineTwo.className = 'note__line';
    lineThree.className = 'note__line';
    lineFour.className = 'note__line';
    lineFive.className = 'note__line';
    lineSix.className = 'note__line';
    noteHeader.textContent = 'Note';
    lineOne.textContent = 'The keyboard was made on linux.';
    lineTwo.textContent = 'To change layout press Ctrl+Alt.';
    lineThree.textContent = 'Only Ru and En locale are available.';
    lineFour.textContent = 'V. Keyboard can auto pick layout...';
    lineFive.textContent = 'Just start typing and it will';
    lineSix.textContent = 'switch layout.';
    noteWrapper.append(noteHeader);
    noteWrapper.append(noteLines);
    noteLines.append(lineOne);
    noteLines.append(lineTwo);
    noteLines.append(lineThree);
    noteLines.append(lineFour);
    noteLines.append(lineFive);
    noteLines.append(lineSix);
    return noteWrapper;
  }
}
