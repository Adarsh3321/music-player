const wrapper = document.querySelector(".wrapper"),
musicImg=wrapper.querySelector(".img-area img"),
musicName=wrapper.querySelector(".song-details .name"),
musicArtist=wrapper.querySelector(".song-details .artist"),
mainAudio=wrapper.querySelector("#main-audio"),
playpausebtn=wrapper.querySelector(".play-pause"),
prevBtn=wrapper.querySelector("#prev"),
nextBtn=wrapper.querySelector("#next"),
progressbar=wrapper.querySelector(".progress-bar"),
progressArea=wrapper.querySelector(".progress-area"),
musicList=wrapper.querySelector(".music-list"),
showbtn=wrapper.querySelector("#more-music"),
Hidebtn=musicList.querySelector("#close");



let musicIndex=1;

window.addEventListener("load",()=>{
    loadMusic(musicIndex);
})

function loadMusic(index){
    musicName.innerText=allMusic[index-1].name;
    musicArtist.innerText=allMusic[index-1].artist;
    musicImg.src=`images/${allMusic[index-1].img}.jpg`;
    mainAudio.src=`songs/${allMusic[index-1].src}.mp3`
}

function playMusic(){
    wrapper.classList.add("paused");
    playpausebtn.querySelector("i").innerHTML="pause";
    mainAudio.play();
    musicImg.classList.add("anime");
}
function pauseMusic(){
    wrapper.classList.remove("paused");
    playpausebtn.querySelector("i").innerHTML="play_arrow";
    mainAudio.pause();
    musicImg.classList.remove("anime");
}
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex=1 :musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex=musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playpausebtn.addEventListener("click",()=>{
    const isMusicPaused=wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});


nextBtn.addEventListener("click", ()=>{
    nextMusic();
});
prevBtn.addEventListener("click", ()=>{
    prevMusic();
});

mainAudio.addEventListener("timeupdate",(e)=>{
 const currentTime=e.target.currentTime;
 const duration=e.target.duration;
 let progresswidth=(currentTime / duration) * 100;
 progressbar.style.width = `${progresswidth}%`;

 
     let musicCurrentTime = wrapper.querySelector(".current");
     let musicDuration = wrapper.querySelector(".duration");
     mainAudio.addEventListener("loadeddata", ()=>{

     let audioDuration = mainAudio.duration;
     let totalMin = Math.floor(audioDuration/60);
     let totalSec = Math.floor(audioDuration % 60);
     if(totalSec<10){
         totalSec=`0${totalSec}`;
     }
     musicDuration.innerText = `${totalMin}:${totalSec}`;

    
});
 
let currentMin = Math.floor(currentTime/60);
let currentSec = Math.floor(currentTime % 60);
if(currentSec<10){
   currentSec=`0${currentSec}`;
}
musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});



progressArea.addEventListener("click",(e)=>{
    let progresswidthval=progressArea.clientWidth;
    let clickedoffsetx=e.offsetX;
    let songDuration=mainAudio.duration;
    mainAudio.currentTime = (clickedoffsetx / progresswidthval) * songDuration;
    playMusic();
});

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click",()=>{
    let getText = repeatBtn.innerText;

    switch(getText ){
        case "repeat" : 
        repeatBtn.innerText="repeat_one";
        repeatBtn.setAttribute("title","Song Looped");
        break;
        case "repeat_one" :
            repeatBtn.innerText="shuffle";
            repeatBtn.setAttribute("title","Playback Shuffle");
            break;
        case "shuffle" :
            repeatBtn.innerText="repeat";
            repeatBtn.setAttribute("title","Playlist Looped");
            break;
    }
});

mainAudio.addEventListener("ended",()=>{
    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat" : 
        nextMusic();
        break;
        case "repeat_one" :
            mainAudio.currentTime=0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle" :
           let randomIndex= Math.floor((Math.random() * allMusic.length) +1);
           do{
            let randomIndex= Math.floor((Math.random() * allMusic.length) +1);
           }while(musicIndex == randomIndex);
             musicIndex=randomIndex;
             loadMusic(musicIndex);
             playMusic();
           break; 
    }
})

showbtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});
Hidebtn.addEventListener("click", ()=>{
    showbtn.click();
});

const ulTag = wrapper.querySelector("ul");
for(let i=0;i<allMusic.length;i++){
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
        <span>${allMusic[i].name}</span>
        <p>${allMusic[i].artist}</p>
    </div>
    <audio src="songs/${allMusic[i].src}.mp3" id="${allMusic[i].src}"></audio>
     </li>`;
ulTag.insertAdjacentHTML("beforeend",liTag);
}

const allLiTags = ulTag.querySelectorAll("li");
for (let j=0; j<allLiTags.length; j++){

    
    allLiTags[j].setAttribute("onclick","clicked(this)");
}

function clicked(element){
    let getLiIndex=element.getAttribute("li-index");
    musicIndex=getLiIndex;
    loadMusic(musicIndex);
    playMusic();
}
