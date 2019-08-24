var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png",
	flipped: false,
	matched: false,
	cardNum: 0
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png",
	flipped: false,
	matched: false,
	cardNum: 1
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png",
	flipped: false,
	matched: false,
	cardNum: 2
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png",
	flipped: false,
	matched: false,
	cardNum: 3
},
{
	rank: "joker",
	suit: "joker",
	cardImage: "images/joker.png",
	flipped: false,
	matched: false,
	cardNum: 4
}
];
var cardsInPlay = [];
var resultBox = document.createElement('p');
var resultDiv = document.getElementById('result');
var availableNum = [];
var matches = 0;
var correctMatch = ["You got it!", "Way to go!", "Yes! That's it!", "Awesome match!", "Watson! I think we have a match!", "If that's not a match, I don't know what is!"];
var incorrectMatch = ["That's not it!", "No way, Jose!", "Umm, I don't think so!", "Use your memory!", "Houston, we have a problem!"];

//reset last two cards
function reset() {
	for (var i = cardsInPlay.length - 1; i > cardsInPlay.length - 3; i--) {
		var resetLastTwoCards = document.getElementsByTagName('img')[cardsInPlay[i].cardNum];
		if (cardsInPlay[i].flipped === true && cardsInPlay[i].matched === false) {
			resetLastTwoCards.setAttribute('src', 'images/back.png');
			cardsInPlay[i].flipped = false;
		}
	}
}

function checkForMatch() {
	var minusOne = cardsInPlay[cardsInPlay.length - 1];
	var minusTwo = cardsInPlay[cardsInPlay.length - 2];

	if (minusOne.rank !== minusTwo.rank) {
		resultBox.innerHTML = incorrectMatch[Math.floor(Math.random()*incorrectMatch.length)];
		setTimeout(reset, 1300);
	} else if (minusOne.suit !== minusTwo.suit) {
		resultBox.innerHTML = correctMatch[Math.floor(Math.random()*correctMatch.length)];
		minusOne.matched = true;
		minusTwo.matched = true;
		matches++;
		if (matches === 2) {
			resultBox.innerHTML = "You matched all the cards!"
			cardsInPlay.length = 0;
			setTimeout(playAgain, 3000);
		}
	}
}

function flipCard() {
	var cardId = this.getAttribute('data-id');
	console.log("User flipped " + cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	if (cards[cardId].flipped === false) {
		cardsInPlay.push(cards[cardId]);
	}
	cards[cardId].flipped = true;
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length % 2 === 0){
		checkForMatch();
	}
}

//generates random number for shuffling cards
function randNum(){
	var num = Math.floor((Math.random()*5));
	while (availableNum.includes(num)){
		num = Math.floor((Math.random()*5))
	}
	if (!availableNum.includes(num)) {
		availableNum.push(num);
		return num;
	}
}

function createBoard() {
	resultBox.innerHTML = "Find a Match!";
	resultBox.setAttribute('id', 'box');
	resultDiv.appendChild(resultBox);
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('id', 'card' + i);
		cardElement.setAttribute('src', "images/back.png");
		var randCardNum = randNum();
		cards[randCardNum].cardNum = i;
		cardElement.setAttribute('data-id', randCardNum);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
		console.log("card " + i + " = " + randCardNum);
	}
}

//disables click function on cards and creates button that reloads window to play again
function playAgain() {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.getElementsByTagName('img')[i];
		cardElement.removeEventListener('click', flipCard);
	}
	resultBox.innerHTML = "<button class=\"button\" onClick=\"window.location.reload();\">Play Again</button>";
}

createBoard();