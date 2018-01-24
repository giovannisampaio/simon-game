import React from 'react';
import { render }  from 'react-dom';
import './index.css'

class Simon extends React.Component {
  constructor() {
    super();
    this.state = {
      sequence: [],
      status: 'off',
      round: null,
      currentColor: null,
      currentUserIndex: null,
    }     

    this.handleClickOnOff = this.handleClickOnOff.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleUserTurn = this.handleUserTurn.bind(this);
    this.addGreen = this.handleUserTurn.bind(this, 'Green');
    this.addRed = this.handleUserTurn.bind(this, 'Red');
    this.addYellow = this.handleUserTurn.bind(this, 'Yellow');
    this.addBlue = this.handleUserTurn.bind(this, 'Blue');
  }

  handleClickOnOff() {
    this.setState(turnGameOnOff.bind(this))
  }

  handleClickStart() {
    const sequence = this.state.sequence;
    const round = this.state.round;

    playSequence.bind(this, sequence, round)();
  }

  handleUserTurn(color) {
    playSounds(color);

    this.setState(checkUserOption.bind(null, color), () => {
      const { sequence, round, currentUserIndex } = this.state;
      if (currentUserIndex === 0) {
        playSequence.bind(this)(sequence, round);
      }
    });
  }


  render() {
    const currentColor = this.state.currentColor;
    const activeClass = currentColor ? `active${currentColor}` : '';

    return (
      <div className={`Simon ${activeClass}`}>
        <div className="row">
          <button className="green side Simon-button Simon-buttonGreen" onClick={this.addGreen}></button>
          <button className="red side blink Simon-button Simon-buttonRed" onClick={this.addRed}></button>
        </div>
        <div className="middle">
          <div className="name"><h1>Simon</h1></div>
          <div className="score">{this.state.round}</div>
          <button className="start" onClick={this.handleClickStart}>Start</button>
          <button className="strict">Strict</button>
          <label class="switch">
          <input type="checkbox" onClick={this.handleClickOnOff}></input>
          <span class="slider"></span>
        </label>
        </div>
        <div className="row">
          <button className="yellow side Simon-button Simon-buttonYellow" onClick={this.addYellow}></button>
          <button className="blue side Simon-button Simon-buttonBlue" onClick={this.addBlue}></button>
        </div>     
      </div>
    )
  }
}

render(<Simon/>, document.querySelector('#root'));

//Actions

function turnGameOnOff(prevState) {
  if (prevState.status === 'on') {
    return {
      sequence: [],
      status: 'off',
      round: null,
      currentColor: null,
      currentUserIndex: null,
    };
  }

  return {
    sequence: getRandomColors(),
    status: 'on',
    round: 1,
    currentUserIndex: 0,
  };
}

function playSequence(arr, index) {
  for (let i = 0; i < index; i += 1) {
    setTimeout(() => {
      playSounds(arr[i]);
      this.setState({
        currentColor: arr[i],
      });
    }, (i + 1) * 700);
  }

  setTimeout(() => {
    this.setState({
      currentColor: null,
    });
  }, (index + 1) * 700);
}

function checkUserOption(color, state) {
  const { sequence, round, currentUserIndex } = state;
  if (color === sequence[currentUserIndex] && (currentUserIndex + 1) === round) {
    return {
      round: round + 1,
      currentUserIndex: 0,
    };
  }

  if (color === sequence[currentUserIndex] && (currentUserIndex + 1) < round) {
    return {
      currentUserIndex: currentUserIndex + 1,
    };
  }

  return {
    currentUserIndex: 0,
  };
}

//Helpers

function getRandomNumber() {
  return Math.floor(Math.random() * 4);
}

function getRandomColor() {
  const arrOfColors = ['Red', 'Yellow', 'Blue', 'Green'];
  return arrOfColors[getRandomNumber()];
}

function getRandomColors() {
  const result = [];
  for (let i = 0; i < 20; i += 1) {
    result.push(getRandomColor());
  }
  return result;
}

const soundGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const soundRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const soundYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const soundBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

function playGreen() {
  soundGreen.play();
}

function playRed() {
  soundRed.play();
}

function playYellow() {
  soundYellow.play();
}

function playBlue() {
  soundBlue.play();
}

function playSounds(input) {
  if (input === 'Green') {
    playGreen();
  } else if (input === 'Red') {
    playRed();
  } else if (input === 'Yellow') {
    playYellow();
  } else if (input === 'Blue') {
    playBlue();
  }
}
