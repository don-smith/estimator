var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs'),
    port = process.env.port || 1337; // ;)

http.createServer(function(req, res) {
  
  console.log(req.url);

  if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = '/srv/nodejs/apps/we/media';
    form
      .on('fileBegin', function(name, file) {
              file.path = form.uploadDir + '/' + file.name;
      })
      .on('end', function() {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('received files');
      });
    form.parse(req);
  }

  if(req.url == '/upload-success' && req.method.toLowerCase() == 'get') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.write('received upload:\n\n');
    res.end('<h1>Sweet as!</h1>')
  }

  if(req.url == '/' && req.method.toLowerCase() == 'get') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html><html><head><title>We-estimate</title></head><body>');
    res.write('<h1>We-estimate</h1><h3>Uploaded videos</h3><ol>');

    //var files = fs.readdirSync(process.cwd()+'/media');
    //for(var i=0; i < files.length; i++) {
    //  res.write('<a href="/media/'+ files[i] +'">'+ files[i] +'</a><br/>');
    //}

    res.write('<em>This will be replaced by a list of estimate requests</em>')

    res.end('</ol><p><em>&copy; 2012 We-estimate</em></p></body></html>');
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

}).listen(port, '0.0.0.0');
