var cards = ["queen", "queen", "king", "king"];
var cardsInPlay = [];
function checkForMatch() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
			console.log("You found a match!");
		} else {
			console.log("Sorry, try again!");
		}
}
function flipCards(cardId) {
	console.log("User flipped " + cards[cardId]);
	cardsInPlay.push(cards[cardId]);
	if (cardsInPlay.length === 2){
		checkForMatch();
	}
}
flipCards(0);
flipCards(2);
