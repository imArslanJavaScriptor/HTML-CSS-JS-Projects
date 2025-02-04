// JavaScript for enhanced features in the notes app
const addNoteButton = document.getElementById("addNoteButton");
const notesGrid = document.getElementById("notesGrid");
const noteModal = document.getElementById("noteModal");
const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteDescription = document.getElementById("noteDescription");
const noteContent = document.getElementById("noteContent");
const themeToggle = document.getElementById("themeToggle"); // New dark mode toggle
const searchInput = document.getElementById("searchInput"); // Search bar

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = null;

// Toggle dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Open modal
addNoteButton.addEventListener("click", () => {
  noteModal.classList.remove("hidden");
  noteForm.reset();
  editIndex = null;
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === noteModal) noteModal.classList.add("hidden");
});

// Save note
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newNote = {
    title: noteTitle.value,
    description: noteDescription.value,
    content: noteContent.value,
    color: "#fff",
    pinned: false,
    tags: [],
  };

  if (editIndex !== null) {
    notes[editIndex] = newNote;
  } else {
    notes.push(newNote);
  }

  saveNotes();
  renderNotes();
  noteModal.classList.add("hidden");
});

// Search functionality
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  renderNotes(query);
});

// Render notes
function renderNotes(query = "") {
  notesGrid.innerHTML = "";
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query) ||
      note.description.toLowerCase().includes(query)
  );

  filteredNotes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.style.backgroundColor = note.color;
    noteElement.draggable = true;
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.description}</p>
      <p>${note.content}</p>
      <div class="note-tags">${note.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="note-options">⋮</div>
      <div class="note-options-menu">
        <button onclick="deleteNote(${index})">Delete</button>
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="pinNoteToggle(${index})">${note.pinned ? "Unpin" : "Pin"}</button>
        <button onclick="changeColor(${index})">Change Color</button>
      </div>
    `;

    // Options menu toggle
    const options = noteElement.querySelector(".note-options");
    const optionsMenu = noteElement.querySelector(".note-options-menu");
    options.addEventListener("click", () => {
      optionsMenu.style.display =
        optionsMenu.style.display === "block" ? "none" : "block";
    });

    noteElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("index", index);
    });

    noteElement.addEventListener("drop", (e) => {
      e.preventDefault();
      const sourceIndex = e.dataTransfer.getData("index");
      const targetIndex = index;
      [notes[sourceIndex], notes[targetIndex]] = [
        notes[targetIndex],
        notes[sourceIndex],
      ];
      saveNotes();
      renderNotes();
    });

    noteElement.addEventListener("dragover", (e) => e.preventDefault());

    notesGrid.appendChild(noteElement);
  });
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Delete note
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

// Edit note
function editNote(index) {
  editIndex = index;
  const note = notes[index];
  noteTitle.value = note.title;
  noteDescription.value = note.description;
  noteContent.value = note.content;
  noteModal.classList.remove("hidden");
}

// Pin/Unpin note
function pinNoteToggle(index) {
  notes[index].pinned = !notes[index].pinned;
  notes.sort((a, b) => b.pinned - a.pinned);
  saveNotes();
  renderNotes();
}

// Change note color
function changeColor(index) {
  const colors = [
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
  ];
  notes[index].color = colors[Math.floor(Math.random() * colors.length)];
  saveNotes();
  renderNotes();
}

// Initialize
renderNotes();
