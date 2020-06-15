import Component from "./Component";

function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
}

export default {
  Component,
  createElement,
};
