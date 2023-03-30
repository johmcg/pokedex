$(document).ready(function () {

    $('#hit').click(function () {
        var namePokemon = $('#term').val();
        getPokemon(namePokemon);

    });

    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            var namePokemon = $('#term').val();
            getPokemon(namePokemon);
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
        },
        success: function (result) {
            var imgAddress = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + result.id + ".png";
            var pInfo =
                "<div> <div>" +
                "<img src=\"" + imgAddress + "\"/>" + "</div><div>" +
                "Name: " + result.name + "</div><div>" +
                "Weight: " + (result.weight * 0.2204622622).toFixed(0) + " lb </div><div>" +
                "Height: " + (result.height * 0.3280839895).toFixed(0) + " ft </div></div>";
            $("#pokeInfo").html(pInfo);
        },
        error: function (thrownError) {
            var pInfo =
                "<div>" + "This pokemon does not exist!" + "</div>";
            $("#pokeInfo").html(pInfo);
        }
    });
}
