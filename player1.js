// player1.js
document.addEventListener('DOMContentLoaded', function () {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeControl = document.getElementById('volume');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const progressBar = document.getElementById('progress');
    const albumCover = document.querySelector('.album-cover');
    const trackTitle = document.querySelector('.track-title');
    const artistName = document.querySelector('.artist');

    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;
    let currentVolume = 1.0; // Default volume
    let currentProgress = 0; // Current progress (in percentage)

    // Playlist
    const playlist = [
        {
            title: 'Odiyamma',
            artist: 'Artist 1',
            cover: 'OIP (2).jpg',
            audio: 'Odiyamma.mp3'
        },
        {
            title: 'Daakko Daakko Meka',
            artist: 'Artist 2',
            cover: 'R4.jpg',
            audio: '[iSongs.info] 01 - Daakko Daakko Meka.mp3'
        },
        {
            title: 'bhombadhal',
            artist: 'Artist 3',
            cover: 'R2.jpg',
            audio: '[iSongs.info] 01 - Bhoom Bhaddhal.mp3 '
        },
        {
            title: 'College Papa',
            artist: 'Artist 4',
            cover: 'OIP (1).jpg',
            audio: 'College Papa.mp3'
        },
        {
            title: 'Manasu Maree',
            artist: 'Artist 5',
            cover: 'R4.jpg',
            audio: '[iSongs.info] 01 - Manasu Maree.mp3'
        },
        
        
        // Add more songs to the playlist as needed
    ];

    let currentSongIndex = 0; // Index of the currently playing song
    let audio = new Audio(); // HTML5 Audio element

    // Add event listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    volumeControl.addEventListener('input', updateVolume);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    progressBar.addEventListener('input', updateProgress);

    // Initial setup
    updatePlayer();

    function togglePlayPause() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        isPlaying = !isPlaying;
        // Update UI
        playPauseBtn.textContent = isPlaying ? '||' : 'pause';
    }

    function playPrevious() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        updatePlayer();
    }

    function playNext() {
        currentSongIndex = (currentSongIndex + 4) % playlist.length;
        updatePlayer();
    }

    function updateVolume() {
        currentVolume = volumeControl.value / 100;
        audio.volume = currentVolume;
    }

    function toggleShuffle() {
        isShuffled = !isShuffled;
        // Implement logic to shuffle the playlist
        // For simplicity, you can shuffle the playlist array
        if (isShuffled) {
            playlist.sort(() => Math.random() - 0.5);
            currentSongIndex = 0; // Reset to the first song after shuffling
        }
        updatePlayer();
    }

    function toggleRepeat() {
        isRepeated = !isRepeated;
        audio.loop = isRepeated;
    }

    function updateProgress() {
        currentProgress = progressBar.value;
        const newTime = (currentProgress / 100) * audio.duration;
        audio.currentTime = newTime;
    }

    function updatePlayer() {
        const currentSong = playlist[currentSongIndex];
        albumCover.src = currentSong.cover;
        trackTitle.textContent = currentSong.title;
        artistName.textContent = currentSong.artist;

        // Load and play the selected song
        audio.src = currentSong.audio;
        audio.volume = currentVolume;

        audio.addEventListener('timeupdate', function () {
            const progressValue = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progressValue;
        });

        audio.addEventListener('ended', function () {
            // When the song ends, play the next one
            playNext();
        });

        if (isPlaying) {
            audio.play();
        }
    }
});

