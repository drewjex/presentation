import React, { Component } from 'react';
import './App.css';
import Page from "./Page";

const pages = [
  {
    title:'CSS Fundamentals!',
    content:"Drew Jex",
    footer: "Access Development Front End Dev Team"
  },
  {
    image: 'https://ic.pics.livejournal.com/ivles/1125176/3534/3534_original.gif',
    imageStyle: 'contain'
  },
  {
    title:'CSS - it\'s kind of hard!'
  },
  {
    iframe: 'https://saijogeorge.com/css-puns/'
  },
  {
    header:'TESTING PAGE TWO',
    content: [
      'Here is a bulletpoint',
      'And another',
      'And yet another one'
    ]
  },
  {
    iframe: 'https://codepen.io/drewjex/pen/EOYBap'
  },
  {
    image: 'https://www.tennisworldusa.org/imgb/67209/roger-federer-explains-why-he-may-never-write-a-book.jpg'
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
    this.setState(previousState => {
      if (previousState.current === pages.length - 1) return previousState;
      return {
        current: previousState.current+1
      }
    });
  }

  moveBackward = () => {
    this.setState(previousState => {
      if (previousState.current === 0) return previousState;
      return {
        current: previousState.current-1
      }
    });
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
