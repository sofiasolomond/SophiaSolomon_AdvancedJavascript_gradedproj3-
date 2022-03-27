let TIME_LIMIT = 30;
let time_left = TIME_LIMIT
let time_elapsed = 0
let test_content = [
    "The Avengers are a fictional team of superheroes and the protagonists of the Marvel Cinematic Universe media franchise, based on the Marvel Comics team of the same name created by Stan Lee and Jack Kirby in 1963. Founded by S.H.I.E.L.D. Director Nick Fury, the team is a United States-based organization composed primarily of superpowered and gifted individuals, described as Earth's Mightiest Heroes, who are committed to the worlds protection from a variety of threats. The Avengers are depicted as operating in the state of New York; originally operating from the Avengers Tower in Midtown Manhattan and subsequently from the Avengers Compound in Upstate New York.",
    "Avengers: Infinity War is a 2018 American superhero film based on the Marvel Comics superhero team the Avengers. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the sequel to The Avengers (2012) and Avengers: Age of Ultron (2015), and the 19th film in the Marvel Cinematic Universe (MCU). Directed by Anthony and Joe Russo and written by Christopher Markus and Stephen McFeely, the film features an ensemble cast including Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans, Scarlett Johansson, Benedict Cumberbatch, Don Cheadle, Tom Holland, Chadwick Boseman, Paul Bettany, Elizabeth Olsen, Anthony Mackie, Sebastian Stan, Danai Gurira, Letitia Wright, Dave Bautista, Zoe Saldaña, Josh Brolin, and Chris Pratt. In the film, the Avengers and the Guardians of the Galaxy attempt to prevent Thanos from collecting the six all-powerful Infinity Stones as part of his quest to kill half of all life in the universe.",
    "The Guardians of the Galaxy are a band of outlaws who joined to protect the galaxy from threats. The group's founding members are Star-Lord, Gamora, Drax, Rocket, and Groot. The team's membership is later expanded with the addition of Mantis while temporarily aided by Yondu Udonta and Nebula in their fight against Ego. Kraglin also assists the team in the final confrontation.[28] Four years later, they aid Thor and the Avengers in confronting Thanos in his attempt to collect the six Infinity Stones. Thanos succeeds in collecting all of Stones, murdering Gamora in the process, and disintegrates half of all life in the universe, with Star-Lord, Drax, Mantis, and Groot among his victims, with only Rocket and Nebula spared",
    "Marvel Comics' Avengers are a large group of individual super heroes that have joined forces to protect the world from threats they cannot face alone. The idea of individual costumed champions banding together for the greater good is a simple but powerful one, and by aligning the Avengers haven't just protected their world -- they've changed it. There are now super teams all over the globe with an interest in protecting the people of their home nations and the world from weird and fantastic menaces.",
    "Coming in hot on the heels of Spider-Man: No Way Home is Doctor Strange's second film, Doctor Strange in the Multiverse of Madness. The second trailer for the film recently dropped, and there's a LOT to unpack. New heroes are introduced and old favorites return. Alliances are tested as variants of characters make their appearances and reality as they know it is ripped apart to an extent worse than in WandaVision and No Way Home.",
    "this is obe",
    "this is another",
    "how about this one",
    "well let me go",
    "come on I say",
    "This is anothet one"
]

let current_test_content = 0;
let dummytext_div = document.getElementById('dummycontent')
let input_test_area = document.getElementById('testinput')
let wordcounttext = document.getElementById('wpm')
let accuracytext = document.getElementById('accuracy')
let error = document.getElementById('errors')
let timer_text = document.getElementById('timertext')
let flag = true
// This function will load randon dummy text for typing
function updateTestContent() {
    currentcontent = test_content[current_test_content]
        newPara = document.createElement('p')
        newPara.innerText = currentcontent
        dummytext_div.appendChild(newPara);
    if (current_test_content < test_content.length)
        current_test_content++
    else
        current_test_content = 0

    processTest()
}

function processTest() {
    if (flag) {
        flag = false
        timer = setInterval(updateTimer, 1000);
    }

    listofwords = currentcontent.split(' ')
    wordcount = 0
    joinwords = ""
    charactercount = 0
    character = ""
    scoreword = 0
    scorecharacter = 0
    console.log(listofwords)

    console.log(wordcount)

    console.log(charactercount)


    currentTypedValue = input_test_area.value

    input_test_area.addEventListener('keypress', function (e) {
        listofcharacter = listofwords[wordcount].split('')

        console.log("character count" + listofcharacter[charactercount])
        console.log("word count" + listofwords[wordcount])
        //  console.log("character count" + listofcharacter[charactercount] )

        if (e.key == listofcharacter[charactercount]) {
            console.log("matching")
            scorecharacter++
            joinwords += e.key
            console.log("join words " + joinwords)
        }
        charactercount++

        if (e.key == " ") {
            charactercount = 0


            if (joinwords == listofwords[wordcount]) {
                scoreword++
                console.log("words matching" + scoreword)

            }
            joinwords = ""
            wordcount++
            calculateScore()
        }


    });
}
function calculateScore() {
    // countofwords= currentcontent.split(' ').length
    accuracy = (scoreword / wordcount) * 100
    accuracytext.value = accuracy
    wordcounttext.value = scoreword
}

function startGame() {

    input_test_area.addEventListener('keydown', function (e) {
        if (e.keyCode == 8) {
            e.preventDefault();
        }
    })
    updateTestContent()

}
//     resetValues();
//     updateQuote();
//     clearInterval(timer);
//     timer = setInterval(updateTimer, 1000);
// }




function updateTimer() {
    if (time_left > 0) {
        // decrease the current time left
        time_left--;

        // increase the time elapsed
        time_elapsed++;

        // update the timer text
        timer_text.value = time_left + "s";
    }
    else {
        // finish the game
        clearInterval(timer)
        finishTest();
    }
}




function finishTest() {

    alert("Test Finished")
}

