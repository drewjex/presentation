import React, { Component } from 'react';
import './App.css';
import Page from "./Page";

const pages = [
  {
    title:'TESTING PAGE ONE',
    content:`Here is some basic content.`
  },
  {
    title:'TESTING PAGE TWO',
    content:`Here is some basic content.`
  },
  {
    title:'TESTING PAGE THREE',
    content:`Here is some basic content.`
  }
]

class App extends Component {
  state = {
    current: 0
  }

  componentDidMount() {
    document.body.addEventListener('click', event => {
      this.moveForward();
    })

    document.onkeydown = e => {
      e = e || window.event;
      console.log(e);
      if (e.key === "ArrowLeft") {
        this.moveBackward();
      }
      else if (e.key === "ArrowRight") {
        this.moveForward();
      }
    }
  }

  generateColor = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

  moveForward = () => {
    this.setState(previousState => ({current: previousState.current+1}));
  }

  moveBackward = () => {
    this.setState(previousState => ({current: previousState.current-1}));
  }

  render() {
    return (
      <div className="App__container">
        {pages.map((page, index) => (
          <Page key={index}
                title={page.title}
                content={page.content}
                isHiddenRight={this.state.current < index}
                isHiddenLeft={this.state.current > index}
                index={index}
                color={this.generateColor()} />
        ))}
      </div>
    );
  }
}

export default App;
