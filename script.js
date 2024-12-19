function updateTimeAndDate() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let amPm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
    let timeStr = hours.toString().padStart(2, '0') + minutes;
    if (timeStr.startsWith('0')) {
        timeStr = ' ' + timeStr.slice(1);
    }
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    if (month.startsWith('0')) {
        month = ' ' + month.slice(1);
    }
    if (day.startsWith('0')) {
        day = ' ' + day.slice(1);
    }
    const displayStr = timeStr + amPm + month + day + year;
    for (let i = 0; i < 12; i++) {
        document.getElementById('char' + i + '1').textContent = displayStr[i];
        document.getElementById('char' + i + '2').textContent = displayStr[i];
    }        
}

let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{

        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{
               
               
               setTimeout(()=>{
                span.classList.remove('active');
                span.classList.add('fade');
                }, (idx + 1) * 50)
            })
                
        },4200);

        setTimeout(()=>{
            intro.style.top = '-100vh';
        }, 4500)

    })

})

updateTimeAndDate();
setInterval(updateTimeAndDate, 60000);

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var buffer1, buffer2;
var source1, source2;
var isPlaying = false;

// Load audio files
function loadAudio(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            callback(buffer);
        });
    };
    request.send();
}

loadAudio('src/audio/noise1.mp3', function(buffer) {
    buffer1 = buffer;
});

loadAudio('src/audio/noise2.mp3', function(buffer) {
    buffer2 = buffer;
});

function playBuffer(buffer) {
    var source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    return source;
}

function togglePlay() {
    if (isPlaying) {
        if (source1) {
            source1.stop();
            source1.disconnect();
            source1 = null;
        }
        if (source2) {
            source2.stop();
            source2.disconnect();
            source2 = null;
        }
        isPlaying = false;
    } else {
        source1 = playBuffer(buffer1);
        source1.start(0);
        source1.onended = function() {
            if (isPlaying) { // Check if still playing before starting source2
                source2 = playBuffer(buffer2);
                source2.loop = true;
                source2.start(0);
            }
        };
        isPlaying = true;
    }
}

// Existing code
updateTimeAndDate();
setInterval(updateTimeAndDate, 60000);