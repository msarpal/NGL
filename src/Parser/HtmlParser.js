var request = require("request");
var http = require("https")
var cheerio = require("cheerio");
var generator = require('ngram-natural-language-generator').generator;
var fs = require("fs");
var JSSoup = require('jssoup').default;

var express = require('express');
var router = express.Router();

router.get('/form', htmlParse);
router.get('/form/nlg', nlg);

module.exports = router;


var inputTags = "";
var url = "";
var soupObject = "";
var label = "";
//var listform = ["text", "email", "radio", "checkbox", "password", "file", "image",/*"hidden"*/];

function htmlParse(req, res) {
    //http://localhost:4000/api/parse/form?url=https://unsplash.com/login
    if (req.query.url != undefined) {
        url = req.query.url;
        console.log("started!\n ");
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {

                var $ = cheerio.load(html);

                $('input').each(function () {
                    inputTags = $(this);

                    label = $('label[for="' + inputTags.attr('id') + '"]');

                    if (label.length > 0) {
                       
                        console.log(label.text());
                    }
                    else {
                        if (inputTags.attr('id') != undefined) {

                            if (inputTags.attr('placeholder') != undefined) {

                                console.log(inputTags.attr('placeholder'))
                            }
                        }
                    }

                });

            }
            else {
                console.log("+++    There is a problem while accesing contents of HTML form +++ \n");
                console.log(error);
            }

        });

    }
}

function nlg(req, res) {
    generator({
        text: 'Colorless green ideas sleep furiously.',
        model: {
            maxLength: 100,
            minLength: 50
        }
    }, function (err, sentence) {
        console.log(sentence);
    });

}