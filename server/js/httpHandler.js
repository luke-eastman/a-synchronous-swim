const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const random = require('./getRandom');
// const

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET') {
    var result = messageQueue.dequeue()
    if (result) {
      res.write(result);
    }
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
