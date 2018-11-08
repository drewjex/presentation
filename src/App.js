import React, { Component } from 'react';
import update from "immutability-helper";
import './App.css';
import Page from "./Page";

const pages = [
  {
    title:'Redux - What I\'ve learned',
    content:"Drew Jex",
    footer: "Access Development Front End Dev Team"
  },
  {
    header: "Overview",
    content: [
      "Basic Principles",
      "Selectors/Reducers",
      "BindSelectors",
      "Memoization",
      "Splitting up Reducers",
      "ReduxSauce",
      "Thunks/Sagas",
      "When to Connect",
      "Containers/Presenters",
      "Global store doesn't need everything"
    ]
  },
  {
    title: "Basic Principles"
  },
  {
    header: "Basic Principles",
    content: [
      "Reducers are pure",
      "Entire state recreated when change occurs",
      "Predictable (no side effects)"
    ]
  },
  {
    title: "Reducers/Selectors - Write/Read"
  },
  {
    title: "\"Dan the man\" once said..."
  },
  {
    image: "/dan.png",
    imageStyle: "contain"
  },
  {
    title: "No Refactoring you say??"
  },
  {
    title: "Using Selectors with BindSelectors()"
  },
  {
    image: '/bindselectors.png',
    imageStyle: "contain"
  },
  {
    image: '/bindexample.png',
    imageStyle: "contain"
  },
  {
    image: 'importselectors.png',
    imageStyle: "contain"
  },
  {
    image: '/selectorsexample.png',
    imageStyle: "contain"
  },
  {
    title: "Decoupling components from redux = WIN"
  },
  {
    title: "Global Selectors? Thoughts?"
  },
  {
    title: "Memoization"
  },
  {
    title: "Splitting up Reducers"
  },
  {
    header: "Things to keep in mind...",
    content: [
      "Reducers not necesarily coupled with UI",
      "Reducer depends on data from another reducer? Send data through action, set up hierarchy, or combine"
    ]
  },
  {
    title: "Redux Sauce"
  },
  {
    title: "Much less boilerplate = :D"
  },
  {
    title: "reselect - for expensive selectors"
  },
  {
    title: "Thunks - when side effects are necessary"
  },
  {
    title: "When should I connect()?"
  },
  {
    title: "\"When it's convenient!\" - Dan Abramov"
  },
  {
    title: "Containers vs Presenters"
  },
  {
    title: "You don't need everything in redux"
  },
  {
    title: "Questions? Comments?"
  }
]

class App extends Component {
  state = {
    isLoading: true,
    isLoaded:[],
    current: 0
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
      }
      else if (e.key === "ArrowRight") {
        this.moveForward();
      } else if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
        this.goTo(parseInt(e.key));
      }
    }
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
          if (index - this.state.current < 4 || this.state.isLoaded[index]) {
            return <Page key={index}
                        isHiddenRight={this.state.current < index}
                        isHiddenLeft={this.state.current > index}
                        index={index}
                        color={this.generateColor()} 
                        onLoad={this.onLoadPage}
                        {...page} />
          }
          return null;
        })}
      </div>
    );
  }
}

export default App;
