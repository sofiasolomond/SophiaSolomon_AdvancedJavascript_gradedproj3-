let TIME_LIMIT = 60;
let time_left = TIME_LIMIT
let time_elapsed = 0
let current_test_content = 0;
let scoreword = 0
let scorecharacter = 0
let errorcount = 0
let wordcount = 0
let charactercount = 0
let joinwords = ""

// Get the values of the DOM Elements
let dummytext_div = document.getElementById('dummycontent')
let input_test_area = document.getElementById('testinput')
let wordcounttext = document.getElementById('wpm')
let charactercounttext = document.getElementById('cpm')
let accuracytext = document.getElementById('accuracy')
let error = document.getElementById('errors')
let timer_text = document.getElementById('timertext')
let hide_text = document.getElementById('hide')
let reset_btn = document.getElementById('reset')
let flag = true
var listofwords

//Content of the Dummy text that will be dispalyed for typing test
let test_content = [
    "The Avengers are a fictional team of super heroes and the protagonists of the Marvel Cinematic Universe media franchise, based on the Marvel Comics team of the same name created by Stan Lee and Jack Kirby in 1963. Founded by S.H.I.E.L.D. Director Nick Fury, the team is a United States-based organization composed primarily of superpowered and gifted individuals, described as Earth's Mightiest Heroes, who are committed to the worlds protection from a variety of threats. The Avengers are depicted as operating in the state of New York; originally operating from the Avengers Tower in Midtown Manhattan and subsequently from the Avengers Compound in Upstate New York.",
    "Avengers: Infinity War is a 2018 American superhero film based on the Marvel Comics superhero team the Avengers. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the sequel to The Avengers (2012) and Avengers: Age of Ultron (2015), and the 19th film in the Marvel Cinematic Universe (MCU). Directed by Anthony and Joe Russo and written by Christopher Markus and Stephen McFeely. In the film, the Avengers and the Guardians of the Galaxy attempt to prevent Thanos from collecting the six all-powerful Infinity Stones as part of his quest to kill half of all life in the universe.",
    "The Guardians of the Galaxy are a band of outlaws who joined to protect the galaxy from threats. The group's founding members are Star-Lord, Gamora, Drax, Rocket, and Groot. The team's membership is later expanded with the addition of Mantis while temporarily aided by Yondu Udonta and Nebula in their fight against Ego. Kraglin also assists the team in the final confrontation.[28] Four years later, they aid Thor and the Avengers in confronting Thanos in his attempt to collect the six Infinity Stones. Thanos succeeds in collecting all of Stones, murdering Gamora in the process, and disintegrates half of all life in the universe, with Star-Lord, Drax, Mantis, and Groot among his victims, with only Rocket and Nebula spared",
    "Marvel Comics Avengers are a large group of individual super heroes that have joined forces to protect the world from threats they cannot face alone. The idea of individual costumed champions banding together for the greater good is a simple but powerful one, and by aligning the Avengers haven't just protected their world -- they've changed it. There are now super teams all over the globe with an interest in protecting the people of their home nations and the world from weird and fantastic menaces.",
    "Doctor Stephen Strange is a fictional character appearing in American comic books published by Marvel Comics. Created by Steve Ditko with Stan Lee. Doctor Strange serves as the Sorcerer Supreme, the primary protector of Earth against magical and mystical threats. The character begins as an extremely talented but egotistical surgeon who loses the ability to operate, after a car crash severely damaged his hands beyond repair. Searching the globe for healing, he encounters the Ancient One, the Sorcerer Supreme. Strange becomes his student, and learns to be a master of both the mystical and the martial arts."
]

// This function will load the dummy text for typing
function updateTestContent() {
    const previous_content = document.querySelectorAll('.testcontent');
    previous_content.forEach(element => {
        dummytext_div.removeChild(element)
    });
    currentcontent = test_content[current_test_content]
    totalcountofcharacter = currentcontent.split('').length
    hide_text.style.visibility = 'hidden';
    newPara = document.createElement('p')
    newPara.className += "testcontent";
    newPara.innerText = currentcontent
    dummytext_div.appendChild(newPara);
    dummytext_div.style.visibility = 'visible'
    if (current_test_content < test_content.length - 1)
        current_test_content++
    else
        current_test_content = 0
    reset_btn.style.display = 'block'
    listofwords = currentcontent.split(' ')
    processTest()
}

function processTest() {
    if (flag) {
        flag = false
        timer = setInterval(updateTimer, 1000);
    }
    // Add Event listener to get the key pressed while runnign the test
    input_test_area.addEventListener('keypress', keyEventHandler);

}
function keyEventHandler(keyEvent) {
    listofcharacter = listofwords[wordcount].split('')
    if (keyEvent.key == listofcharacter[charactercount]) {
        scorecharacter++
        joinwords += keyEvent.key
        charactercount++
    }
    else {
        if (keyEvent.key == " ") {
            charactercount = 0
            if (joinwords == listofwords[wordcount]) {
                scoreword++
            }
            joinwords = ""
            wordcount++
        }
        else {
            errorcount++
            charactercount++
        }
    }
    calculateScore()
}


// Calculat teh score on every word change 
function calculateScore() {
    accuracy = Math.round((scorecharacter / totalcountofcharacter) * 100)
    accuracytext.value = accuracy
    error.value = errorcount
    wpm = scoreword
    wordcounttext.value = wpm
    cpm = scorecharacter
    charactercounttext.value = cpm
}

function startGame() {
    // This will disable backspace during the  test
    input_test_area.addEventListener('keydown', function (e) {
        if (e.keyCode == 8) {
            e.preventDefault();
        }
    })
    updateTestContent()
    input_test_area.disabled = false;
}

function resetGame() {
    clearInterval(timer)
    input_test_area.value = ""
    resetValues();
    dummytext_div.style.visibility = 'hidden'
    startGame()
}

function resetValues() {
    wordcount = 0
    charactercount = 0
    joinwords = ""
    time_elapsed = 0
    scoreword = 0
    scorecharacter = 0
    errorcount = 0
    time_left = TIME_LIMIT;
    accuracy = 0
    flag = true
    accuracytext.value = 0
    wordcounttext.value = 0
    charactercounttext.value = 0
    timer_text.value = time_left + "s";
    error.value = 0
}


function updateTimer() {
    if (time_left > 0) {
        // decrease the current time left
        time_left--;
        // increase the time elapsed
        time_elapsed++;
        // update the timer text
        timer_text.value = time_left + "s";
        if (time_left < 10) {
            timer_text.style.color = "red"
        }
    }
    else {
        // finish the game
        clearInterval(timer)
        finishTest();
    }
}

function finishTest() {

    // stop the timer
    clearInterval(timer);

    // disable the input area
    input_test_area.disabled = true;
    hide_text.style.visibility = 'visible'
    hide_text.innerText = "Click on Restart Button to begin the test"
    const previous_content = document.querySelectorAll('.testcontent');
    previous_content.forEach(element => {
        dummytext_div.removeChild(element)
    });
    reset_btn.style.display = "block";
    input_test_area.removeEventListener('keypress', keyEventHandler)
    alert("Test Finished")
}

