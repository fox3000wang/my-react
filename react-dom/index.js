import Component from "../react/Component";
import { diff, diffNode } from "./diff";

const ReactDOM = {
  render,
};

function render(vnode, contianer, dom) {
  //debugger;
  return diff(dom, vnode, contianer);
}

export function createComponent(comp, props) {
  let inst;
  // 如果是类组件，则直接new一个，然后返回
  if (comp.prototype && comp.prototype.render) {
    inst = new comp(props);
  } else {
    inst = new Component(props);
    inst.constructor = comp;
    inst.render = function () {
      return this.constructor(props);
    };
  }
  return inst;
}

export function setComponentProps(comp, props) {
  if (!comp.base) {
    if (comp.componentWillMount) {
      comp.componentWillMount();
    }
  }
  comp.props = props;
  renderComponent(comp);
}

export function renderComponent(comp) {
  let base;
  const render = comp.render(); // 这里返回的是一个jsx

  base = diffNode(comp.base, render);

  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }
  /* 
  这里省略部分生命周期的api
  */
  comp.base = base;
}

export function setAttribute(dom, key, value) {
  if (key === "className") {
    key = "class";
  }

  if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || "";
  } else if (key === "style") {
    if (!value || typeof value === "string") {
      dom.style.cssText = value || "";
    } else if (value && typeof value === "object") {
      for (let k in value) {
        if (typeof value[k]) {
          dom.style[k] = value[k] + "px";
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    if (key in dom) {
      dom[key] = value || "";
    }

    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

export default ReactDOM;
