export default class Note {
  createNote() {
    const noteWrapper = document.createElement('div');
    const noteHeader = document.createElement('div');
    const noteLines = document.createElement('div');
    const lineOne = document.createElement('div');
    const lineTwo = document.createElement('div');
    const lineThree = document.createElement('div');
    const lineFour = document.createElement('div');
    const lineFive = document.createElement('div');
    const lineSix = document.createElement('div');
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
