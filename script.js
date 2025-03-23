// Show the birthday message smoothly
function showMessage() {
    const message = document.getElementById('hiddenMessage');
    message.style.display = 'block';
    message.scrollIntoView({ behavior: 'smooth' });
}

// Fireworks Effect (Fixed in Background)
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function firework() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Prevents screen from filling
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height / 2;
            const size = Math.random() * 4 + 2;
            ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(firework);
    }
    firework();
});

// Music Player Controls
// Select Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('songTitle');
const coverImage = document.querySelector('.cover img');

let isPlaying = false;
const tracks = [
    { title: "See You Again", src: "song1.mp3", cover: "music-cover1.png" },
    { title: "Zindagi Kuch Toh Bata", src: "song2.mp3", cover: "music-cover2.jpg" }
];

let currentTrack = 0;

// Format Time Helper Function
function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Load First Track Without Playing
function loadTrack(index) {
    currentTrack = index;
    audio.src = tracks[currentTrack].src;
    trackTitle.textContent = tracks[currentTrack].title;
    coverImage.src = tracks[currentTrack].cover;
    audio.load(); // Load track but don't play
}

// Load Track Duration Once Metadata is Available
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Play & Pause Toggle
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶️';
    } else {
        audio.play();
        playBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
});

// Update Progress Bar & Timer in Real-Time
audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Seek Song by Dragging Progress Bar
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Change Track & Update Info
function changeTrack(next = true) {
    currentTrack = next ? (currentTrack + 1) % tracks.length : (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);

    if (currentTrack !== 0) {
        audio.play(); // Auto-play for second track
        playBtn.textContent = '⏸️';
        isPlaying = true;
    } else {
        playBtn.textContent = '▶️';
        isPlaying = false;
    }
}

// Update Timer on Track Change
audio.addEventListener('loadeddata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Previous & Next Track Buttons
prevBtn.addEventListener('click', () => changeTrack(false));
nextBtn.addEventListener('click', () => changeTrack(true));

// Initialize Player with First Track
loadTrack(0);
