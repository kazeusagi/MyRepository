var String;

var SoundOfn = new Array(14);

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}


BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
}

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}

window.onload = init;
var context;
var bufferLoader;

function init() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    bufferLoader = new BufferLoader(
        context, [
      'se/bassdrum1.wav',
      'se/bassdrum2.wav',
      'se/cymbal1.wav',
      'se/cymbal2.wav',
      'se/hat1.wav',
      'se/hat2.wav',
      'se/snare1.wav',
      'se/snare2.wav',
      'se/tom1.wav',
      'se/tom2.wav',
      'se/tom3.wav'
    ],
        finishedLoading
    );

    bufferLoader.load();
}

function PlaySound(n) {
    SoundOfn[n] = context.createBufferSource();
    SoundOfn[n].gainNode = context.createGain();
    SoundOfn[n].connect(SoundOfn[n].gainNode);
    SoundOfn[n].buffer = bufferLoader.bufferList[n];
    SoundOfn[n].gainNode.connect(context.destination);
    SoundOfn[n].playing = Boolean(true);
    console.log("play:" + n)
    SoundOfn[n].start(0);
}

function StopSound(n) {
    if (SoundOfn[n].playing == true) {
        SoundOfn[n].endTime = context.currentTime + 0.1;
        console.log("stop" + n);
        SoundOfn[n].gainNode.gain.linearRampToValueAtTime(0, SoundOfn[n].endTime);
        SoundOfn[n].playing = false;
    }
}

function playinit() {
    this.playing = Boolean(false);
}


function finishedLoading(bufferList) {
    // Create two sources and play them both together
}

$(function () {
    for (var i = 0; i < 14; i++) {
        SoundOfn[i] = new playinit;
    }
    for (var i = 0; i < 4; i++) {
        console.log("n:" + i + " playing:" + SoundOfn[i].playing);
    }
    $("h1").click(function () {
        var current = 1;
        var current2 = 1;
        String = setInterval(function () {
            for (var i = 0; i <11; i++) {
                if ($(".mainpanel div:nth-child(" + current2 + ") input:nth-child(" + current + ") ").prop("checked")) {
                    StopSound(current2-1);
                    PlaySound(current2-1);
                }
                current2++;
                if(current2==12){
                    current2 = 1;
                }
            }
            console.log(current);
            current += 2;
            if(current==33){
                current=1;
            }
        }, 200)
    })
})
