import React, { Component } from 'react';
import update from "immutability-helper";
import './App.css';
import Page from "./Page";

const pages = [
  {
    title:'CSS Fundamentals!',
    content:"Drew Jex",
    footer: "Access Development Front End Dev Team"
  },
  {
    image: 'https://davidwalsh.name/demo/css-comic.jpg', //'https://ic.pics.livejournal.com/ivles/1125176/3534/3534_original.gif',
    imageStyle: 'contain'
  },
  {
    title:'CSS - it\'s kind of weird!'
  },
  {
    header:'Things I wish I knew when I started',
    content: [
      'Box Model',
      'Specificity',
      'BEM',
      'Positioning',
      'Flexbox',
      'SCSS',
    ]
  },
  {
    title:'Box Model'
  },
  {
    iframe:'https://css-tricks.com/the-css-box-model/'
  },
  {
    title:'box-sizing: border-box'
  },
  {
    iframe: 'https://codepen.io/drewjex/pen/LXGQZY'
  },
  {
    title:'Specificity'
  },
  {
    iframe: 'https://css-tricks.com/specifics-on-css-specificity/#article-header-id-0'
  },
  {
    iframe: 'https://codepen.io/drewjex/pen/PxZEMG'
  },
  {
    title:'BEM'
  },
  {
    iframe: 'https://css-tricks.com/bem-101/'
  },
  {
    title: 'Positioning'
  },
  {
    header: 'Five Types',
    content: [
      'Static - default',
      'Relative',
      'Absolute',
      'Fixed',
      'Sticky'
    ]
  },
  {
    iframe: 'https://codepen.io/drewjex/pen/PxZEMG'
  },
  {
    title:'Flexbox'
  },
  {
    iframe: 'https://codepen.io/drewjex/pen/JePxaB'
  },
  {
    title:'SCSS'
  },
  {
    header:'SCSS Advantages',
    content: [
      'Variables',
      'Nesting',
      'Mixins'
    ]
  },
  {
    title:'Nesting is nice, but it can make your code complicated'
  },
  {
    iframe: 'https://www.sitepoint.com/beware-selector-nesting-sass/'
  },
  {
    header:'Other Stuff',
    content: [
      "CSS Vars (how ARC Theming works)",
      "Animations/Transitions - often simple with awesome results"
    ]
  },
  {
    iframe: 'https://codepen.io/drewjex/pen/EOYBap'
  },
  {
    title:'When you understand the fundamentals - everything becomes easier'
  },
  {
    image: 'https://ic.pics.livejournal.com/ivles/1125176/3534/3534_original.gif',
    imageStyle: 'contain'
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
      //console.log(e);
      if (e.key === "ArrowLeft") {
        this.moveBackward();
      } else if (e.key === "ArrowRight") {
        this.moveForward();
      } else if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
        this.goTo(parseInt(e.key));
      } else if (e.key === "ArrowUp" && this.state.current > 4 && this.state.isZoomedOut) {
        this.goTo(this.state.current - 5);
      } else if (e.key === "ArrowDown" && this.state.current < pages.length - 5 && this.state.isZoomedOut) {
        this.goTo(this.state.current + 5);
      } else if (e.key === "Enter") {
        this.zoomIn();
      } else if (e.key === "Escape") {
        this.zoomOut();
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
        position:'absolute',
        left: `${left + (20 * (index % 5))}%`,
        right: `${right - (20 * (index % 5))}%`,
        transform: `scale(.2) translateY(${translateY + (100 * row)}%) translateZ(0)`
      }
    })

    this.setState({
      isZoomedOut: true,
    });

    //provide time for initial render
    setTimeout(() => {
      this.setState({
        styles: styles
      })
    }, 100);
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
                        isSelected={this.state.current === index}
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
