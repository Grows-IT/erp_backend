var express = require('express');
var app = express();
var connection  = require('./db');
const router = express.Router();

router.get('/invoice', (req, res) => {
    connection.query('select * from erp.Invoices', (err, rows, fields) => {
        // connection.end();
        if(!err) {
            res.send(rows)
            console.log(rows);
        } else {
            console.log(err);
        }
    })
  }
);

module.exports = router;