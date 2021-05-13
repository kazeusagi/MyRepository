var timer;
var metronorm;
$(function(){
	$(document).on("click", "#bpmimage div", function(){
		$(this).toggleClass("strong");
		console.log($(this).index())
		if($(this).hasClass("strong")){
			$(this).css({
				"background-color":"darkred"
			});
		}else{
			$(this).css({
				"background-color":"darkblue"
			});
		}
	});
	$(".plus input").click(function(){
		stock = parseInt($("p.bpm").text())+parseInt($(this).val());
		if(stock > 255){
			$("p.bpm").text("255")
		}else{
			$("p.bpm").text(stock);
		}
	});
	$(".minus input").click(function(){
		stock = parseInt($("p.bpm").text())+parseInt($(this).val());
		if(stock < 50){
			$("p.bpm").text("50")
		}else{
			$("p.bpm").text(stock);
		}
	});
	$("#bpbbutton input").click(function(){
		stock = parseInt($("#bpbbox span").text());
		if($(this).val()=="+1"){
			if(parseInt($("#bpbbox span").text())<16){
				$("#bpbbox span").text(stock+1)
				$("#bpmimage").append("<div></div>");
			}
		}
		else if($(this).val()=="-1"){
			if(parseInt($("#bpbbox span").text())>1){
				$("#bpbbox span").text(stock-1)
				$("#bpmimage div:last-child").remove();
			}
		}
		
	})
	$("input#bpmstart").click(function(){
		if($(this).val()=="再生"){
			$("input#bpmstart").css({
				"border-color":"darkblue",
				"background-color":"darkred"
			});
			var sec = parseInt($("#sec").val());
			var min = parseInt($("#min").val());
			var haku = 1;
			var bpb = parseInt($("#bpbbox span").text());
			var bpm = 60000 / parseInt($("p.bpm").text());
			$(this).val("停止");
			if(sec == 0 && min == 0){
			}else{
				timer = setInterval(function(){
					if(sec == 0){
						min = parseInt($("#min").val());
						if(min == 0){
							reset();
						}else{
							sec=59
							min--;
							$("#min").val(min)
						}
					}else{
						sec--;
					}
					$("#sec").val(sec)
				},1000)
			}
			metronorm = setInterval(function(){
				for(var i = 0;i<bpb;i++){
					if($("#bpmimage div").eq(i).hasClass("strong")){
						$("#bpmimage div").eq(i).css({
							"background-color":"darkred",
							"border-color":"#888"
						});
					}else{
						$("#bpmimage div").eq(i).css({
							"background-color":"darkblue",
							"border-color":"#888"
						});
					}
				}
				if($("#bpmimage div").eq(haku-1).hasClass("strong")){
					$("#sound_s").get(0).play();
					$("#bpmimage div").eq(haku-1).css({
						"background-color":"red",
						"border-color":"#fff"
					});
				}else{
					$("#sound_w").get(0).play();
					$("#bpmimage div").eq(haku-1).css({
						"background-color":"blue",
						"border-color":"#fff"
					});
				}
				if(haku == bpb){
					haku = 1;
				}else{
					haku++;
				}
			}, bpm);
		}else if($(this).val()=="停止"){
			reset();
		}
	})
})
function reset(){
	var bpb = parseInt($("#bpbbox span").text());
	clearInterval(metronorm);
	clearInterval(timer);
	$("input#bpmstart").val("再生");
	for(var i = 0;i<bpb;i++){
		if($("#bpmimage div").eq(i).hasClass("strong")){
			$("#bpmimage div").eq(i).css({
				"background-color":"darkred",
				"border-color":"#888"
			});
		}else{
			$("#bpmimage div").eq(i).css({
				"background-color":"darkblue",
				"border-color":"#888"
			});
		}
	}
	$("input#bpmstart").css({
		"border-color":"blue",
		"background-color":"red"
	});
}