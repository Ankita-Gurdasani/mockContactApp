// content of server.js
var express = require('express');
const port = 3000
const contactList = [
                        { 
                        id: 1,
                        name: "Gopala Krishnan",
                        email: {
                            personal: "gopalakrishnan@domain.com",
                            work: "gopalakrisnan@domain.com",
                        },
                        contactNumber: {
                            personal: 12345,
                            work: 123456789
                        }
                        },
                        {
                        id: 2,
                        name: "Prakash Kumar",
                        email: {
                            personal: "prakashkumar@domain.com",
                            work: "prakashkumar@domain.com"
                        },
                        contactNumber: {
                            personal: 6789,
                            work: 6474732929
                        }
                        },
                        {
                        id: 3,
                        name: "Gopinath",
                        email: {
                            personal: "gopinath@domain.com",
                            work: "gopinath@domain.com"
                        },
                        contactNumber: {
                            personal: 34567,
                            work: 109388380110 
                        }  
                        }
                    ]

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/data', function (req, res) {
    console.log(req)
    res.json(contactList);
});

app.listen(port, () => console.log('Example app listening on port 3000!'))
                    