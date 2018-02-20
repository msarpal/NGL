var http = require('http');
var htmlparser = require('htmlparser2');

var express = require('express');
var router = express.Router();

router.get('/', htmlParse);
module.exports = router;

function htmlParse(req,res){
    console.log("started!");

    var url = 'http://www.dotnetcurry.com/nodejs/1270/read-html-file-and-send-html-response-nodejs'
    
    http.get(url, function(err,response) {
        console.log("http");
        if(err){console.log(" Problem in reading html content !");}
        else{
      parseResponse(response);}
    })
    
    var parseResponse = function(response) {
        console.log('in parse Response');
      var data = "";
      response.on('data', function(chunk) {
        data += chunk;
      });
      var tags = [];
      var tagsCount = {};
      var tagsWithCount = [];
      response.on('end', function(chunk) {
        var parsedData = new htmlparser.Parser({
         onopentag: function(name, attribs) {
          if(tags.indexOf(name) === -1) {
           tags.push(name);
     tagsCount[name] = 1;
           } else {
     tagsCount[name]++;
           }
         },
         onend: function() {
          for(var i = 1;i < tags.length;i++) {
           tagsWithCount.push({name:tags[i], count:tagsCount[tags[i]]});
         }
        }
       }, {decodeEntities: true});
       parsedData.write(data);
       parsedData.end();
       console.log(tagsWithCount);
      });
    }
}