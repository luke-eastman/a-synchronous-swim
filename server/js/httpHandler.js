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

  if (req.method === 'GET') {

    if (req.url === '/background.jpg') {
      console.log('fs', fs.readFile);
      fs.readFile(__dirname + '/..' + req.url, function (err, data) {
        if (err) {
          res.writeHead(404, headers);
          res.end(JSON.stringify(err));
          return;
        }

        res.writeHead(200, headers);
        res.write(data);
        res.end();
        next(); // invoke next() at the end of a request to help with testing!
        return ;
      });
    } else if (req.url === '/') {
      res.writeHead(200, headers);
      var result = messageQueue.dequeue();
      if (result) {
        res.write(result);
      }
      res.end();
      next(); // invoke next() at the end of a request to help with testing!
    } else {
      res.writeHead(404, headers);
      res.end();
      next();
    }
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  } else if (req.method === 'POST') {
    if (req.url === '/background.jpg') {
      var fileData = Buffer.alloc(0);

      req.on('data', chunk => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      req.on('end', ()=> {
        var file = multipart.getFile(fileData);

        fs.writeFile(__dirname + '/../background.jpg', file.data, (err) => {
          res.writeHead(err ? 400 : 201, headers);
          res.end();
          next();
        });
      });
    }

    // next(); // invoke next() at the end of a request to help with testing!
  }
};


