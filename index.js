let deckId = ""

function updateButtonState() {
    const button = document.getElementById("draw-cards");
    if (!deckId) {
        button.disabled = true;
        button.classList.add("disabled");
        button.style.pointerEvents = "none";
    } else {
        button.disabled = false;
        button.classList.remove("disabled");
        button.style.pointerEvents = "auto";
    }
}
updateButtonState()


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            document.getElementById("cards-remaining").innerHTML = `Cards Remaining: ${data.remaining}`

            updateButtonState()
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)


/**
 * Challenge:
 * 
 * Disable the Draw button when we have no more cards to draw from
 * in the deck.
 * 
 * Disable both the functionality of the button (i.e. change
 * `disabled` to true on the button) AND the styling (i.e. add
 * a `disabled` CSS class to make it look unclickable)
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

            const button = document.getElementById("draw-cards");
            if (data.remaining === 0) {
                button.disabled = true
                button.classList.add("disabled")
                button.style.pointerEvents = "none"
            }
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



