import { setAttribute } from "./index";

export function diff(dom, vnode, container) {
  const ret = diffNode(dom, vnode);

  if (container) {
    container.appendChild(ret);
  }
  return ret;
}

function diffNode(dom, vnode) {
  console.log(`[diffNode]: ${vnode}`);
  let out = dom;

  // null undefine 都会被转成 空字符串，排除!0会变成true的情况
  if (vnode !== 0) {
    vnode = !vnode ? "" : vnode;
  }

  // 数字
  if (typeof vnode === "number") {
    vnode = `${vnode}`;
    //vnode = String(vnode); //性能相对差一些
  }

  // 字符串, 文本节点
  if (typeof vnode === "string") {
    // dom 存在就判断内容是否有变化
    if (dom && dom.nodeType === 3) {
      // 更新文本内容
      if (dom.textContent !== vnode) {
        dom.textContent = vnode;
      }
    } else {
      // 不存在就创建新的
      out = document.createTextNode(vnode);
      if (dom && dom.parentNode) {
        dom.parentNode.replaceNode(out, dom);
      }
    }
    return out;
  }

  // 非文本节点
  if (!dom) {
    out = document.createElement(vnode.tag);
  }

  diffAttribute(out, vnode);

  if (
    (vnode.children && vnode.children.length > 0) ||
    (out.childNodes && out.childNodes.length > 0)
  ) {
    diffChildren(out, vnode.children);
  }

  return out;
}

function diffChildren(dom, vchildren) {
  if (!vchildren || vchildren.length === 0) {
    return;
  }
  const domChildren = dom.childNodes;
  const children = [];
  const keyed = {};

  let min = 0;
  let childrenLen = children.length;

  [...vchildren].forEach((vchild, i) => {
    // 获取虚拟DOM中所有的key
    const key = vchild.key;
    let child;
    if (key) {
      if (keyed[key]) {
        child = keyed[key];
        keyed[key] = undefined;
      } else if (childLen > min) {
        // 如果没有key, 则优先找类型相同的节点
        for (let j = min; j < childrenLen; j++) {
          let c = children[j];
          if (c) {
            child = c;
            children[j] = undefined;
            if (j === childrenLen - 1) {
              childrenLen--;
            }
            if (j === min) {
              min++;
            }
            break;
          }
        }
      }
    }

    child = diffNode(child, vchild);

    const f = domChildren[i];

    if (child && child !== dom && child !== f) {
      if (!f) {
        dom.appendChild(child);
      } else if (child === f.nextSibling) {
        removeNode(f);
      } else {
        dom.insertBefore(child, f);
      }
    }
  });
}

/**
 * 比较属性
 * @param {*} dom 真实dom
 * @param {*} vnode 虚拟dom
 */
function diffAttribute(dom, vnode) {
  const oldAttrs = {};
  const newAttrs = vnode.attrs;
  const domAttrs = dom.attributs ? dom.attributs : {};
  console.log(domAttrs);

  // 备份之前DOM的所有属性
  Object.keys(domAttrs).map((key) => {
    oldAttrs[key] = domAttrs[key];
  });

  // 旧的属性在新的里面没有, 则移除
  for (let key in oldAttrs) {
    if (!(key in newAttrs)) {
      setAttribute(dom, key, undefined);
    }
  }

  // 更新
  for (let key in newAttrs) {
    if (newAttrs[key] !== oldAttrs[key]) {
      setAttribute(dom, key, newAttrs[key]);
    }
  }
}
