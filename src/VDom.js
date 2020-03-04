const organizeFacts = function(factList) {
  for (
    var facts = {};
    factList.b;
    factList = factList.b // WHILE_CONS
  ) {
    var entry = factList.a;

    var tag = entry.$;
    var key = entry.__key;
    var value = entry.__value;

    if (tag === "a__1_PROP") {
      key === "className"
        ? _VirtualDom_addClass(facts, key, __Json_unwrap(value))
        : (facts[key] = __Json_unwrap(value));

      continue;
    }

    var subFacts = facts[tag] || (facts[tag] = {});
    tag === "a__1_ATTR" && key === "class"
      ? _VirtualDom_addClass(subFacts, key, value)
      : (subFacts[key] = value);
  }

  return facts;
};

const virtualize = function(node) {
  // TEXT NODES

  if (node.nodeType === 3) {
    return _VirtualDom_text(node.textContent);
  }

  // WEIRD NODES

  if (node.nodeType !== 1) {
    return _VirtualDom_text("");
  }

  // ELEMENT NODES

  var attrList = _List_Nil;
  var attrs = node.attributes;
  for (var i = attrs.length; i--; ) {
    var attr = attrs[i];
    var name = attr.name;
    var value = attr.value;
    attrList = _List_Cons(A2(_VirtualDom_attribute, name, value), attrList);
  }

  var tag = node.tagName.toLowerCase();
  var kidList = _List_Nil;
  var kids = node.childNodes;

  for (var i = kids.length; i--; ) {
    kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
  }
  return A3(_VirtualDom_node, tag, attrList, kidList);
};

exports.dLog = function(a) {
  console.log(a);
  return "1";
};

exports.text = function(s) {
  return {
    $: 0,
    a: s
  };
};

exports.noScript = function(tag) {
  return tag == "script" ? "p" : tag;
};

const _node = function(tag, factList, kidList, namespace) {
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

const _nodeNS = function(namespace, tag, factList, kidList) {
  return _node(tag, namespace, kidList, namespace);
};

exports.nodeNSImpl = _nodeNS;

exports.nodeImpl = _node;

const _keyedNode = function(tag, factList, kidList, namespace) {
  for (
    var kids = [], descendantsCount = 0;
    kidList.b;
    kidList = kidList.b // WHILE_CONS
  ) {
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

const _keyedNodeNS = function(namespace, tag, factList, kidList) {
  return _keyedNode(tag, namespace, kidList, namespace);
};

exports.keyedNodeNSImpl = _keyedNodeNS;
exports.keyedNodeImpl = _keyedNode;

exports.styleImpl = function(key, value) {
  return {
    $: "a1",
    n: key,
    o: value
  };
};

exports.propertyImpl = function(key, value) {
  return {
    $: "a2",
    n: key,
    o: value
  };
};
