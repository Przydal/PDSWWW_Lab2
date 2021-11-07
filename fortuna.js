const searchAttr = 'country',
    passContainer = document.createElement('div'),
    controlContainer = document.createElement('div'),
    wrap = document.getElementById('wrap'),
    btnPlay = document.createElement('button'),
    inputLetter = document.createElement('input');

var game = {
    zdobyte: 0,
    zycia: 5,
}

var randomCountry = getRandomCountry(data);
console.log(randomCountry);

addInitalScreen();

function validateLetter() {
    if (hasValue(inputLetter)) {
        const letterToCheck = inputLetter.value;
        console.log(randomCountry.indexOf(letterToCheck));
    }
}

function hasValue(input) {
    return !!input.value;
}

function addElement(mydiv) {

    // newDiv = document.createElement("span");
    // newDiv.innerHTML = "jasiokotek";

    // my_div = document.getElementById(mydiv);
    // document.body.insertBefore(newDiv, my_div);

    // newDiv2 = document.createElement("span");
    // newDiv2.innerHTML = "jasiokotek2";
    // document.body.insertBefore(newDiv2, my_div.nextSibling);

    // newDiv.classList.add("mystyle");
}

function addInitalScreen() {
    passContainer.id = "passContainer";
    controlContainer.id = "controlContainer";

    for (var i = 0; i < randomCountry.length; i += 1) {
        var letterSpan = document.createElement('span');
        letterSpan.id = `letter-${i.toString()}`;
        letterSpan.innerText = 'X';
        letterSpan.classList.add('letter');
        passContainer.appendChild(letterSpan);
    }
    inputLetter.placeholder = "Wpisz literę";
    inputLetter.maxLength = 1;
    btnPlay.innerHTML = "Graj";
    btnPlay.addEventListener('click', validateLetter)

    wrap.appendChild(passContainer);
    controlContainer.appendChild(inputLetter);
    controlContainer.appendChild(btnPlay);
    wrap.appendChild(controlContainer);

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCountry(data) {
    const index = getRandomInt(0, data.length);
    return data[index][searchAttr];
}