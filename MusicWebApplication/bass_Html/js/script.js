var String;

var SoundOfn=new Array(4);

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
      'se/0.wav',
      'se/1.wav',
      'se/2.wav',
      'se/3.wav',
      'se/4.wav',
      'se/5.wav',
      'se/6.wav',
      'se/7.wav',
      'se/8.wav',
      'se/9.wav',
      'se/10.wav',
      'se/11.wav',
      'se/12.wav',
      'se/13.wav',
      'se/14.wav',
      'se/15.wav',
      'se/16.wav',
      'se/17.wav',
      'se/18.wav',
      'se/19.wav',
      'se/20.wav',
      'se/21.wav',
      'se/22.wav',
      'se/23.wav',
      'se/24.wav',
      'se/25.wav',
      'se/26.wav',
      'se/27.wav',
      'se/28.wav',
      'se/29.wav',
      'se/30.wav',
      'se/31.wav',
      'se/32.wav',
      'se/33.wav',
      'se/34.wav',
      'se/35.wav',
      'se/36.wav',
    ],
		finishedLoading
	);

	bufferLoader.load();
}

function PlaySound(flet,n) {
	SoundOfn[n] = context.createBufferSource();
	SoundOfn[n].gainNode = context.createGain();
	SoundOfn[n].connect(SoundOfn[n].gainNode);
	SoundOfn[n].buffer = bufferLoader.bufferList[parseInt(parseInt(flet)+(3-n)*5)];
	SoundOfn[n].gainNode.connect(context.destination);
	SoundOfn[n].playing=Boolean(true);
	console.log("play:" + n)
	SoundOfn[n].start(0);
}

function StopSound(n) {
	if(SoundOfn[n].playing==true){
		SoundOfn[n].endTime = context.currentTime+0.1;
		console.log("stop" + n);
		SoundOfn[n].gainNode.gain.linearRampToValueAtTime(0, SoundOfn[n].endTime);
		SoundOfn[n].playing=false;
	}
}

function playinit(){
	this.playing=Boolean(false);
}


function finishedLoading(bufferList) {
	// Create two sources and play them both together
}

$(function () {
	for(var i=0;i<4;i++){
		SoundOfn[i] = new playinit;
	}
	for(var i=0;i<4;i++){
		console.log("n:" + i + " playing:" + SoundOfn[i].playing);
	}
	//start
	var bpb=0;
	$(document).on("click","#start_2",function(){
		if($(this).val()=="再生"){
			$(this).val("停止");
			var bpm = 60000 / $("#bpm").val() * 4 / bpb;
			console.log(bpm);
			var current = 2;
			var i = 0;
			var flet = 0;
			String = setInterval(function(){
				for(var n=4;n>0;n--){
					flet=$("#mathbox table:nth-child("+(current)+") tr:nth-child(" + (n+1) + ") td:nth-child(" + (i+1) + ") input[type=text]").val();
					if(flet=="-"){
						StopSound(n-1);
					}else if(flet=="~"){
						console.log("~~~")
					}else if(flet >=0 && flet <= 21){
						console.log(flet);
						StopSound(n-1);
						PlaySound(flet,n-1);
					}
				}
				i++;
				if(i==bpb){
					current+=2;
					i=0;
					if(current==$("#mathbox table").length*2+2){
						current=2;
					}
				}
			}, bpm);
		}
		else if($(this).val()=="停止"){
			$(this).val("再生");
			clearInterval(String)
		}
	});
	
	$(document).on("click","input[type=text]",function(){
		$(this).val("");
	})
	
	$(document).on("click","#add",function(){
		page++;
		$("#mathbox").append("<p>" + page + "ページ目</p>")
		$("#math").clone().appendTo("#mathbox")
	})
	$("#start").click(function () {
		page=1;
		bpb = $("input[type=radio]:checked").val();
		console.log(bpb)
		for (var i = bpb / 2; i > 0; i--) {
			$("#pick").append("<th>D</th><th>U</th>");
		}
		for (var i = 0; i < 4; i++) {
			for (var n = 0; n < bpb; n++) {
				$("table tr").eq(i + 1).append("<td><input type='text' maxlength='2' value='-'></td>")
			}
		}
		$("#bpb_init").empty();
		$("#bpb_init").append('<label id="bpmlabel">BPM:</label><input type="number" value="100" id="bpm" class="box" min="60" max="255">')
		$("#bpb_init").append("<input id='start_2' type='button' value='再生'>")
		$("#bpb_init").append("<input id='add' type='button' value='追加'>")
		if (bpb == 8) {
			$("th:nth-child(2n)").css({
				"border-right": "5px solid black"
			});
			$("td:nth-child(2n)").css({
				"border-right": "5px solid black"
			});
		}
	});
})
