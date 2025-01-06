// Array to store uploaded songs
let userSongs = [];
let currentSongIndex = 0;
let audio = new Audio();
let isPlaying = false;

// DOM Elements
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume");
const songList = document.getElementById("user-playlist");
const albumCover = document.getElementById("album-cover");
const uploadBtn = document.getElementById("upload-btn");
const songTitleInput = document.getElementById("song-title");
const songArtistInput = document.getElementById("song-artist");
const songUploadInput = document.getElementById("song-upload");

// Update UI to show current song
function updateUI() {
    const song = userSongs[currentSongIndex];
    albumCover.src = song.cover || "default.jpg"; // Placeholder cover
    progressBar.value = 0;
    progressBar.max = audio.duration;
    playBtn.textContent = isPlaying ? "Pause" : "Play";
}

// Play or Pause the song
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updateUI();
}

// Move to the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % userSongs.length;
    audio.src = userSongs[currentSongIndex].file;
    audio.play();
    isPlaying = true;
    updateUI();
}

// Move to the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + userSongs.length) % userSongs.length;
    audio.src = userSongs[currentSongIndex].file;
    audio.play();
    isPlaying = true;
    updateUI();
}

// Update progress bar as the song plays
audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
});

// Update the volume based on the input value
volumeControl.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
});

// Add a song to the playlist
function addSongToPlaylist(song, index) {
    const songItem = document.createElement("li");
    songItem.textContent = `${song.title} - ${song.artist}`;
    songItem.dataset.index = index;
    songItem.addEventListener("click", () => playSongFromList(index));
    songList.appendChild(songItem);
}

// Play the selected song from the playlist
function playSongFromList(index) {
    currentSongIndex = index;
    audio.src = userSongs[index].file;
    audio.play();
    isPlaying = true;
    updateUI();
}

// Handle song upload
uploadBtn.addEventListener("click", () => {
    const songFile = songUploadInput.files[0];
    const title = songTitleInput.value.trim();
    const artist = songArtistInput.value.trim();

    if (songFile && title && artist) {
        const reader = new FileReader();
        reader.onload = () => {
            const newSong = {
                title: title,
                artist: artist,
                file: reader.result,
                cover: "default.jpg"  // Placeholder, can be extended to upload album art
            };
            userSongs.push(newSong);
            addSongToPlaylist(newSong, userSongs.length - 1);
        };
        reader.readAsDataURL(songFile);
    } else {
        alert("Please provide all song details and a valid file.");
    }
});

// Event Listeners
playBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initialize the app
if (userSongs.length > 0) {
    audio.src = userSongs[0].file;
    updateUI();
}
