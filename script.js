const songs = [
    {
        title: "Suno Na Sangemamer",
        artist: "Arijit Singh",
        src: "songs/music1.mp3"
    },
    {
        title: "O Re Piya",
        artist: "Rahat Fateh Ali Khan",
        src: "songs/music2.mp3"
    },
    {
        title: "Naina Ashaq Na Ho",
        artist: "Arijit Singh",
        src: "songs/music3.mp3"
    },
    {
        title: "Aaye Ho Mere Jindgi Me",
        artist: "Udit Narayan",
        src: "songs/music4.mp3"
    },
    {
        title: "Apne To Apne Hote Hai",
        artist: "Himesh Reshammiya",
        src: "songs/music5.mp3"
    },
    {
        title: "Lambiyan Si judaia",
        artist: "Arijit Singh",
        src: "songs/music6.mp3"
    },
    {
        title: "Banda Sam Bahadur",
        artist: "Sankar Mahadevan",
        src: "songs/music7.mp3"
    },
    {
        title: "Khairiyat Pucho Na",
        artist: "Nitesh Tiwari",
        src: "songs/music8.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = new Audio(songs[currentSongIndex].src);

const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeSlider = document.getElementById("volume");
const playlist = document.getElementById("playlist");

// Load song info
function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

// Play / Pause
playBtn.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.textContent = "▶";
    }
});

// Next Song
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
    updatePlaylistUI();
});

// Previous Song
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
    updatePlaylistUI();
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;

    currentTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(audio.duration);
});

// Seek
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Volume Control
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// AutoPlay next
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// Format time
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Build Playlist
songs.forEach((song, index) => {
    let li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(index);
        audio.play();
        isPlaying = true;
        playBtn.textContent = "⏸";
        updatePlaylistUI();
    });
    playlist.appendChild(li);
});

// Highlight playing song
function updatePlaylistUI() {
    [...playlist.children].forEach((li, idx) => {
        li.classList.toggle("active", idx === currentSongIndex);
    });
}

loadSong(currentSongIndex);
updatePlaylistUI();
