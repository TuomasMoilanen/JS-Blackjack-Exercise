
//Hope you like spaghetti!
var deck = new Array();                                                         //Declares variables  for the deck
var suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

function assembleDeck(){                                                        //Creates the deck
  for( var s=0; s < suits.length; s++){
    for( var v=0; v < values.length; v++){
      var card = {Suit: suits[s], Value: values[v] };
      deck.push(card);
      }
    }
    shuffle();
  }

  function shuffle(){                                                           //Shuffles the deck
    for (let i = 0; i < 10000; i++) {
      let loc1 = Math.floor((Math.random() * deck.length));
      let loc2 = Math.floor((Math.random() * deck.length));
      let temp = deck[loc1];
      deck[loc1] = deck[loc2];
      deck[loc2] = temp;
    }
  }
console.table(deck);

var dealerCards = [];
var turnNumber = 0;
var dealerTurnNumber = 0;
var playerCards = [];
var totalPlayerCardSum;
var totalDealerCardSum;
var calculatorTurn = 1;
var dealerCalculatorTurn = 2;
var consoleTurn = 2;
var dealerConsoleTurn = 2;
var playerCardsCalculator;
var dealerCardsCalculator;
var playerAcesLow = false;
var dealerAcesLow = false;

function dealCards(){                                                           //Deals the cards
  dealerTurnNumber++;
  dealerCards = deck.slice(0,2);
  deck.shift();
  deck.shift();
  dealerCardSum();
  turnNumber++;
  newPlayerCards = deck.slice(0,2);
  deck.shift();
  deck.shift();
  playerCards.push(newPlayerCards[0], newPlayerCards[1]);
  newPlayerCards = [];
  console.log(turnNumber + ". turn.");
  console.log("The visible house card is: " + dealerCards[0].Value + " of " +
  dealerCards[0].Suit + ".");
  console.log("The player cards are: " + playerCards[0].Value + " of " +
  playerCards[0].Suit + ", " + playerCards[1].Value + " of " +
  playerCards[1].Suit);
  document.getElementById("dealButton").disabled = true;
  playerCardSum();
    if(turnNumber === 1 && totalPlayerCardSum === 21){
      console.log("A natural! You win!");
      lockControls()
    }
}

function hitCards(){                                                            //Function for when the player hits
  if(turnNumber === 0){
    return;
  }

  turnNumber++;

  let newPlayerCards = deck.slice(0,1);
  deck.shift;
  playerCards.push(newPlayerCards[0]);

  console.log("The player cards are: " + playerCards[0].Value + " of " +
  playerCards[0].Suit + ", " + playerCards[1].Value + " of " +
  playerCards[1].Suit);

  for(consoleTurn; consoleTurn <= turnNumber; consoleTurn++){
    console.log(", " + playerCards[consoleTurn].Value + " of " +
    playerCards[consoleTurn].Suit);
  }

  playerCardSum();

  if(totalPlayerCardSum === 21){
    console.log("A blackjack! You win!");
    lockControls();
  }
  if(totalPlayerCardSum > 21){
    console.log("You lost.");
    lockControls();
  }
}

function playerCardSum(){                                                       //Calculates the total sum of the player cards
  playerCardsCalculator = playerCards;
  for (let i = 0; i < playerCardsCalculator.length; i++) {
    if(playerCardsCalculator[i].Value === "J" || playerCardsCalculator[i].Value
    === "Q" || playerCardsCalculator[i].Value === "K"){
      playerCardsCalculator[i].Value = 10;
    }
  }
  if(playerAcesLow === false){
    for (var i = 0; i < playerCardsCalculator.length; i++) {
      if(playerCardsCalculator[i].Value === "A"){
        playerCardsCalculator[i].Value = 11;
      }
    }
  }
  if(turnNumber === 1){
    totalPlayerCardSum = playerCardsCalculator[0].Value +
    playerCardsCalculator[1].Value;
  }
  if(calculatorTurn < turnNumber){
    calculatorTurn++;
    totalPlayerCardSum = totalPlayerCardSum +
    playerCardsCalculator[calculatorTurn].Value;
  }
  if(totalPlayerCardSum > 21 && playerAcesLow === false){
    for (var i = 0; i < playerCards.length; i++){
      if(playerCardsCalculator[i].Value === "A"){
        playerCardsCalculator[i].Value = 1;
        totalPlayerCardSum - 10;
        playerAcesLow = true;
      }
    }
  }
  console.log("The total value of the cards is: " + totalPlayerCardSum);
}

function standCards(){                                                          //Player chooses to stand
  if(turnNumber === 0){
    return;
  }
  dealerTurnNumber++;
  document.getElementById("hitButton").disabled = true;
  console.log("The house cards are: " + dealerCards[0].Value + " of " +
  dealerCards[0].Suit + ", " + dealerCards[1].Value + " of " +
  dealerCards[1].Suit);
  dealerCardSum();

  if(dealerTurnNumber > 1){
    let dealerNewCard = deck.slice(0,1);
    deck.shift();
    dealerCards.push(dealerNewCard[0]);
  }
  for(dealerConsoleTurn; dealerConsoleTurn <= dealerTurnNumber;
    dealerConsoleTurn++){
    console.log(", " + dealerCards[dealerConsoleTurn].Value + " of " +
    dealerCards[dealerConsoleTurn].Suit);
  }
}

function dealerCardSum(){                                                       //Calculates the total sum of the dealer cards
  dealerCardsCalculator = dealerCards;
  for (let i = 0; i < dealerCardsCalculator.length; i++) {
    if(dealerCardsCalculator[i].Value === "J" || dealerCardsCalculator[i].Value
    === "Q" || dealerCardsCalculator[i].Value === "K"){
      dealerCardsCalculator[i].Value = 10;
    }
  }
  if(dealerAcesLow === false){
    for (var i = 0; i < dealerCardsCalculator.length; i++) {
      if(dealerCardsCalculator[i].Value === "A"){
        dealerCardsCalculator[i].Value = 11;
      }
    }
  }
  if(dealerTurnNumber === 1){
    totalDealerCardSum = dealerCardsCalculator[0].Value +
    dealerCardsCalculator[1].Value;
  }

  if(dealerCalculatorTurn < dealerTurnNumber){
    dealerCalculatorTurn++;
    totalDealerCardSum = totalDealerCardSum +
    dealerCardsCalculator[dealerCalculatorTurn].Value;
  }
  if(totalDealerCardSum > 21 && dealerAcesLow === false){
    for (var i = 0; i < dealerCards.length; i++){
      if(dealerCardsCalculator[i].Value === "A"){
        dealerCardsCalculator[i].Value = 1;
        totalDealerCardSum - 10;
        dealerAcesLow = true;
      }
    }
  }

  console.log("The total value of the house cards is: " + totalDealerCardSum);

  if(dealerTurnNumber > 0 && totalDealerCardSum > totalPlayerCardSum &&
    totalDealerCardSum < 22){
    lockControls();
    console.log("The house wins!");
  }
  if(totalDealerCardSum > 21){
    lockControls();
    console.log("You win!");
  }
}
function lockControls(){                                                        //Locks the controls when either side wins
  document.getElementById("dealButton").disabled = true;
  document.getElementById("hitButton").disabled = true;
  document.getElementById("standButton").disabled = true;
}

function reset(){                                                               //Resets the game
  deck = [];
  assembleDeck();
  playerCards = [];
  dealerCards = [];
  turnNumber = 0;
  dealerTurnNumber = 0;
  calculatorTurn = 1;
  dealerCalculatorTurn = 1;
  consoleTurn = 2;
  dealerConsoleTurn = 2;
  playerAcesLow = false;
  dealerAcesLow = false;
  dealerCardsCalculator;
  playerCardsCalculator;
  totalPlayerCardSum;
  totalDealerCardSum;
  document.getElementById("dealButton").disabled = false;
  document.getElementById("hitButton").disabled = false;
  document.getElementById("standButton").disabled = false;
  console.log("Game Reset.");
}
