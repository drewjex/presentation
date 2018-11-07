import React, { Component } from 'react';
import './App.css';
import Page from "./Page";

const pages = [
  {
    title:'CSS Fundamentals!',
    content:"Drew Jex",
    footer:`Access Development Front End Dev`
  },
  {
    header:'TESTING PAGE TWO',
    content:`Here is some basic content. asldjfa js kfjalsdf. ajslkdj flasj.dfj.asjdf.aj s.dfj 
    
    aalsjdlfkj asldjfasdjf. a
    
    alksjdlk fjaslkd jf. .as jdf
    
    ajskld fjlkas jdlfk`
  },
  {
    title:'TESTING PAGE THREE',
    content:`Here is some basic content.`,
    iframe: 'https://codepen.io/drewjex/pen/EOYBap'
  }
]

class App extends Component {
  state = {
    current: 0
  }

  componentDidMount() {
    document.body.addEventListener('click', event => {
      //this.moveForward();
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
                isHiddenRight={this.state.current < index}
                isHiddenLeft={this.state.current > index}
                index={index}
                color={this.generateColor()} 
                {...page} />
        ))}
      </div>
    );
  }
}

export default App;
