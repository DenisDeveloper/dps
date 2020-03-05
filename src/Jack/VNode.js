const options = {
  componentComparator: null,
  createVNode: null,
  renderComplete: null
};

function V(childFlags, children, className, flags, key, props, ref, type) {
  this.childFlags = childFlags;
  this.children = children;
  this.className = className;
  this.dom = null;
  this.flags = flags;
  this.key = key === void 0 ? null : key;
  this.props = props === void 0 ? null : props;
  this.ref = ref === void 0 ? null : ref;
  this.type = type;
}

exports.textNode = function(value) {
  const vNode = new V(16, value, null, 1, null, null, null, "div");

  if (options.createVNode) {
    options.createVNode(vNode);
  }

  return vNode;
};

exports.createVNode = function(
  type,
  className,
  children,
  childFlags,
  props,
  key,
  ref
) {
  const childFlag = childFlags === void 0 ? 1 : childFlags;
  // const vNode = new V(childFlag, children, className, 1, key, props, ref, type);
  const vNode = new V(
    childFlag,
    children,
    className,
    1,
    null,
    null,
    null,
    type
  );

  if (options.createVNode) {
    options.createVNode(vNode);
  }

  return vNode;
};
