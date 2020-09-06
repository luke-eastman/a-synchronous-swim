const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  messages.push(message);
};

module.exports.dequeue = () => {
  var dequeuedMessage = messages.shift()
  // returns undefined if messages array is empty
  return dequeuedMessage;
};