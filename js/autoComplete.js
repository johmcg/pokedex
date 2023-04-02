let inputField = document.getElementById('term');
let ulField = document.getElementById('datalistOptions');
inputField.addEventListener('input', changeAutoComplete);
ulField.addEventListener('click', selectItem);

function changeAutoComplete({target}) {
    let data = target.value;
    ulField.innerHTML = ``;
    if (data.length) {
        let autoCompleteValues = autoComplete(data);
         }
}

function autoComplete(inputValue) {

    var pokeList = [];

    // new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Opening txt file
    xhr.open('GET', 'docs/pokeNames.txt', true);

    // Set response type to 'text'
    xhr.responseType = 'text';

    // Step 4: txt file is loaded, parsed
    xhr.onload = function () {
        if (xhr.status === 200) {
            pokeList = xhr.response.split('\n');
            console.log(pokeList.length);
            let filteredList = pokeList.filter(
                (value) => value.toLowerCase().includes(inputValue.toLowerCase())
            );
            filteredList.slice(0, 3).forEach(value => {
                addItem(value);
            });
        }
    };

    // Step 5: Request Sent
    xhr.send();


    return [];
}

function addItem(value) {
    ulField.innerHTML = ulField.innerHTML + ` <option value=${value}>`;
}





function selectItem({target}) {
    if (target.tagName === 'LI') {
        inputField.value = target.textContent;
        ulField.innerHTML = ``;
    }
}

