exports._log = function(str) {
  return function() {
    console.log(str);
  };
};
