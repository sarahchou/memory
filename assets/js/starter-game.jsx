import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import deepcopy from 'deep-copy';

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
    return {
      board: this.initCards(),
      clicks: 0,
      lastClicked: [null, null],
    };
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
    let state1 = deepcopy(this.state);
    state1.clicks += 1;

    let lastClicked = state1.lastClicked;

    //the first val of lastClicked is either the first val or a new Object
    lastClicked[0] = lastClicked[0] || {};
    //the second val of lastClicked is either the second val or a new Object
    lastClicked[1] = lastClicked[1] || {};
    // in js, false values include: false, null, 0, "", and undefined

    //first click
    if (lastClicked[0] == null) {
      lastClicked[0] = cardVal;
      return;
    }
    else { //second click
      if (lastClicked[0].value == lastClicked[1].value) {
        //it's a match, so change all the cards with that value in the board to matched = true
        for (let ii = 0; ii < state1.board.length; ++ii) {
          let c = state1.board[ii];
          if (c.value == cardVal) {
            c.matched = true;
          }
        }
        //reset the last clicked to both be null.
        lastClicked[0] = null;
        lastClicked[1] = null;
      }
      else {
        //not a match, reset lastClicked array
        //TODO set some sort of time out before flipping cards?
        lastClicked[0] = null;
        lastClicked[1] = null;
      }
    }

    this.setState(state1);
  }

  //helper for rendering cards
  renderCards(start, end) {
    let cards = [];

    for (let i = start; i < end; i ++) {
      let card = this.state.board[i];
      cards.push(<Card key={i} value={card.value} matched={card.matched} click={this.handleClick.bind(this)} />);
    }

    return cards;
  }

  //render the game with title, all cards, reset button, and click counter
  render() {
    return (
      <div>
        <h3>Memory Game!</h3>
        <button id="button" onClick={() => this.resetGame()}>Reset Game</button>

        <div className="row">
          { this.renderCards(0, 4) }
        </div>
        <div className="row">
          { this.renderCards(4, 8) }
        </div>
        <div className="row">
          { this.renderCards(8, 12) }
        </div>
        <div className="row">
          { this.renderCards(12, 16) }
        </div>
        <div className="row">
          <div className="column">
            <h2 id="clicks">
              Total Clicks: {this.state.clicks}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

//function to make Cards
function Card(params) {
  let { click } = params;

  if (params.matched) {
    return (
      <div className='matching-card' onClick={() => click(params.value)}>
        <p id='cardValue'>{params.value}</p>
      </div>
    );
  }
  else {
    return (
      <div className='notmatching-card' onClick={() => click(params.value)}>
        <p id='cardValue'>?</p>
      </div>
    );
  }
}
