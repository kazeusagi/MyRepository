var pokemon_list = [];

$.ajax({
    url: "php/request.php",
    type: "POST",
    data: {
        my_list: post_data["me"],
        enemy_list: post_data["enemy"]
    }
}).done(function (data, textStatus, xhr) {
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
    }

    switch (post_data["option"]) {
        case "1":
            createTypeResultTable();
            break;
        case "2":
            createOverrallResultTable();
            break;
        default:
            alert("無効なリクエスト");
            return false;

    }

}).fail(function (xhr, textStatus, errorThrown) {
    alert("ajax通信に失敗しました");
});


$(function () {
    $(document).on({
        "click": function () {
            switch ($(this).text()) {
                case "×":
                    $(this).text("△");
                    $(this).css({
                        "color": "#5eb3c7"
                    })
                    break;
                case "△":
                    $(this).text("○");
                    $(this).css({
                        "color": "#5ec776"
                    })
                    break;
                case "○":
                    $(this).text("◎");
                    $(this).css({
                        "color": "#dddd54"
                    })
                    break;
                case "◎":
                    $(this).text("☆");
                    $(this).css({
                        "color": "#ff6060"
                    })
                    break;
                case "☆":
                    $(this).text("×");
                    $(this).css({
                        "color": "#7e6bce"
                    })
                    break;
            }
        }
    }, "td")
})

var checkCompatibility = function (my_pokemon_list, enemy_pokemon_list) {
    var result = new Array(my_pokemon_list.length);
    for (var i = 0; i < my_pokemon_list.length; i++) {
        result[i] = new Array(enemy_pokemon_list.length).fill(0);
    }

    for (var m = 0; m < my_pokemon_list.length; m++) {
        for (var e = 0; e < enemy_pokemon_list.length; e++) {
            var my_pokemon = my_pokemon_list[m];
            var enemy_pokemon = enemy_pokemon_list[e];

            var my_compability_list = [];
            var enemy_compability_list = [];

            for (var my_type in my_pokemon.type) {
                var compability = 1;
                for (var enemy_type in enemy_pokemon.type) {
                    compability *= type_compatibility_table[my_pokemon.type[my_type]][enemy_pokemon.type[enemy_type]];
                }
                my_compability_list.push(compability);
            }
            my_compability = Math.max.apply(null, my_compability_list);

            for (var enemy_type in enemy_pokemon.type) {
                var compability = 1;
                for (var my_type in my_pokemon.type) {
                    compability *= type_compatibility_table[enemy_pokemon.type[enemy_type]][my_pokemon.type[my_type]];
                }
                enemy_compability_list.push(compability);
            }
            enemy_compability = Math.max.apply(null, enemy_compability_list);

            if (my_compability == 0) {
                if (enemy_compability == 0) {
                    result[m][e] = "○";
                } else {
                    result[m][e] = "×";
                }
            } else {
                if (enemy_compability == 0) {
                    result[m][e] = "☆";
                } else {
                    compability = my_compability / enemy_compability;
                    if (0 <= compability && compability < 0.5) {
                        result[m][e] = "×";
                    } else if (0.5 <= compability && compability < 1) {
                        result[m][e] = "△";
                    } else if (1 <= compability && compability < 2) {
                        result[m][e] = "○";
                    } else if (2 <= compability && compability < 4) {
                        result[m][e] = "◎";
                    } else if (4 <= compability) {
                        result[m][e] = "☆";
                    }
                }
            }
        }
    }
    return result;
}

var createTypeResultTable = function () {
    var array = post_data["me"].split(" ");

    var my_pokemon_list = []
    var enemy_pokemon_list = []

    for (var idx in array) {
        my_pokemon_list.push(pokemon_list.find((v) => v.english_name === array[idx]));
    }

    array = post_data["enemy"].split(" ");
    for (var idx in array) {
        enemy_pokemon_list.push(pokemon_list.find((v) => v.english_name === array[idx]));
    }
    var compability = checkCompatibility(my_pokemon_list, enemy_pokemon_list);
    var rows = my_pokemon_list.length;
    var columns = enemy_pokemon_list.length;
    var tableJQ = $('#table');
    var tr = $('<tr></tr>').appendTo(tableJQ);
    var th = $('<th id="logo"></th>').appendTo(tr);
    for (var c = 0; c < columns; c++) {
        var th = $('<th></th>').appendTo(tr);
        var image = $(enemy_pokemon_list[c].getPokemonImage().cloneNode(true)).appendTo(th);
    }
    for (var r = 0; r < rows; r++) {
        var tr = $('<tr></tr>').appendTo(tableJQ);
        var th = $('<th></th>').appendTo(tr);
        var image = $(my_pokemon_list[r].getPokemonImage().cloneNode(true)).appendTo(th);
        for (var c = 0; c < columns; c++) {
            var td = $('<td>' + compability[r][c] + '</td>').appendTo(tr);
            switch (compability[r][c]) {
                case "×":
                    td.css({
                        "color": "#7e6bce"
                    });
                    break;
                case "△":
                    td.css({
                        "color": "#5eb3c7"
                    });
                    break;
                case "○":
                    td.css({
                        "color": "#5ec776"
                    });
                    break;
                case "◎":
                    td.css({
                        "color": "#dddd54"
                    });
                    break;
                case "☆":
                    td.css({
                        "color": "#ff6060"
                    });
                    break;
            }
        }
    }
}

var createOverrallResultTable = function () {
    $('body').append("未実装です。");
}

var edit_mode = function () {
    alert("表をクリックすると結果を編集できます。");
}

var createTableImage = function (selector) {
    $(".content").empty();
    img = $('#table');
    img.css({"background-color" : "black"})
    html2canvas(img[0]).then(canvas => {
        $(".content")[0].appendChild(canvas);
    });
    img.css({"background-color" : "transparent"})
}
