const ReactDOM = {
  render,
};

function render(vnode, contianer) {
  console.log(vnode);

  if (!vnode || !contianer) return;

  if (typeof vnode === "string") {
    const textNode = document.createTextNode(vnode);
    return contianer.appendChild(textNode);
  }

  const { tag, attrs } = vnode;
  const dom = document.createElement(tag);

  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key];
      setAttribute(dom, key, value);
    });
  }

  vnode.children.forEach((child) => render(child, dom));

  return contianer.appendChild(dom);
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
    } else {
    }
  }
}

export default ReactDOM;
