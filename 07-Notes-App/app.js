// Select DOM elements
const noteText = document.getElementById('noteText');
const addNoteButton = document.getElementById('addNote');
const notesList = document.getElementById('notesList');

// Load notes from local storage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to render notes
function renderNotes() {
  notesList.innerHTML = ''; // Clear existing notes

  notes.forEach((note, index) => {
    const noteItem = document.createElement('li');
    noteItem.classList.add('note');
    noteItem.innerHTML = `
      <span>${note}</span>
      <button onclick="deleteNote(${index})">Delete</button>
    `;

    notesList.appendChild(noteItem);

    // Add GSAP animation
    gsap.from(noteItem, { y: 50, opacity: 0, duration: 0.5, ease: 'bounce' });
  });
}

// Function to add a note
function addNote() {
  const note = noteText.value.trim();

  if (note) {
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    noteText.value = ''; // Clear input
    renderNotes();
  }
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

// Event listeners
addNoteButton.addEventListener('click', addNote);
noteText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addNote();
});

// Initial rendering of notes
renderNotes();
