import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<MemoryGame />, root);
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards = this.initGame();
      this.tries = this.tries.bind(this);
    };
  }

  //initialize the game
  initGame() {
    return {
      board = this.initCards();
      clicks = 0;
    }
  }

  //initialize the deck of cards for the game
  initCards() {
    let allCards = Array(16).fill(null)
    allCards[0] = 'A'
    allCards[1] = 'A'
    allCards[2] = 'B'
    allCards[3] = 'B'
    allCards[4] = 'C'
    allCards[5] = 'C'
    allCards[6] = 'D'
    allCards[7] = 'D'
    allCards[8] = 'E'
    allCards[9] = 'E'
    allCards[10] = 'F'
    allCards[11] = 'F'
    allCards[12] = 'G'
    allCards[13] = 'G'
    allCards[14] = 'H'
    allCards[15] = 'H'
    return allCards; //shuffle this later
  }

  //reset the game to its initial state
  resetGame() {
    this.setState(this.initGame());
  }

  //render the game
  render() {

  }

  //function to make Cards
  function Card(params) {

  }
}
