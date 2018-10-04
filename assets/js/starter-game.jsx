import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<MemoryGame />, root);
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initGame();
  }

  //initialize the game
  initGame() {
    return (
      board: this.initCards(),
      clicks: 0,
      lastClicked: [null, null];
    )
  }

  //shuffle the Cards
  //used this: https://www.jstips.co/en/javascript/shuffle-an-array/
  shuffle(cards) {
    var i,
        j,
        temp;
    for (i = cards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
  }
  
  //initialize the deck of cards for the game
  //I read this for inspiration to create the dict: https://medium.freecodecamp.org/how-i-built-a-react-game-with-react-dnd-and-react-flip-move-26300156a825
  initCards() {
    let allCards = [
      { value: "A", matched: false},
      { value: "A", matched: false},
      { value: "B", matched: false},
      { value: "B", matched: false},
      { value: "C", matched: false},
      { value: "C", matched: false},
      { value: "D", matched: false},
      { value: "D", matched: false},
      { value: "E", matched: false},
      { value: "E", matched: false},
      { value: "F", matched: false},
      { value: "F", matched: false},
      { value: "G", matched: false},
      { value: "G", matched: false},
      { value: "H", matched: false},
      { value: "H", matched: false}
    ];
    this.shuffle(allCards);
    return allCards;
  }

  //reset the game to its initial state
  resetGame() {
    this.setState(this.initGame());
  }

  //handles clicks and checks if matched
  // I read this: https://medium.freecodecamp.org/how-to-write-your-first-react-js-component-d728d759cabc
  handleClick(cardVal) {
    this.state.clicks ++;
    //first click - update value of the first clicked
    if (lastClicked[0] == null) {
      lastClicked[0] = cardVal;
    }
    else { //second click
      if (lastClicked[0].value == lastClicked[1].value) {
        //it's a match, so change all the cards with that value in the board to matched = true
        for (Card c : this.board.allCards) { //TODO not sure if Card c will work, or if it is key in the dict
          if (c.value == cardVal) {
            c.matched = true;
          }
        }
        //reset the last clicked to both be null.
        lastClicked[0] = null;
        lastClicked[1] = null;
      }
      else {
        //reset lastClicked array
        lastClicked[0] = null;
        lastClicked[1] = null;
      }
    }
  }

  //helper for rendering cards
  renderCards(start, end) {
    for (int i = start; i < end; i ++) {
      card = this.state.allCards[i]
      <Card value={card.value} matched={card.matched}/>)
    }
    return;
  }

  //render the game
  //used this for onClick: https://reactjs.org/docs/handling-events.html
  render() {
    return (
      <div>
        <h3>Memory Game!</h3>
        <div className="row">
          this.renderCards(0, 4);
        </div>
        <div className="row">
          this.renderCards(4, 8);s
        </div>
        <div className="row">
          this.renderCards(8, 12);
        </div>
        <div className="row">
          this.renderCards(12, 16);
        </div>
        <div className="row">
          <h2 id="clicks">Total Clicks: {this.state.clicks}</h2>
          <button id="button" onClick={this.resetGame()}>Reset Game</button>
        </div>
      </div>

    )

  }

  //function to make Cards
  //onClick: https://reactjs.org/docs/handling-events.html
  function Card(params) {
    if (params.matched) {
      return (
        <div className='matchedCard'>
          <p id='cardValue'>{params.value}</p>
        </div>
      )

    }
    else {
      return (
        <div className='card' onClick={this.handleClick(params.value)}>
        <p>?</p></div>
      )
    }
  }
}
