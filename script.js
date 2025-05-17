console.log("welcome to spotify")
//Initialize the variables
let songIndex = 1;
let songs = [
    { songName: "Salam-e-Ishq", filePath: "song1.mp3", coverPath: "cover8.jpeg" },
    { songName: "Dil Ajj Kal", filePath: "song2.mp3", coverPath: "cover1.jpeg" },
    { songName: "Dil Tu", filePath: "song3.mp3", coverPath: "cover2.jpeg" },
    { songName: "Lado", filePath: "song4.mp3", coverPath: "cover8.jpeg" },
    { songName: "Mere Liye", filePath: "song5.mp3", coverPath: "cover4.jpeg" },
    { songName: "Sajna", filePath: "song6.mp3", coverPath: "cover5.jpeg" },
    { songName: "Safar", filePath: "song7.mp3", coverPath: "cover2.jpeg" },
    { songName: "Tumhare The", filePath: "song8.mp3", coverPath: "cover7.jpeg" },
    { songName: "Tune Jo Na Kaha", filePath: "song9.mp3", coverPath: "cover8.jpeg" },
    { songName: "Yaara", filePath: "song9.mp3", coverPath: "cover8.jpeg" },
];

let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Initialize audio element after DOM elements are loaded
audioElement.src = songs[songIndex].filePath;
audioElement.load();

// Make entire song item clickable and remove individual play buttons
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    
    // Remove individual play buttons if they exist
    const playBtn = element.querySelector('.songItemPlay');
    if (playBtn) playBtn.remove();
    
    // Make whole song item clickable
    element.style.cursor = 'pointer';
    element.addEventListener('click', () => {
        songIndex = i;
        audioElement.src = songs[i].filePath;
        audioElement.currentTime = 0;
        // Remove playing class from all song items
        songItems.forEach(item => item.classList.remove('playing'));
        // Add playing class to current song item
        element.classList.add('playing');
        
        audioElement.play()
            .then(() => {
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
                masterSongName.innerText = songs[i].songName;
            });
    });
});

// Debug audio events
audioElement.addEventListener('canplay', () => {
    console.log('Audio ready to play');
});
audioElement.addEventListener('playing', () => {
    console.log('Audio playback started');
});
audioElement.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    console.error('Error details:', audioElement.error);
    alert('Error playing audio. See console for details.');
});

//Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        console.log('Attempting to play audio...');
        audioElement.play()
            .then(() => {
                console.log('Playback successful');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            })
            .catch(error => {
                console.error('Playback failed:', error);
                alert('Error playing audio: ' + error.message);
            });
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})
// Removed individual play button functionality since whole song items are now clickable
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play()
        .then(() => {
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex].songName;
        })
        .catch(error => {
            console.error('Playback failed:', error);
            alert('Error playing audio: ' + error.message);
        });
})

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play()
        .then(() => {
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            masterSongName.innerText = songs[songIndex].songName;
        })
        .catch(error => {
            console.error('Playback failed:', error);
            alert('Error playing audio: ' + error.message);
        });
})