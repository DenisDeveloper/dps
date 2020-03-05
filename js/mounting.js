const VNodeFlags = require("./flags.js").VNodeFlags;
const ChildFlags = require("./flags.js").ChildFlags;

const common = require("./common.js");
const mountProps = require("./props.js").mountProps;

function mountArrayChildren(children, dom, nextNode, lifecycle) {
  for (let i = 0; i < children.length; ++i) {
    let child = children[i];

    if (child.flags & VNodeFlags.InUse) {
      children[i] = child = directClone(child);
    }
    _mount(child, dom, nextNode, lifecycle);
  }
}

function mountElement(vNode, parentDOM, nextNode, lifecycle) {
  // console.log(`vNode: ${vNode.className}, nextNode: ${nextNode}`);
  const flags = vNode.flags;
  const props = vNode.props;
  const className = vNode.className;
  let children = vNode.children;
  const childFlags = vNode.childFlags;
  const dom = (vNode.dom = common.documentCreateElement(vNode.type));

  if (!common.isNullOrUndef(className) && className !== "") {
    dom.className = className;
  }

  if (childFlags === ChildFlags.HasTextChildren) {
    common.setTextContent(dom, children);
  } else if (childFlags !== ChildFlags.HasInvalidChildren) {
    if (childFlags === ChildFlags.HasVNodeChildren) {
      if (children.flags & VNodeFlags.InUse) {
        vNode.children = children = directClone(children);
      }
      _mount(children, dom, null, lifecycle);
    } else if (
      childFlags === ChildFlags.HasKeyedChildren ||
      childFlags === ChildFlags.HasNonKeyedChildren
    ) {
      mountArrayChildren(children, dom, null, lifecycle);
    }
  }

  if (!common.isNull(parentDOM)) {
    common.insertOrAppend(parentDOM, dom, nextNode);
  }

  if (!common.isNull(props)) {
    mountProps(vNode, flags, props, dom);
  }

  common.mountRef(vNode.ref, dom, lifecycle);
}

const _mount = function(vNode, parentDOM, nextNode, lifecycle) {
  const flags = (vNode.flags |= VNodeFlags.InUse);

  if (flags & VNodeFlags.Element) {
    mountElement(vNode, parentDOM, nextNode, lifecycle);
  } else if (flags & VNodeFlags.ComponentFunction) {
    mountFunctionalComponent(vNode, parentDOM, nextNode, lifecycle);
    mountFunctionalComponentCallbacks(vNode, lifecycle);
  } else if (flags & VNodeFlags.Void || flags & VNodeFlags.Text) {
    mountText(vNode, parentDOM, nextNode);
  } else if (flags & VNodeFlags.Fragment) {
    mountFragment(vNode, parentDOM, nextNode, lifecycle);
  } else if (flags & VNodeFlags.Portal) {
    mountPortal(vNode, parentDOM, nextNode, lifecycle);
  }
};

exports.mount = _mount;
