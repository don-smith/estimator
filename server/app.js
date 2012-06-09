var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs');

http.createServer(function(req, res) {
  
  console.log(req.url);

  if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = '/srv/nodejs/apps/we/media';
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
  }

  if(req.url == '/' && req.method.toLowerCase() == 'get') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html><html><head><title>We-estimate</title></head><body>');

    //var files = fs.readdirSync(process.cwd()+'/media');
    //for(var i=0; i < files.length; i++) {
    //  res.write('<a href="/media/'+ files[i] +'">'+ files[i] +'</a><br/>');
    //}

    res.write('<em>This will be replaced by a list of estimate requests</em>')

    res.end('</body></html>');
  }

  if(req.url.substr(-4, 4).toLowerCase() == '.mov') {
    fs.readFile(req.url, 'binary', function(error, file) {
      if(error) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write(error + '\n');
        res.end();
      } else {     
        res.writeHead(200, {'Content-Type': 'video/mov'});
        res.write(file, 'binary');
        res.end();
      }
    });
  }

}).listen(8004, '0.0.0.0');

console.log('The we-estimate site is now listening on port 8004');
