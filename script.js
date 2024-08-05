const imgContainer = document.querySelector('.img-container')
const startTime = document.querySelector('.current-time')
const totalTime = document.querySelector('.total-time')
const playBtn = document.querySelector('.play')
const nextBtn = document.querySelector('.next')
const prevBtn = document.querySelector('.prev')
const progressFill = document.querySelector('.progress-fill')
const songs = [
    {
        title: 'Lost in the City Lights',
        artist: 'Cosmo Sheldrake',
        coverArt: 'assets/cover-1.png',
        file: 'assets/lost-in-city-lights-145038.mp3'
    },
    {
        title: 'Forest Lullaby',
        artist: 'Lesfm',
        coverArt: 'assets/cover-2.png',
        file: 'assets/forest-lullaby-110624.mp3'
    }
]

let currentSongIndex = 0
let audio = null
function preloadAudioMetadata(index) {
    audio = new Audio(songs[index].file);
    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        totalTime.textContent = formatTime(duration);

    });
}
function playSong(index){
    
    if(audio){
        audio.pause()
    } 
    audio = new Audio(songs[index].file)
    audio.play()
    playBtn.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABQklEQVR4nO1WS06EQBBlzOg9zFxDPYCZeIuJMXoCdeFt9ADGba9VlqygX/UPcIxHEGxTCxLCMArEqIt+SSWkeNSrbqDrRVFAwH8GEZ1IiTsiEhxZhgcA53Ec73a5SZLsAbhgTsPnZwEsJ4lnWXZjXVkVL2++Ha5Y15LoyXs/a7je+x0QxXyvy7d5WQHqapS4EGKujdsQb8K4ogJw2NqpIxbaxtfGvXPNwQ1orfe1zTdW00RevNZEtGo1sOLc1gZsXnPNwQ2kabrgVW4raPP1h5TytOHzNee+2jGuGRqIwisYijR8hGn4DdNwEC3CUWz+chjpHx7HZuw4FkLMlbbfGZKDoYZEaTvOkDCI9HVfUbZdSqnHjiWbgei5z5IZV1ZKmctoCgAs26aUlLoHcNZnSjnHhrVtSgG6lVIeTxIPCIh+CZ/BYcgI9dCsyQAAAABJRU5ErkJggg==">'

    playBtn.dataset.playing = 'true'
    audio.addEventListener('timeupdate', () =>  {
        let currentTime = audio.currentTime
        setProgress()
        startTime.textContent = formatTime(currentTime)
        
        
    })

    return audio
}
function pauseSong(){
    if (audio){
        audio.pause()
        playBtn.dataset.playing = 'false'
        playBtn.innerHTML = '<img src="./assets/Play_fill.svg" alt="">'
    }
}

function nextSong(){
    if (currentSongIndex === songs.length - 1){
        currentSongIndex = 0
    } else {
        currentSongIndex += 1
    }
    pauseSong()
    setSongInfo(currentSongIndex)
    preloadAudioMetadata(currentSongIndex)
    playSong(currentSongIndex)
    
}

function prevSong(){
    if (currentSongIndex === 0){
        currentSongIndex = 1
    } else {
        currentSongIndex -= 1
    }
    pauseSong()
    setSongInfo(currentSongIndex)
    preloadAudioMetadata(currentSongIndex)
    playSong(currentSongIndex)
    
}

function setSongInfo(index){
    const songTitle = document.querySelector('.song-title').textContent = songs[index].title
    const artist = document.querySelector('.artist').textContent = songs[index].artist
    imgContainer.innerHTML = `<img class="cover-art" src="${songs[index].coverArt}" alt="">`
    totalTime.textContent = formatTime(audio.duration)
}

function setProgress(){
  progressFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`  
}


function formatTime(seconds){
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `0${minutes}:${secs < 10 ? 0 : '' }${secs}`
}

document.addEventListener('DOMContentLoaded', () => {
    preloadAudioMetadata(currentSongIndex)
})

playBtn.addEventListener('click', () =>{ 
    if(playBtn.dataset.playing === 'true'){
        pauseSong()
    } else {
      playSong(currentSongIndex)  
    }
    
})
nextBtn.addEventListener('click', () => nextSong(currentSongIndex))
prevBtn.addEventListener('click', () => prevSong(currentSongIndex))