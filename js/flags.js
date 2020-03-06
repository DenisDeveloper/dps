exports.VNodeFlags = {
  /* First set of bits define shape of vNode */
  HtmlElement: 1,
  ComponentUnknown: 2,
  Text: 16,

  // InputElement: 64,
  Void: 512,
  InUse: 16384,

  Element: 481
};

exports.ChildFlags = {
  UnknownChildren: 0, // When zero is passed children will be normalized
  /* Second set of bits define shape of children */
  HasInvalidChildren: 1,
  HasVNodeChildren: 1 << 1,
  HasNonKeyedChildren: 1 << 2,
  HasKeyedChildren: 1 << 3,
  HasTextChildren: 1 << 4
};
