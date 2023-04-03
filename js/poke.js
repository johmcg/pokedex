$(document).ready(function () {


    $('#suggestions').click(function () {
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
                getEvolveURL(result.name);
                var pInfo =
                    "<div> <div>" +
                    "<img class=\"rounded\" src=\"" + imgAddress + "\"/>" + "</div><div>" +
                    "Name: " + result.name + "</div><div>" +
                    "Type: " + result.types[0].type.name + "</div><div>" +
                    "Weaknesses: " + weak + "</div>" +
                    "<div id=\"evoInfo\">" + "</div><div>" +
                    "Weight: " + (result.weight * 0.2204622622).toFixed(0) + " lb </div><div>" +
                    "Height: " + (result.height * 0.3280839895).toFixed(0) + " ft </div></div>";
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
                if (tInfo.length === null) {
                    str += "No Known Weaknesses";
                }
                if (i < tInfo.length - 1) {
                    str += tInfo[i] + ", ";
                } else {
                    str += tInfo[i];
                }


            }

            callback(str);
        },
        error: function (xhr, status, error) {
            console.log(error);
        }
    });
}


function getEvolveURL(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            const evolutionChainUrl = data.evolution_chain.url;
            fetch(evolutionChainUrl)
                .then(response => response.json())
                .then(data => {
                    // Access the evolution chain data here.
                    getEvolutionDeets(evolutionChainUrl, pokemonName);

                });
        });
}

function getEvolutionDeets(EvolveURL, pokeName) {
    fetch(EvolveURL)
        .then(response => response.json())
        .then(data => {
            var evoChain = [];
            var evoData = data.chain;

            do {
                let numberOfEvolutions = evoData.evolves_to.length;

                evoChain.push({
                    "Pokemon": evoData.species.name,
                    "Stone": evoData.evolution_details.length === 0 ? null : evoData.evolution_details[0].item !== null ? evoData.evolution_details[0].item.name : null,
                    "evolutionLevel": evoData.evolution_details.length === 0 ? 1 : evoData.evolution_details[0].min_level
                });

                if (numberOfEvolutions > 0) {
                    for (let i = 1; i < numberOfEvolutions; i++) {
                        evoChain.push({
                            "Pokemon": evoData.evolves_to[i].species.name,
                            "Stone": evoData.evolves_to[i].evolution_details.length === 0 ? null : evoData.evolves_to[i].evolution_details[0].item !== null ? evoData.evolves_to[i].evolution_details[0].item.name : null,
                            "evolutionLevel": evoData.evolves_to[i].evolution_details.length === 0 ? 1 : evoData.evolves_to[i].evolution_details[0].min_level
                        })
                    }
                }

                evoData = evoData.evolves_to[0];
            } while (evoData !== undefined && (evoData.hasOwnProperty('evolves_to') || evoData.hasOwnProperty('evolution_details')));

            var evolPath = "Final Form";

            for (var i = 0; i < evoChain.length - 1; i++) {
                if (pokeName == evoChain[i].Pokemon) {
                    if (evoChain.slice(-1).pop() != evoChain[evoChain.length]) {
                        evolPath = "Evolution Path: Friendship";
                    }
                    if (evoChain[i + 1].evolutionLevel != null) {
                        evolPath = ("Evolution Level: " + evoChain[i + 1].evolutionLevel);
                    }
                    if (evoChain[i + 1].Stone != null) {
                        evolPath = ("Evolution Path: " + evoChain[i + 1].Stone);
                    }

                }
            }

            $("#evoInfo").html(evolPath);


        });
}



