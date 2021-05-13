var pokemon_list = [];
var type_string = [
    "ノーマル",
    "ほのお",
    "みず",
    "でんき",
    "くさ",
    "こおり",
    "かくとう",
    "どく",
    "じめん",
    "ひこう",
    "エスパー",
    "むし",
    "いわ",
    "ゴースト",
    "ドラゴン",
    "あく",
    "はがね",
    "フェアリー",
    ""
];

$.get("./php/request.php", {
    english_name: $("[type=english_name]").val()
}, function (data) {
    var info = JSON.parse(data);
    var length = Object.keys(info).length;
    for (var i = 0; i < length; i++) {
        var id = info[i]["id"];
        var english_name = info[i]["english_name"];
        var japanese_name = info[i]["japanese_name"];
        var type1 = info[i]["type1"];
        var type2 = info[i]["type2"];
        var image_path = "http://localhost/PokePartyChecker/image/poke/english_name/" + english_name + ".png"
        var poke = new Pokemon(id, english_name, japanese_name, type1, type2, image_path);
        pokemon_list.push(poke);
        pokemon_list[i].addPokemonById("pokemon_box");
    }
    console.log(pokemon_list);
});

$(function () {
    $(document).on({
        "mouseenter": function () {
            var target_name = $(this).attr("class").split(" ")[1];
            var target = pokemon_list.find((v) => v.english_name === target_name)
            document.getElementById("id").textContent = target["id"];
            document.getElementById("english_name").textContent = target["english_name"];
            document.getElementById("japanese_name").textContent = target["japanese_name"];
            if(target.type.length == 0){
                console.log(target);
            }
            document.getElementById("type1").textContent = type_string[target.type[0]];
            if(target.type.length == 2){
                document.getElementById("type2").textContent = type_string[target.type[1]];
            }else{
                document.getElementById("type2").textContent = "";
            }
        },
        "click": function () {
            var target_name = "."+$(this).attr("class").split(" ")[1]+":last";
            var target = $(target_name);
            var add_id = $("input[name='add']:checked").val();
            console.log(add_id);
            if(add_id == "my_pokemon"){
                $("#description_me").css({
                    "display": "none"
                })
                if(target.hasClass("me")){
                    $("#my_pokemon "+target_name).remove();
                }else{
                    document.getElementById(add_id).appendChild(target[0].cloneNode(true))
                }
                target.toggleClass("me");
            }
            else if(add_id == "enemy_pokemon"){
                $("#description_enemy").css({
                    "display": "none"
                })
                if(target.hasClass("enemy")){
                    $("#enemy_pokemon "+target_name).remove();
                }else{
                    document.getElementById(add_id).appendChild(target[0].cloneNode(true))
                }
                target.toggleClass("enemy");
            }
            
        }
    }, ".pokemon")
})

var post = function(){
    var enemy_names = "";
    var my_names = "";
    $("#my_pokemon").find(".pokemon").each(function(index, element){
        my_names += element.getAttribute("class").split(" ")[1]+" ";
    }); $("#enemy_pokemon").find(".pokemon").each(function(index, element){
        enemy_names += element.getAttribute("class").split(" ")[1]+" ";
    });
    
    if(my_names=="" || enemy_names==""){
        alert("最低でも1匹以上のポケモンを両方のパーティーにセットしてください。");
        return false;
    }
    
    if($(".option").val()==""){
        alert("どの相性を判定するか決めてください");
        return false;
    }
    
    document.forms.post_data.option.value = $(".option").val();
    document.forms.post_data.me.value = my_names.slice(0, -1);
    document.forms.post_data.enemy.value = enemy_names.slice(0, -1);
    var form = document.forms["post_data"];
    window.open("../table/table.php", "table")
    form.target = "table";
    form.submit();
    
    return true;
    
}