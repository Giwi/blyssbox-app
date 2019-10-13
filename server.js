const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require('axios').default;


const headers = {
    'If-Modified-Since': 'Mon, 27 Mar 1972 00:00:00 GMT',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json; charset=utf-8'
};

const app = express()
    .use(morgan('combined'))
    .use(express.static(__dirname + '/www'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(cors());
//   .use(favicon(__dirname + '/www/favicon.ico'));

app.get(/^\/(ui)\/.+$/, (req, res) => {
    axios.get('https://www.liveez.castorama.fr' + req.originalUrl, {headers})
        .then(response => res.json(response.data))
        .catch(error => res.json({status: error}));
});
app.post(/^\/(ui)\/.+$/, (req, res) => {
    axios.post('https://www.liveez.castorama.fr' + req.originalUrl, req.body, {headers})
        .then(response => res.json(response.data))
        .catch(error => res.json({status: error}));
});
app.listen(8001);
