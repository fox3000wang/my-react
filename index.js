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
  render() {
    return ele;
  }
}

ReactDOM.render(<Home2 name="title" />, document.querySelector("#root"));
