const searchAttr = 'country',
    passContainer = document.createElement('div'),
    controlContainer = document.createElement('div'),
    scoreContainer = document.createElement('div'),
    wrap = document.getElementById('wrap'),
    btnPlay = document.createElement('button'),
    inputLetter = document.createElement('input'),
    aboutDiv = document.createElement('div');

let game = {
    score: 0,
    life: 5,
    remainingLetters: 99
}

let randomCountry = getRandomCountry(data);

addInitalScreen();

function validateLetter() {
    toggleErrorHighlight();
    if (hasValue(inputLetter)) {
        let index = -1,
            results = [];

        while ((index = randomCountry.toUpperCase().indexOf(inputLetter.value.toUpperCase(), index + 1)) > -1) {
            results.push(index);
        }

        if (results.length) {
            results.forEach((result) => {
                revealLetter(result);
            });
            updateScore();
            clearInput();
            focusInput();
        } else {
            loseLife();
        }
    }
}

function hasValue(input) {
    return !!input.value;
}

function revealLetter(index) {
    letter = document.getElementById(`letter-${index}`);

    if (letter.innerHTML !== randomCountry.charAt(index)) {
        letter.innerHTML = randomCountry.charAt(index);
        letter.classList.remove('hidden');
        game.score += 1;
        game.remainingLetters -= 1;
    }
    if (game.remainingLetters === 0) {
        nextLevel();
    }
}

function nextLevel() {
    game.life += 5;
    resetBoard();
    setupNewCountry();
}

function updateScore() {
    let scoreSpan = document.getElementById('scoreSpan');
    scoreSpan.innerHTML = `Wynik: ${game.score}`;
}

function updateLives() {
    let lifeSpan = document.getElementById('lifeSpan');
    lifeSpan.innerHTML = `Życia: ${game.life}`;
}

function loseLife() {
    game.life -= 1;
    if (game.life > 0) {
        updateLives();
        toggleErrorHighlight(true);
    } else {
        resetGame();
        toggleErrorHighlight();
    }
}

function focusInput() {
    inputLetter.focus();
}

function clearInput() {
    inputLetter.value = '';
    toggleErrorHighlight();
}

function toggleErrorHighlight(set = false) {
    inputLetter.classList.toggle('input--wrong', set);
}

function resetGame() {
    game.life = 5;
    game.score = 0;

    resetBoard();
    setupNewCountry();
}

function resetBoard() {
    wrap.innerHTML = '';
    passContainer.innerHTML = '';
    scoreContainer.innerHTML = '';
    controlContainer.innerHTML = '';
    aboutDiv.innerHTML = '';
    letter.innerHTML = '';
}

function setupNewCountry() {
    randomCountry = getRandomCountry(data);
    game.remainingLetters = randomCountry.length;
    addInitalScreen();
}

function addInitalScreen() {
    passContainer.id = 'passContainer';
    controlContainer.id = 'controlContainer';
    scoreContainer.id = 'scoreContainer';

    let currentRow = document.createElement('div');
    currentRow.classList.add('passRow');

    createPasswordLetters(currentRow);
    trimCountry();

    let lifeSpan = document.createElement('span'),
        scoreSpan = document.createElement('span');

    lifeSpan.id = 'lifeSpan';
    scoreSpan.id = 'scoreSpan';

    lifeSpan.innerHTML = `Życia: ${game.life}`;
    scoreSpan.innerHTML = `Wynik: ${game.score}`;

    scoreContainer.append(lifeSpan);
    scoreContainer.append(scoreSpan);

    inputLetter.placeholder = 'Wpisz literę';
    inputLetter.maxLength = 1;

    btnPlay.innerHTML = 'Graj';
    btnPlay.addEventListener('click', validateLetter);

    inputLetter.addEventListener('focus', () => toggleErrorHighlight());

    let authorBtn = document.createElement('button');
    authorBtn.id = 'authorBtn';
    authorBtn.innerHTML = "Autor";
    authorBtn.addEventListener('click', showAuthor);

    controlContainer.appendChild(inputLetter);
    controlContainer.appendChild(btnPlay);
    controlContainer.appendChild(authorBtn);

    wrap.appendChild(passContainer);
    wrap.appendChild(controlContainer);
    wrap.appendChild(scoreContainer);

    createAuthorDiv();
}

function createPasswordLetters(currentRow) {
    let index = 0;
    Array.from(randomCountry).forEach((letter) => {
        if (letter !== ' ') {
            let letterSpan = document.createElement('span');
            letterSpan.id = `letter-${index.toString()}`;
            letterSpan.innerText = 'X';
            letterSpan.classList.add('letter');
            letterSpan.classList.add('hidden');
            letterSpan.innerHTML = 'X';
            currentRow.appendChild(letterSpan);
            index += 1;
        } else {
            passContainer.appendChild(currentRow);
            currentRow = document.createElement('div');
            currentRow.classList.add('passRow');
        }
        passContainer.appendChild(currentRow);
    });
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

function trimCountry() {
    randomCountry = randomCountry.replaceAll(' ', '');
    game.remainingLetters = randomCountry.length;
}

function createAuthorDiv() {
    let author = document.createElement('div'),
        extras = document.createElement('div');

    author.innerHTML = 'Jakub Przydalski, 2248050';
    extras.innerHTML = 'Koło fortuny 2021 wersja 1.0'

    aboutDiv.id = 'author';
    aboutDiv.append(author);
    aboutDiv.append(extras);
    document.body.append(aboutDiv)
}

function showAuthor() {
    let authorDiv = document.getElementById('author');

    if (authorDiv.style.maxHeight) {
        authorDiv.style.maxHeight = null;
    } else {
        authorDiv.style.maxHeight = "60%";
    }
}