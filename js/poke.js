$(document).ready(function () {

    $('#suggestions').click(function () {
        let namePokemon = $('#term').val().toLowerCase();
        if (namePokemon !== '') {
            getPokemon(namePokemon);
            $('#term').val('');
        }
    });

    $('#hit').click(function () {
        let namePokemon = $('#term').val().toLowerCase();
        if (namePokemon !== '') {
            getPokemon(namePokemon);
            $('#term').val('');
        }
    });

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
        url: " https://pokeapi.co/api/v2/pokemon/" + namePokemon,
        type: "GET",
        cache: false,
        dataType: "json",
        beforeSend: function () {
            $('#pokeInfo').html("<img style=\"max-width: 20%;\n" +
                "height: auto;\"src=https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif>");
        },
        success: function (result) {
            var imgAddress = "https://img.pokemondb.net/artwork/" + result.name + ".jpg";
            var pInfo =
                "<div> <div>" +
                "<img src=\"" + imgAddress + "\"/>" + "</div><div>" +
                "Name: " + result.name + "</div><div>" +
                "Type: " + result.types[0].type.name + "</div><div>" +
                "Weight: " + (result.weight * 0.2204622622).toFixed(0) + " lb </div><div>" +
                "Height: " + (result.height * 0.3280839895).toFixed(0) + " ft </div></div>";
            console.log(result.types[0].type.name);
            $("#pokeInfo").html(pInfo);
        },
        error: function (xhr, status, error) {
            var pInfo =
                "<div>" + "This pokemon does not exist!" + "</div>";
            $("#pokeInfo").html(pInfo);
        }
    });
}

