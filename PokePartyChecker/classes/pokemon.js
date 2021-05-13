var typeConversion = function (type) {
    switch (type) {
        case "ノーマル":
            return Type.ノーマル;
        case "ほのお":
            return Type.ほのお;
        case "みず":
            return Type.みず;
        case "でんき":
            return Type.でんき;
        case "くさ":
            return Type.くさ;
        case "こおり":
            return Type.こおり;
        case "かくとう":
            return Type.かくとう;
        case "どく":
            return Type.どく;
        case "じめん":
            return Type.じめん;
        case "ひこう":
            return Type.ひこう;
        case "エスパー":
            return Type.エスパー;
        case "むし":
            return Type.むし;
        case "いわ":
            return Type.いわ;
        case "ゴースト":
            return Type.ゴースト;
        case "ドラゴン":
            return Type.ドラゴン;
        case "あく":
            return Type.あく;
        case "はがね":
            return Type.はがね;
        case "フェアリー":
            return Type.フェアリー;
        case "★フェアリー":
            return Type.フェアリー;
        default:
            return Type.なし;
    }
}

class Pokemon {
    constructor(id, english_name, japanese_name, type1, type2, image_path) {
        this.id = id;
        this.english_name = english_name;
        this.japanese_name = japanese_name;
        this.type = [];
        this.type.push(typeConversion(type1))
        if(type2 != ""){
            this.type.push(typeConversion(type2));
        }
        this.image = new Image()
        this.image.src = image_path;
    }



    /*-----クラス比較
    [Symbol.toPrimitive](hint){
        return this.english_name;
    }-----*/

    addPokemonById(id) {
        var div = document.createElement('div');

        div.appendChild(this.image);
        div.className = 'pokemon ' + this.english_name;
        document.getElementById(id).appendChild(div);
    }
    
    getPokemonImage(){
        var div = document.createElement('div');

        div.appendChild(this.image);
        div.className = 'pokemon ' + this.english_name;
        
        return div;
    }
}
