let deckId = ""

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            document.getElementById("cards-remaining").innerHTML = `Cards Remaining: ${data.remaining}`
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)


/**
 * Challenge:
 * 
 * Display the number of remaining cards when we request a new deck, 
 * not just when we draw the 2 cards.
 * 
 * Hint: check the data coming back from when we get a new deck.
 */

function handleDrawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            document.getElementById("card").src = data.cards[0].image
            document.getElementById("card2").src = data.cards[1].image

            const winnerText = compareCards(data.cards[0], data.cards[1])
            document.getElementById("who-won").innerHTML = winnerText

            document.getElementById("cards-remaining").innerHTML = `Cards Remaining: ${data.remaining}`
        })

}

document.getElementById("draw-cards").addEventListener("click", handleDrawCards)


function compareCards(card1, card2) {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

    const card1Value = values.indexOf(card1.value);
    const card2Value = values.indexOf(card2.value);
    // console.log(card1Value)
    // console.log(card2Value)

    if (card1Value > card2Value) {
        // console.log(`${card1.value} wins!`)
        return "Computer wins!"

    } else if (card1Value < card2Value) {
        // console.log(`${card2.value} wins!`)
        return "You win!"
    } else {
        // console.log("It's a tie!")
        return "WAR!!!"
    }
}



