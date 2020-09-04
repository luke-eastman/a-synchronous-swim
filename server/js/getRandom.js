module.exports.getRandom = function() {
  var arr = ['left', 'right', 'up', 'down']
  return arr[Math.floor(Math.random() * 4)];
}