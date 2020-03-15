let baseUrl, expect, file, fs, line, request;
expect = require('Chai').expect;
request = require('request');
fs = require('fs');
https = require('https');
require('it-each')({ testPerIteration: true });

baseUrl = process.env.BASE_URL;
file = fs.readFileSync('redirects.txt', { encoding: 'UTF-8' }).split("\n");

let URLs = []
for (_i = 0, line_len = file.length; _i < line_len; _i++) {
  line = file[_i];
  if (!line.startsWith('#')) {
    target = line.split(' ');
    if (target[0].length > 0 && !target[0].startsWith('https://')) {
      let element = {};
      element.uri = baseUrl + target[0];
      element.recirectUri = target[1];
      element.statusCode = target[2].endsWith('!') ? target[2].slice(0, -1) : target[2];
      URLs.push(element)
    }
  }
}

describe('redirect 301 checks', function(){
  it.each(URLs, 'Testing code of %s', ['uri'], function(element, done){
    request.get({
      followRedirect: false,
      uri: element.uri,
    }, function(err, res, body) {
      expect(res.statusCode).to.equal(Number(element.statusCode));
      done();
    });
  });
});

describe('redirected site 200 checks', function(){
  it.each(URLs, 'Testing code of %s', ['uri'], function(element, done){
    request.get({
      followRedirect: true,
      uri: element.uri,
      headers: {
        'User-Agent': 'HTTP Redirect Check v0.1'
      }
    }, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
