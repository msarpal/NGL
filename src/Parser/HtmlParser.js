var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

var express = require('express');
var router = express.Router();

router.get('/form', htmlParse);
module.exports = router;

var data = [];
var url = "";

function htmlParse(req, res) {
    //http://localhost:4000/api/parse/form?url=https://www.indeed.com/jobs?l=Los+Angeles&_ga=2.200827310.1261035140.1519200447-880084272.1519200447
    if (req.query.url != undefined) {
        url = req.query.url;
        console.log("started!\n ");
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);

                $('input').filter(function () {
                    var output = $(this).prev();
                     console.log(output.text());

                    
                    if (output.text() != "") {
                        data.push(output.text().replace(/[^a-zA-Z ]/g, "").replace(/^\s+|\s+$/g, ''));
                    }
                    // console.log(output.text());

                });
                console.log(data);
            }
        });

    }

}