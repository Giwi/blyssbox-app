const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const axios = require('axios').default;
const {exec} = require('child_process');
const cachios = require('cachios');

const api = axios.create({
   // adapter: cache.adapter
});

const headers = {
    'If-Modified-Since': 'Mon, 27 Mar 1972 00:00:00 GMT',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json; charset=utf-8'
};

const app = express()
    .use(morgan('combined'))
    .use(express.static(__dirname + '/dist/blyssbox'))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(cors());
//   .use(favicon(__dirname + '/www/favicon.ico'));

app.get(/^\/(ui)\/.+$/, (req, res) => {
    cachios.get('https://www.liveez.castorama.fr' + req.originalUrl, {headers, ttl: 300})
        .then(response => res.json(response.data))
        .catch(error => {
            console.error(error);
            res.json({status: error});
        });
});
app.post(/^\/(ui)\/.+$/, (req, res) => {
    cachios.post('https://www.liveez.castorama.fr' + req.originalUrl, req.body, {headers, ttl: 300})
        .then(response => res.json(response.data))
        .catch(error => {
            console.error(error);
            res.json({status: error});
        });
});
app.put(/^\/(ui)\/.+$/, (req, res) => {
    cachios.put('https://www.liveez.castorama.fr' + req.originalUrl, req.body, {headers, ttl: 300})
        .then(response => res.json(response.data))
        .catch(error => {
            console.error(error);
            res.json({status: error});
        });
});
app.listen(process.env.PORT || 8001, () => {
    /* exec('/usr/bin/chromium-browser --full-screen --noerrdialogs --disable-infobars --kiosk http://localhost:8001', (err, stdout, stderr) => {
         if (err) {
             // node couldn't execute the command
             return;
         }

         // the *entire* stdout and stderr (buffered)
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
     });*/
});
