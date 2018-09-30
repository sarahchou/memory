import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<MemoryGame />, root);
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { left: false };
  }

  render() {
    
  }
}
