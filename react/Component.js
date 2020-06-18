import { renderComponent } from "../react-dom";
class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }
  setState(state) {
    // 简单粗暴的对象浅拷贝
    Object.assign(this.state, state);

    // 渲染
    renderComponent(this);
  }
}
export default Component;
