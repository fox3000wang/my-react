import React from "./react";
import ReactDOM from "./react-dom";

// const ele = (
//   <div className="a" title="t">
//     hello <span>react</span>
//   </div>
// );

function Home() {
  return (
    <div className="a" title="t">
      hello <span>react</span>
    </div>
  );
}

ReactDOM.render(<Home name="title" />, document.querySelector("#root"));
