
var deck = new Array();
var suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

function assembleDeck(){
  for( var s=0; s < suits.length; s++){
    for( var v=0; v < values.length; v++){
      var card = {Suit: suits[s], Value: values[v] };
      deck.push(card);
      }
    }
    shuffle();
  }
  function shuffle(){
    for (let i = 0; i < 10000; i++) {
      let loc1 = Math.floor((Math.random() * deck.length));
      let loc2 = Math.floor((Math.random() * deck.length));
      let temp = deck[loc1];
      deck[loc1] = deck[loc2];
      deck[loc2] = temp;
    }
  }
console.table(deck);

var dealerCard;
var turnNumber = 0;
var playerCards = [];
var dealerCard2;
var totalCardSum;

function dealCards(){
  if(turnNumber < 1){
    let dealer1 = deck.slice(0,1);
    dealerCard1 = dealer1[0];
    deck.shift();
  }
  turnNumber++;
  var newPlayerCards = deck.slice(0,2);
  deck.shift();
  deck.shift();
  playerCards.push(newPlayerCards[0], newPlayerCards[1]);
  newPlayerCards = [];
  console.log(turnNumber + ". turn.");
  console.log("The visible house card is: " + dealerCard1.Value + " of " + dealerCard1.Suit + ".");
  if(turnNumber === 1){
    console.log("The player cards are: " + playerCards[0].Value + " of " +
    playerCards[0].Suit + ", " + playerCards[1].Value + " of " + playerCards[1].Suit);
  }
  if(turnNumber === 2){
    console.log("The player cards are: " + playerCards[0].Value + " of " +
    playerCards[0].Suit + ", " + playerCards[1].Value + " of " + playerCards[1].Suit
    + ", " + playerCards[2].Value + " of " + playerCards[2].Suit);
  }
  if(turnNumber === 3){
    console.log("The player cards are: " + playerCards[0].Value + " of " +
    playerCards[0].Suit + ", " + playerCards[1].Value + " of " + playerCards[1].Suit
    + ", " + playerCards[2].Value + " of " + playerCards[2].Suit
   + ", " + playerCards[3].Value + " of " + playerCards[3].Suit);
  }
  playerCardsSum();
    if(turnNumber === 1 && totalCardSum === 21){
      console.log("A natural! You win!");
      lockControls()
    }
    if(totalCardSum > 21){
      console.log("You lost.");
      lockControls();
    }
}
function playerCardsSum(){
  var playerCardsCalculator = playerCards;
  for (var i = 0; i < playerCardsCalculator.length; i++) {
    if(playerCardsCalculator[i].Value === "J" || playerCardsCalculator[i].Value
    === "Q" || playerCardsCalculator[i].Value === "K"){
      playerCardsCalculator[i].Value = 10;
    }
  }

if(turnNumber === 1){
  totalCardSum = playerCardsCalculator[0].Value + playerCardsCalculator[1].Value;
}
if(turnNumber === 2){
  totalCardSum = playerCardsCalculator[0].Value + playerCardsCalculator[1].Value
   + playerCardsCalculator[2].Value;
}
if(turnNumber === 3){
  totalCardSum = playerCardsCalculator[0].Value + playerCardsCalculator[1].Value
   + playerCardsCalculator[2].Value + playerCardsCalculator[3].Value;
}
if(turnNumber === 4){
  totalCardSum = playerCardsCalculator[0].Value + playerCardsCalculator[1].Value
   + playerCardsCalculator[2].Value + playerCardsCalculator[3].Value +
    playerCardsCalculator[4].Value;
}
  console.log("The total value of the cards is: " + totalCardSum);
}

function lockControls(){
  document.getElementById("dealButton").disabled = true;
  document.getElementById("hitButton").disabled = true;
  document.getElementById("standButton").disabled = true;
}

function reset(){
  deck = [];
  assembleDeck();
  playerCards = [];
  dealerCard1;
  dealerCard2;
  turnNumber = 0;
  document.getElementById("dealButton").disabled = false;
  document.getElementById("hitButton").disabled = false;
  document.getElementById("standButton").disabled = false;
  console.log("Game Reset.");
}
/*
DEAL FOR HOUSE
DEAL FOR PLAYER
CHECK IF NATURAL
HIT OR STAND
DEAL ONE FOR THE PLAYER
IF STAND REVEAL HOUSE SECOND CARD
COMPARE
PLAYER LOSES OR DEAL FOR HOUSE
COMPARE
*/
