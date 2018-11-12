import React, { Component } from 'react';
import update from "immutability-helper";
import './App.css';
import Page from "./Page";

const pages = [
  {
    title:'Blank Template',
    content:"Drew Jex",
    footer: "Access Development Front End Dev Team"
  }
]

class App extends Component {
  state = {
    isLoading: true,
    isLoaded:[],
    current: 0,
    isZoomedOut: false,
    styles: []
  }

  componentDidMount() {
    window.addEventListener('load', event => {
      this.setState({isLoading: false});
    });

    document.body.addEventListener('touchstart', event => {
      this.moveForward();
    })

    document.onkeydown = e => {
      e = e || window.event;
      if (e.key === "ArrowLeft") {
        this.moveBackward();
      } else if (e.key === "ArrowRight") {
        this.moveForward();
      } else if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
        this.goTo(parseInt(e.key));
      } else if (e.key === "ArrowUp") {
        this.zoomOut();
      } else if (e.key === "ArrowDown") {
        this.zoomIn();
      }
    }
  }

  zoomOut = () => {
    const translateY = -200;
    const left = -40;
    const right = 40;
    let row = 0;

    const styles = pages.map((page, index) => {
      if (index % 5 === 0 && index !== 0) row++;
      return {
        index: index,
        left: `${left + (20 * (index % 5))}%`,
        right: `${right - (20 * (index % 5))}%`,
        transform: `scale(.2) translateY(${translateY + (100 * row)}%) translateZ(0)`
      }
    })

    this.setState({
      isZoomedOut: true,
      styles: styles
    });
  }

  zoomIn = (index) => {
    const styles = [];
    if (index) {
      styles[index] = {
        zIndex: 2
      }
    }
    this.setState({
      isZoomedOut: false,
      styles: styles
    });
  }

  onClick = index => {
    this.setState({
      current: index
    })

    this.zoomIn(index);
  }

  generateColor = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

  goTo = index => {
    this.setState({current: index});
  }

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

  onLoadPage = index => {
    this.setState(previousState => ({
      ...previousState,
      isLoaded: update(previousState.isLoaded, {
        [index]: {
          $set: true
        }
      }),
    }))
  }

  render() {
    return (
      <div className={`App__container ${this.state.isLoading && 'loading'}`}>
        {pages.map((page, index) => {
          if (index - this.state.current < 4 || this.state.isLoaded[index] || this.state.isZoomedOut) {
            return <Page key={index}
                        isHiddenRight={this.state.current < index}
                        isHiddenLeft={this.state.current > index}
                        index={index}
                        style={this.state.styles[index]}
                        isZoomed={this.state.isZoomedOut}
                        color={this.generateColor()} 
                        onLoad={this.onLoadPage}
                        onClick={this.onClick}
                        {...page} />
          }
          return null;
        })}
      </div>
    );
  }
}

export default App;
