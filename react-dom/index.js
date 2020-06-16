import Component from "../react/Component";

const ReactDOM = {
  render,
};

function render(vnode, contianer) {
  return contianer.appendChild(_render(vnode));
}

function createComponent(comp, props) {
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

function setComponentProps(comp, props) {
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
  base = _render(render);
  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }
  /* 
  这里省略部分生命周期的api
  */

  // 替换节点
  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
  }

  comp.base = base;
}

/**
 *
 * @param {jsx对象} vnode
 */
function _render(vnode) {
  console.log(vnode);

  // null undefine 都会被转成 空字符串，排除!0会变成true的情况
  vnode = vnode !== 0 && !vnode ? "" : vnode;

  // 数字
  if (typeof vnode === "number") {
    //vnode = `${vnode}`;
    vnode = String(vnode);
  }

  // 字符串
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }

  // tag是函数
  if (typeof vnode.tag === "function") {
    console.log("is function");

    // 创建组件
    const comp = createComponent(vnode.tag, vnode.attrs);

    // 设置属性
    setComponentProps(comp, vnode.attrs);

    return comp.base;
  }

  // 虚拟dom对象
  const { tag, attrs } = vnode;
  const dom = document.createElement(tag);

  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key];
      setAttribute(dom, key, value);
    });
  }

  if (vnode.children) {
    vnode.children.forEach((child) => render(child, dom));
  }

  return dom;
}

function setAttribute(dom, key, value) {
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
