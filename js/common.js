exports.isNullOrUndef = o => {
  return o === void 0 || o === null;
};

exports.documentCreateElement = tag => {
  return document.createElement(tag);
};

exports.isFunction = o => {
  return typeof o === "function";
};

const _isNull = function(o) {
  return o === null;
};

exports.isNull = _isNull;

exports.isString = o => {
  return typeof o === "string";
};

exports.isNumber = o => {
  return typeof o === "number";
};

exports.setTextContent = (dom, children) => {
  dom.textContent = children;
};

exports.EMPTY_OBJ = {};

exports.normalizeEventName = name => {
  return name.substr(2).toLowerCase();
};

exports.safeCall1 = (method, arg1) => {
  return !!isFunction(method) && (method(arg1), true);
};

exports.callAll = arrayFn => {
  for (let i = 0; i < arrayFn.length; i++) {
    arrayFn[i]();
  }
};

exports.mountRef = (ref, value, lifecycle) => {
  if (ref && (isFunction(ref) || ref.current !== void 0)) {
    lifecycle.push(() => {
      if (!safeCall1(ref, value) && ref.current !== void 0) {
        ref.current = value;
      }
    });
  }
};

exports.unmountRef = ref => {
  if (ref) {
    if (!safeCall1(ref, null) && ref.current) {
      ref.current = null;
    }
  }
};

const _appendChild = function(parentDOM, dom) {
  parentDOM.appendChild(dom);
};

exports.appendChild = _appendChild;

exports.insertOrAppend = (parentDOM, newNode, nextNode) => {
  if (_isNull(nextNode)) {
    _appendChild(parentDOM, newNode);
  } else {
    parentDOM.insertBefore(newNode, nextNode);
  }
};
