import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<MemoryGame />, root);
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    //the state of the game is the cards and the tries
    this.state = this.initGame();
  }

  //initialize the game - board, number of clicks,
  initGame() {
    return {
      board: this.initCards();
      clicks: 0;
      lastClicked: null;
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
    return allCards; //TODO shuffle this later
  }

  //reset the game to its initial state
  resetGame() {
    this.setState(this.initGame());
  }

  //handles clicks and checks if matched
  handleClick(cardVal) {
    this.state.clicks ++;


  }

  //helper method for rendering a Card
  renderCard(i) {
    let card = this.state.allCards[i];
    return (<Card value={card.value} matched={card.matched}></Card>)



  }

  //render the game
  render() {
    return (
      <div>
        <h3>Memory Game!</h3>
        <div className="row">
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
        </div>
        <div className="row">
          {this.renderCard(4)}
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
        </div>
        <div className="row">
          {this.renderCard(8)}
          {this.renderCard(9)}
          {this.renderCard(10)}
          {this.renderCard(11)}
        </div>
        <div className="row">
          {this.renderCard(12)}
          {this.renderCard(13)}
          {this.renderCard(14)}
          {this.renderCard(15)}
        </div>
        <div className="row">
          <h2 id="clicks">Total Clicks: {this.state.clicks}</h2>
          <button id=reset onClick{() => this.resetGame()}>Reset</button>
        </div>
      </div>

    )

  }

  //function to make Cards
  function Card(params) {
    let root = params.root;


    if (matched) {
      return (
        <div className='matchedCard'>
          <p>"here"</p> //val of the card
        </div>
      )

    }
    else {
      return (
        <div className='card'>
        <p>?</p></div>
      )

    }

  }
}
