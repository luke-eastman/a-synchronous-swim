const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
};

module.exports.dequeue = () => {
  var dequeuedMessage = messages.shift()
  console.log(`Dequeing message: ${dequeuedMessage}`);
  // returns undefined if messages array is empty
  return dequeuedMessage;
};