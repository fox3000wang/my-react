import Component from "./Component";

function createElement(tag, attrs, ...children) {
  attrs = attrs || {};
  return {
    tag,
    attrs,
    children,
    key: attrs.key || null,
  };
}

export default {
  Component,
  createElement,
};
