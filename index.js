let deckId = ""

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)

function handleDrawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            document.getElementById("card").src = data.cards[0].image
            document.getElementById("card2").src = data.cards[1].image

            const winnerText = compareCards(data.cards[0], data.cards[1])
            document.getElementById("who-won").innerHTML = winnerText
        })

}

document.getElementById("draw-cards").addEventListener("click", handleDrawCards)


/**
 * Challenge:
 * 
 * Try to determine which of the 2 cards is the "winner" (has higher value)
 * Aces are the card with the highest "score"
 * 
 * Part 2:
 * Instead of logging the winner to the console, 
 * display an `h2` on the screen above the 2 cards 
 * that declares who the winner is.
 * 
 * If card1 is the higher card, display "Computer wins!"
 * If card2 is the higher card, display "You win!"
 * If they're equal, display "War!"
 */

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



