import React from 'react';
import { render }  from 'react-dom';
import './index.css'

class Interface extends React.Component {
  render() {
    return (
      <div className="simon">
        <div className="row">
          <button className="green side"></button>
          <button className="red side blink"></button>
        </div>
        <div className="middle">
          <div className="name"><h1>Simon</h1></div>
          <div className="score">00</div>
          <button className="start">Start</button>
          <label class="switch">
          <input type="checkbox"></input>
          <span class="slider"></span>
        </label>
        </div>
        <div className="row">
          <button className="yellow side"></button>
          <button className="blue side"></button>
        </div>     
      </div>
    )
  }
}

render(<Interface/>, document.querySelector('#root'));