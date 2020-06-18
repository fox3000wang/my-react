import React from "./react";
import ReactDOM from "./react-dom";

const ele = (
  <div className="a" title="t">
    hello <span>react</span>
  </div>
);

// 函数组件
function Home1() {
  return ele;
}

// 类组件
class Home2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
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
      <div className="className" title="title">
        hello <span>react</span> <span>{this.state.num} </span>
        <button onClick={this.handlerClick}>+</button>
      </div>
    );
  }
}

//ReactDOM.render(ele, document.querySelector("#root"));
ReactDOM.render(<Home2 name="title" />, document.querySelector("#root"));
