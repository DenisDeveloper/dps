// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"output/Effect.Console/foreign.js":[function(require,module,exports) {
"use strict";

exports.log = function (s) {
  return function () {
    console.log(s);
    return {};
  };
};

exports.warn = function (s) {
  return function () {
    console.warn(s);
    return {};
  };
};

exports.error = function (s) {
  return function () {
    console.error(s);
    return {};
  };
};

exports.info = function (s) {
  return function () {
    console.info(s);
    return {};
  };
};

exports.time = function (s) {
  return function () {
    console.time(s);
    return {};
  };
};

exports.timeEnd = function (s) {
  return function () {
    console.timeEnd(s);
    return {};
  };
};
},{}],"output/Data.Show/foreign.js":[function(require,module,exports) {
"use strict";

exports.showIntImpl = function (n) {
  return n.toString();
};

exports.showNumberImpl = function (n) {
  var str = n.toString();
  return isNaN(str + ".0") ? str : str + ".0";
};

exports.showCharImpl = function (c) {
  var code = c.charCodeAt(0);

  if (code < 0x20 || code === 0x7F) {
    switch (c) {
      case "\x07":
        return "'\\a'";

      case "\b":
        return "'\\b'";

      case "\f":
        return "'\\f'";

      case "\n":
        return "'\\n'";

      case "\r":
        return "'\\r'";

      case "\t":
        return "'\\t'";

      case "\v":
        return "'\\v'";
    }

    return "'\\" + code.toString(10) + "'";
  }

  return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
};

exports.showStringImpl = function (s) {
  var l = s.length;
  return "\"" + s.replace(/[\0-\x1F\x7F"\\]/g, // eslint-disable-line no-control-regex
  function (c, i) {
    switch (c) {
      case "\"":
      case "\\":
        return "\\" + c;

      case "\x07":
        return "\\a";

      case "\b":
        return "\\b";

      case "\f":
        return "\\f";

      case "\n":
        return "\\n";

      case "\r":
        return "\\r";

      case "\t":
        return "\\t";

      case "\v":
        return "\\v";
    }

    var k = i + 1;
    var empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
    return "\\" + c.charCodeAt(0).toString(10) + empty;
  }) + "\"";
};

exports.showArrayImpl = function (f) {
  return function (xs) {
    var ss = [];

    for (var i = 0, l = xs.length; i < l; i++) {
      ss[i] = f(xs[i]);
    }

    return "[" + ss.join(",") + "]";
  };
};

exports.cons = function (head) {
  return function (tail) {
    return [head].concat(tail);
  };
};

exports.join = function (separator) {
  return function (xs) {
    return xs.join(separator);
  };
};
},{}],"output/Data.Symbol/foreign.js":[function(require,module,exports) {
"use strict"; // module Data.Symbol

exports.unsafeCoerce = function (arg) {
  return arg;
};
},{}],"output/Data.Symbol/index.js":[function(require,module,exports) {
// Generated by purs version 0.12.5
"use strict";

var $foreign = require("./foreign.js");

var SProxy = function () {
  function SProxy() {}

  ;
  SProxy.value = new SProxy();
  return SProxy;
}();

var IsSymbol = function IsSymbol(reflectSymbol) {
  this.reflectSymbol = reflectSymbol;
};

var reifySymbol = function reifySymbol(s) {
  return function (f) {
    return $foreign.unsafeCoerce(function (dictIsSymbol) {
      return f(dictIsSymbol);
    })({
      reflectSymbol: function reflectSymbol(v) {
        return s;
      }
    })(SProxy.value);
  };
};

var reflectSymbol = function reflectSymbol(dict) {
  return dict.reflectSymbol;
};

module.exports = {
  IsSymbol: IsSymbol,
  reflectSymbol: reflectSymbol,
  reifySymbol: reifySymbol,
  SProxy: SProxy
};
},{"./foreign.js":"output/Data.Symbol/foreign.js"}],"output/Record.Unsafe/foreign.js":[function(require,module,exports) {
"use strict";

exports.unsafeHas = function (label) {
  return function (rec) {
    return {}.hasOwnProperty.call(rec, label);
  };
};

exports.unsafeGet = function (label) {
  return function (rec) {
    return rec[label];
  };
};

exports.unsafeSet = function (label) {
  return function (value) {
    return function (rec) {
      var copy = {};

      for (var key in rec) {
        if ({}.hasOwnProperty.call(rec, key)) {
          copy[key] = rec[key];
        }
      }

      copy[label] = value;
      return copy;
    };
  };
};

exports.unsafeDelete = function (label) {
  return function (rec) {
    var copy = {};

    for (var key in rec) {
      if (key !== label && {}.hasOwnProperty.call(rec, key)) {
        copy[key] = rec[key];
      }
    }

    return copy;
  };
};
},{}],"output/Record.Unsafe/index.js":[function(require,module,exports) {
// Generated by purs version 0.12.5
"use strict";

var $foreign = require("./foreign.js");

module.exports = {
  unsafeHas: $foreign.unsafeHas,
  unsafeGet: $foreign.unsafeGet,
  unsafeSet: $foreign.unsafeSet,
  unsafeDelete: $foreign.unsafeDelete
};
},{"./foreign.js":"output/Record.Unsafe/foreign.js"}],"output/Type.Data.RowList/index.js":[function(require,module,exports) {
// Generated by purs version 0.12.5
"use strict";

var RLProxy = function () {
  function RLProxy() {}

  ;
  RLProxy.value = new RLProxy();
  return RLProxy;
}();

module.exports = {
  RLProxy: RLProxy
};
},{}],"output/Data.Show/index.js":[function(require,module,exports) {
// Generated by purs version 0.12.5
"use strict";

var $foreign = require("./foreign.js");

var Data_Symbol = require("../Data.Symbol/index.js");

var Record_Unsafe = require("../Record.Unsafe/index.js");

var Type_Data_RowList = require("../Type.Data.RowList/index.js");

var ShowRecordFields = function ShowRecordFields(showRecordFields) {
  this.showRecordFields = showRecordFields;
};

var Show = function Show(show) {
  this.show = show;
};

var showString = new Show($foreign.showStringImpl);
var showRecordFieldsNil = new ShowRecordFields(function (v) {
  return function (v1) {
    return [];
  };
});

var showRecordFields = function showRecordFields(dict) {
  return dict.showRecordFields;
};

var showRecord = function showRecord(dictRowToList) {
  return function (dictShowRecordFields) {
    return new Show(function (record) {
      var v = showRecordFields(dictShowRecordFields)(Type_Data_RowList.RLProxy.value)(record);

      if (v.length === 0) {
        return "{}";
      }

      ;
      return $foreign.join(" ")(["{", $foreign.join(", ")(v), "}"]);
    });
  };
};

var showNumber = new Show($foreign.showNumberImpl);
var showInt = new Show($foreign.showIntImpl);
var showChar = new Show($foreign.showCharImpl);
var showBoolean = new Show(function (v) {
  if (v) {
    return "true";
  }

  ;

  if (!v) {
    return "false";
  }

  ;
  throw new Error("Failed pattern match at Data.Show (line 20, column 1 - line 20, column 37): " + [v.constructor.name]);
});

var show = function show(dict) {
  return dict.show;
};

var showArray = function showArray(dictShow) {
  return new Show($foreign.showArrayImpl(show(dictShow)));
};

var showRecordFieldsCons = function showRecordFieldsCons(dictIsSymbol) {
  return function (dictShowRecordFields) {
    return function (dictShow) {
      return new ShowRecordFields(function (v) {
        return function (record) {
          var tail = showRecordFields(dictShowRecordFields)(Type_Data_RowList.RLProxy.value)(record);
          var key = Data_Symbol.reflectSymbol(dictIsSymbol)(Data_Symbol.SProxy.value);
          var focus = Record_Unsafe.unsafeGet(key)(record);
          return $foreign.cons($foreign.join(": ")([key, show(dictShow)(focus)]))(tail);
        };
      });
    };
  };
};

module.exports = {
  Show: Show,
  show: show,
  ShowRecordFields: ShowRecordFields,
  showRecordFields: showRecordFields,
  showBoolean: showBoolean,
  showInt: showInt,
  showNumber: showNumber,
  showChar: showChar,
  showString: showString,
  showArray: showArray,
  showRecord: showRecord,
  showRecordFieldsNil: showRecordFieldsNil,
  showRecordFieldsCons: showRecordFieldsCons
};
},{"./foreign.js":"output/Data.Show/foreign.js","../Data.Symbol/index.js":"output/Data.Symbol/index.js","../Record.Unsafe/index.js":"output/Record.Unsafe/index.js","../Type.Data.RowList/index.js":"output/Type.Data.RowList/index.js"}],"output/Effect.Console/index.js":[function(require,module,exports) {
// Generated by purs version 0.12.5
"use strict";

var $foreign = require("./foreign.js");

var Data_Show = require("../Data.Show/index.js");

var warnShow = function warnShow(dictShow) {
  return function (a) {
    return $foreign.warn(Data_Show.show(dictShow)(a));
  };
};

var logShow = function logShow(dictShow) {
  return function (a) {
    return $foreign.log(Data_Show.show(dictShow)(a));
  };
};

var infoShow = function infoShow(dictShow) {
  return function (a) {
    return $foreign.info(Data_Show.show(dictShow)(a));
  };
};

var errorShow = function errorShow(dictShow) {
  return function (a) {
    return $foreign.error(Data_Show.show(dictShow)(a));
  };
};

module.exports = {
  logShow: logShow,
  warnShow: warnShow,
  errorShow: errorShow,
  infoShow: infoShow,
  log: $foreign.log,
  warn: $foreign.warn,
  error: $foreign.error,
  info: $foreign.info,
  time: $foreign.time,
  timeEnd: $foreign.timeEnd
};
},{"./foreign.js":"output/Effect.Console/foreign.js","../Data.Show/index.js":"output/Data.Show/index.js"}],"output/FFI/foreign.js":[function(require,module,exports) {
exports._log = function (str) {
  return function () {
    console.log(str);
  };
};
},{}],"output/FFI/index.js":[function(require,module,exports) {
// Generated by purs version 0.12.5
"use strict";

var $foreign = require("./foreign.js");

module.exports = {
  "_log": $foreign["_log"]
};
},{"./foreign.js":"output/FFI/foreign.js"}],"output/VDom/foreign.js":[function(require,module,exports) {
var organizeFacts = function organizeFacts(factList) {
  for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
  {
    var entry = factList.a;
    var tag = entry.$;
    var key = entry.__key;
    var value = entry.__value;

    if (tag === 'a__1_PROP') {
      key === 'className' ? _VirtualDom_addClass(facts, key, __Json_unwrap(value)) : facts[key] = __Json_unwrap(value);
      continue;
    }

    var subFacts = facts[tag] || (facts[tag] = {});
    tag === 'a__1_ATTR' && key === 'class' ? _VirtualDom_addClass(subFacts, key, value) : subFacts[key] = value;
  }

  return facts;
};

exports.dLog = function (a) {
  console.log(a);
  return "1";
};

exports.text = function (s) {
  return {
    $: 0,
    a: s
  };
};

exports.noScript = function (tag) {
  return tag == 'script' ? 'p' : tag;
};

var _node = function _node(tag, factList, kidList, namespace) {
  for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) {
    var kid = kidList.a;
    descendantsCount += kid.b || 0;
    kids.push(kid);
  }

  descendantsCount += kids.length;
  return {
    $: 1,
    c: tag,
    d: organizeFacts(factList),
    e: kids,
    f: namespace || undefined,
    b: descendantsCount
  };
};

var _nodeNS = function _nodeNS(namespace, tag, factList, kidList) {
  return _node(tag, namespace, kidList, namespace);
};

exports.nodeNSImpl = _nodeNS;
exports.nodeImpl = _node;

var _keyedNode = function _keyedNode(tag, factList, kidList, namespace) {
  for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
  {
    var kid = kidList.a;
    descendantsCount += kid.b.b || 0;
    kids.push(kid);
  }

  descendantsCount += kids.length;
  return {
    $: 2,
    c: tag,
    d: _VirtualDom_organizeFacts(factList),
    e: kids,
    f: namespace,
    b: descendantsCount
  };
};

var _keyedNodeNS = function _keyedNodeNS(namespace, tag, factList, kidList) {
  return _keyedNode(tag, namespace, kidList, namespace);
};

exports.keyedNodeNSImpl = _keyedNodeNS;
exports.keyedNodeImpl = _keyedNode;

exports.styleImpl = function (key, value) {
  return {
    $: 'a1',
    n: key,
    o: value
  };
};

exports.propertyImpl = function (key, value) {
  return {
    $: 'a2',
    n: key,
    o: value
  };
};
},{}],"output/Data.Function.Uncurried/foreign.js":[function(require,module,exports) {
"use strict"; // module Data.Function.Uncurried

exports.mkFn0 = function (fn) {
  return function () {
    return fn({});
  };
};

exports.mkFn2 = function (fn) {
  /* jshint maxparams: 2 */
  return function (a, b) {
    return fn(a)(b);
  };
};

exports.mkFn3 = function (fn) {
  /* jshint maxparams: 3 */
  return function (a, b, c) {
    return fn(a)(b)(c);
  };
};

exports.mkFn4 = function (fn) {
  /* jshint maxparams: 4 */
  return function (a, b, c, d) {
    return fn(a)(b)(c)(d);
  };
};

exports.mkFn5 = function (fn) {
  /* jshint maxparams: 5 */
  return function (a, b, c, d, e) {
    return fn(a)(b)(c)(d)(e);
  };
};

exports.mkFn6 = function (fn) {
  /* jshint maxparams: 6 */
  return function (a, b, c, d, e, f) {
    return fn(a)(b)(c)(d)(e)(f);
  };
};

exports.mkFn7 = function (fn) {
  /* jshint maxparams: 7 */
  return function (a, b, c, d, e, f, g) {
    return fn(a)(b)(c)(d)(e)(f)(g);
  };
};

exports.mkFn8 = function (fn) {
  /* jshint maxparams: 8 */
  return function (a, b, c, d, e, f, g, h) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h);
  };
};

exports.mkFn9 = function (fn) {
  /* jshint maxparams: 9 */
  return function (a, b, c, d, e, f, g, h, i) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i);
  };
};

exports.mkFn10 = function (fn) {
  /* jshint maxparams: 10 */
  return function (a, b, c, d, e, f, g, h, i, j) {
    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i)(j);
  };
};

exports.runFn0 = function (fn) {
  return fn();
};

exports.runFn2 = function (fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
};

exports.runFn3 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
};

exports.runFn4 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return fn(a, b, c, d);
        };
      };
    };
  };
};

exports.runFn5 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return fn(a, b, c, d, e);
          };
        };
      };
    };
  };
};

exports.runFn6 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return fn(a, b, c, d, e, f);
            };
          };
        };
      };
    };
  };
};

exports.runFn7 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return fn(a, b, c, d, e, f, g);
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn8 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return fn(a, b, c, d, e, f, g, h);
                };
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn9 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return function (i) {
                    return fn(a, b, c, d, e, f, g, h, i);
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};

exports.runFn10 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return function (i) {
                    return function (j) {
                      return fn(a, b, c, d, e, f, g, h, i, j);
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};
},{}],"output/Data.Function.Uncurried/index.js":[function(require,module,exports) {
// Generated by purs version 0.12.5
"use strict";

var $foreign = require("./foreign.js");

var runFn1 = function runFn1(f) {
  return f;
};

var mkFn1 = function mkFn1(f) {
  return f;
};

module.exports = {
  mkFn1: mkFn1,
  runFn1: runFn1,
  mkFn0: $foreign.mkFn0,
  mkFn2: $foreign.mkFn2,
  mkFn3: $foreign.mkFn3,
  mkFn4: $foreign.mkFn4,
  mkFn5: $foreign.mkFn5,
  mkFn6: $foreign.mkFn6,
  mkFn7: $foreign.mkFn7,
  mkFn8: $foreign.mkFn8,
  mkFn9: $foreign.mkFn9,
  mkFn10: $foreign.mkFn10,
  runFn0: $foreign.runFn0,
  runFn2: $foreign.runFn2,
  runFn3: $foreign.runFn3,
  runFn4: $foreign.runFn4,
  runFn5: $foreign.runFn5,
  runFn6: $foreign.runFn6,
  runFn7: $foreign.runFn7,
  runFn8: $foreign.runFn8,
  runFn9: $foreign.runFn9,
  runFn10: $foreign.runFn10
};
},{"./foreign.js":"output/Data.Function.Uncurried/foreign.js"}],"output/VDom/index.js":[function(require,module,exports) {
"use strict";

var $foreign = require("./foreign.js");

var Data_Function_Uncurried = require("../Data.Function.Uncurried/index.js"); // import Effect.Uncurried (Fn2)


var Node = function () {
  function Node() {}

  ;
  Node.value = new Node();
  return Node;
}();

var Attribute = function () {
  function Attribute() {}

  ;
  Attribute.value = new Attribute();
  return Attribute;
}(); // keyedNode : String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg
// node : String -> List (Attribute msg) -> List (Node msg) -> Node msg
// nodeNS : String -> String -> List (Attribute msg) -> List (Node msg) -> Node msg
// keyedNodeNS : String -> String -> List (Attribute msg) -> List ( String, Node msg ) -> Node msg


var style = Data_Function_Uncurried.runFn2($foreign.styleImpl);

var property = function property(key) {
  return function (value) {
    return $foreign.propertyImpl(key, value);
  };
};

var nodeNS = function nodeNS(ns) {
  return function (tag) {
    return Data_Function_Uncurried.runFn4($foreign.nodeNSImpl)(ns)($foreign.noScript(tag));
  };
};

var node = function node($0) {
  return Data_Function_Uncurried.runFn3($foreign.nodeImpl)($foreign.noScript($0));
};

var keyedNodeNS = function keyedNodeNS(ns) {
  return function (tag) {
    return Data_Function_Uncurried.runFn4($foreign.keyedNodeNSImpl)(ns)($foreign.noScript(tag));
  };
};

var keyedNode = function keyedNode($1) {
  return Data_Function_Uncurried.runFn3($foreign.keyedNodeImpl)($foreign.noScript($1));
};

module.exports = {
  Node: Node,
  Attribute: Attribute,
  nodeNS: nodeNS,
  node: node,
  keyedNodeNS: keyedNodeNS,
  keyedNode: keyedNode,
  style: style,
  property: property,
  dLog: $foreign.dLog,
  text: $foreign.text,
  noScript: $foreign.noScript,
  nodeNSImpl: $foreign.nodeNSImpl,
  nodeImpl: $foreign.nodeImpl,
  keyedNodeNSImpl: $foreign.keyedNodeNSImpl,
  keyedNodeImpl: $foreign.keyedNodeImpl,
  styleImpl: $foreign.styleImpl,
  propertyImpl: $foreign.propertyImpl
};
},{"./foreign.js":"output/VDom/foreign.js","../Data.Function.Uncurried/index.js":"output/Data.Function.Uncurried/index.js"}],"output/Html/index.js":[function(require,module,exports) {
"use strict";

var VDom = require("../VDom/index.js");

var text = VDom.text;
var node = VDom.node;
var div = VDom.node("div");
module.exports = {
  node: node,
  text: text,
  div: div
};
},{"../VDom/index.js":"output/VDom/index.js"}],"output/Html.Attributes/index.js":[function(require,module,exports) {
"use strict";

var VDom = require("../VDom/index.js");

var style = VDom.style;
module.exports = {
  style: style
};
},{"../VDom/index.js":"output/VDom/index.js"}],"output/Main/index.js":[function(require,module,exports) {
"use strict";

var Effect_Console = require("../Effect.Console/index.js");

var FFI = require("../FFI/index.js");

var Html = require("../Html/index.js");

var Html_Attributes = require("../Html.Attributes/index.js"); // log "12"


var main = function __do() {
  FFI["_log"](Html.div([Html_Attributes.style("width")("12px")])([]))();
  return Effect_Console.log("main")();
};

module.exports = {
  main: main
};
},{"../Effect.Console/index.js":"output/Effect.Console/index.js","../FFI/index.js":"output/FFI/index.js","../Html/index.js":"output/Html/index.js","../Html.Attributes/index.js":"output/Html.Attributes/index.js"}],"app.js":[function(require,module,exports) {
function main() {
  require("./output/Main").main();
}

if (module.hot) {
  module.hot.accept(function () {
    document.body.innerHTML = "";
    main();
  });
}

main();

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function (a) {
    return function (b) {
      return fun(a, b);
    };
  });
}

var organizeFacts = function organizeFacts(factList) {
  for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
  {
    var entry = factList.a;
    var tag = entry.$;
    var key = entry.n;
    var value = entry.o;

    if (tag === 'a2') {
      key === 'className' ? _VirtualDom_addClass(facts, key, _Json_unwrap(value)) : facts[key] = _Json_unwrap(value);
      continue;
    }

    var subFacts = facts[tag] || (facts[tag] = {});
    tag === 'a3' && key === 'class' ? _VirtualDom_addClass(subFacts, key, value) : subFacts[key] = value;
  }

  return facts;
};

window.nodeNS = F2(function (namespace, tag) {
  return F2(function (factList, kidList) {
    for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
    {
      var kid = kidList.a;
      descendantsCount += kid.b || 0;
      kids.push(kid);
    }

    descendantsCount += kids.length;
    return {
      $: 1,
      c: tag,
      d: organizeFacts(factList),
      e: kids,
      f: namespace,
      b: descendantsCount
    };
  });
});
window.node_ = nodeNS(undefined);

window.nodeNS2 = function (namespace) {
  return function (tag) {
    return function (factList) {
      return function (kidList) {
        for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
        {
          var kid = kidList.a;
          descendantsCount += kid.b || 0;
          kids.push(kid);
        }

        descendantsCount += kids.length;
        return {
          $: 1,
          c: tag,
          d: organizeFacts(factList),
          e: kids,
          f: namespace,
          b: descendantsCount
        };
      };
    };
  };
};
},{"./output/Main":"output/Main/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50072" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map