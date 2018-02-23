var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var JSSoup = require('jssoup').default;

var express = require('express');
var router = express.Router();

router.get('/form', htmlParse);
module.exports = router;

var data = [];
var url = "";
var soup = "";

function htmlParse(req, res) {
    //http://localhost:4000/api/parse/form?url=https://unsplash.com/login
    if (req.query.url != undefined) {
        url = req.query.url;
        console.log("started!\n ");
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                // var $ = cheerio.load(html);

                // $('form').find('label').each(function (i,e) {
                //     var output = $(this);
                //     // console.log(output.text());

                    
                //      if (output.text() != "") {
                         
                //          data.push(output.text().replace(/[^a-zA-Z ]/g, "").replace(/^\s+|\s+$/g, ''));
                //      }
                   

                // });
                // console.log(data);

                soup = new JSSoup(html); 
               
                var listform = ["text","radio", "checkbox", "password", "file", "image",/*"hidden"*/];
                var result = soup.findAll('input', {'type': listform});
                console.log('res '+result);
                for(var index = 0 ; index < result.length ; index++){
                    console.log(result[index].attrs.id+"");
                }
                
            }
          
        });

    }

}