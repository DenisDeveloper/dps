const common = require("../../js/common.js");
const mount = require("../../js/mounting.js").mount;
const patch = require("../../js/patching.js").patch;

const VNodeFlags = require("../../js/flags.js").VNodeFlags;
const ChildFlags = require("../../js/flags.js").ChildFlags;

const renderCheck = {
  v: false
};

const options = {
  componentComparator: null,
  createVNode: null,
  renderComplete: null
};

exports.findElement = function(q) {
  return document.getElementById(q);
};

exports.render_ffi = function(input, parentDOM) {
  return function() {
    const lifecycle = [];
    var rootInput = parentDOM.$V;

    renderCheck.v = true;

    if (common.isNullOrUndef(rootInput)) {
      if (!common.isNullOrUndef(input)) {
        // if (input.flags & VNodeFlags.InUse) {
        //   input = directClone(input);
        // }
        mount(input, parentDOM, null, lifecycle);
        parentDOM.$V = input;
        // rootInput = input;
      }
    } else {
      if (common.isNullOrUndef(input)) {
        remove(rootInput, parentDOM);
        parentDOM.$V = null;
      } else {
        // if (input.flags & VNodeFlags.InUse) {
        //   input = directClone(input);
        // }
        patch(rootInput, input, parentDOM, null, lifecycle);
        parentDOM.$V = input;
      }
    }
    common.callAll(lifecycle);
    renderCheck.v = false;
  };
};
