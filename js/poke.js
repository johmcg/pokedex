$(document).ready(function () {

/*
    $('#suggestions').click(function () {
        let namePokemon = $('#term').val().toLowerCase();
        if (namePokemon !== '') {
            getPokemon(namePokemon);
            $('#term').val('');
        }
    }); */



    $(document).on('keypress', function (e) {
        if (e.which === 13) {
            let namePokemon = $('#term').val().toLowerCase();
            if (namePokemon !== '') {
                getPokemon(namePokemon);
                $('#term').val('');
            }
        }
    });


});

function getPokemon(namePokemon) {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/" + namePokemon,
        type: "GET",
        cache: false,
        dataType: "json",
        beforeSend: function () {
            $('#pokeInfo').html("<img class=\"rounded\" style=\"max-width: 20%; height: auto;\" src=https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif>");
        },
        success: function (result) {
            var imgAddress = "https://img.pokemondb.net/artwork/" + result.name + ".jpg";
            getWeakness(result.types[0].type.name, function (weak) {
                var pInfo;
                pInfo = "<div class=\"card \">\n" +
                    " <img class=\"card-img-top h-10 \" src=\"" + imgAddress + "\" alt=\"Card image cap\">\n" +
                    "  <div class=\"card-body\">\n" +
                    "    <h5 class=\"card-title\">" + "Name: " + result.name + "</h5>\n" +
                    "    <p class=\"card-text\">Type: " + result.types[0].type.name + "</p>\n" +
                    "    <p class=\"card-text\">Weaknesses: " + weak + "</p>\n" +
                    "    <p class=\"card-text\">Weight: " + (result.weight * 0.2204622622).toFixed(0) + " lb</p>\n" +
                    "    <p class=\"card-text\">Height: " + (result.height * 0.3280839895).toFixed(0) + " ft</p>\n" +
                    "  </div>\n" +
                    "</div>";


                $("#pokeInfo").html(pInfo);
            });
        },
        error: function (xhr, status, error) {
            var pInfo = "<div>" + "This pokemon does not exist!" + "</div>";
            $("#pokeInfo").html(pInfo);
        }
    });
}


function getWeakness(typePokemon, callback) {
    $.ajax({
        url: "https://pokeapi.co/api/v2/type/" + typePokemon,
        type: "GET",
        cache: false,
        dataType: "json",
        success: function (result) {
            var tInfo = [];
            for (var i = 0; i < result.damage_relations.double_damage_from.length; i++) {
                tInfo.push(result.damage_relations.double_damage_from[i].name);
            }

            var str = "";
            for (var i = 0; i < tInfo.length; i++) {
                if (tInfo.length === null){str += "No Known Weaknesses";
                }
                if (i < tInfo.length-1){str += tInfo[i] + ", ";}
                else {str += tInfo[i];}


            }

            callback(str);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}