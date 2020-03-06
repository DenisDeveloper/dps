function main() {
  require("./output/Main").main();
}

if (module.hot) {
  module.hot.accept(function() {
    document.body.innerHTML = "";
    main();
  });
}

main();

const core = require("./src/Jack/Core.js");
const vNode = require("./src/Jack/VNode.js");
// // console.log(core);
const root = core.findElement("root");
const txt = vNode.textNode("hello");
const txt1 = vNode.textNode("you");
const foo = ch => vNode.createVNode("div", "main", [ch], 4, null, null, null);
//
// console.log("------");
// console.log(foo);
// console.log(txt);

core.render_ffi(foo(txt), root)();

setTimeout(() => {
  console.log("rerender");
  core.render_ffi(foo(txt1), root)();
}, 2000);
