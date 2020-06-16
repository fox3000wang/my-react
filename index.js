import React from "./react";
import ReactDOM from "./react-dom";

const ele = (
  <div className="a" title="t">
    hello <span>react</span>
  </div>
);

function Home1() {
  return ele;
}

class Home2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
    //this.handlerClick.bind(this);
    this.handlerClick = this.handlerClick.bind(this);
  }

  componentWillMount() {
    console.log("Legacy componentWillMount");
  }
  componentWillReceiveProps() {
    console.log("Legacy componentWillReceiveProps");
  }
  componentWillUpdate() {
    console.log("Legacy componentWillUpdate");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handlerClick() {
    console.log("handlerClick");
    this.setState({
      num: this.state.num + 1,
    });
  }

  render() {
    return (
      <div className="a" title="t">
        hello <span>react</span> <span>{this.state.num} </span>
        <button onClick={this.handlerClick}>+</button>
      </div>
    );
  }
}

ReactDOM.render(<Home2 name="title" />, document.querySelector("#root"));
