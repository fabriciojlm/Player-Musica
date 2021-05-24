const musicContainer = document.querySelector(".containerMusicas");
const playBtn = document.querySelector("#play");
const voltarBtn = document.querySelector("#voltar");
const proximaBtn = document.querySelector("#proxima");
const audio = document.querySelector("#audio");
const progresso = document.querySelector(".Progresso");
const barraProgresso = document.querySelector(".barraProgresso");
const titulo = document.querySelector("#titulo");
const cover = document.querySelector("#cover");
const volControl = document.querySelector('#vol-controle')

// Títulos Músicas
const songs = ["MoneyRain", "Vivencias", "CortedeJaca", "Fogo", "30dias"];

// Músicas
let songIndex = 0;

// Carregamento Músicas
loadSong(songs[songIndex]);

// Atualizar Músicas

function loadSong(song) {
  titulo.innerText = song;
  audio.src = `musicas/${song}.mp3`;
  cover.src = `imagens/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progresso.style.width = `${progressPercent}%`;
}

function setProgresso(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {

    audio.volume = e / 100
}

// Eventos

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Escolha Músicas

voltarBtn.addEventListener("click", prevSong);
proximaBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

barraProgresso.addEventListener("click", setProgresso);
audio.addEventListener("ended", nextSong);


// Controle Volume
volControl.onimput = () => {
    setVolume(volControl.value)
}

volControl.onchange = () => {
    setVolume(volControl.value)
}
