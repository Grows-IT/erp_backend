var express = require('express');

var app = express();
var connection  = require('./db');
var mysqlAdmin = require('node-mysql-admin');
var router = express.Router();
var invoice = require('./invoice.js');
var Koa = require('koa');
const convert = require('koa-convert');
const appKoa = module.exports = new Koa();
const expressApp = express();

module.exports = router;
expressApp.use(mysqlAdmin(expressApp));
appKoa.use(convert(function *(next) {
    // do routing by simple matching, koa-route may also work
    if (this.path.startsWith('/myadmin')) {
        // direct to express
        if (this.status === 404 || this.status === '404') {
            delete this.res.statusCode
        }
        // stop koa future processing (NOTE not sure it is un-doc feature or not?)
        this.respond = false
        // pass req and res to express
        expressApp(this.req, this.res)
    } else {
        // go to next middleware
        yield next
    }
}));

app.use(mysqlAdmin(app));


// app.get('/invoice', function(req, res, next) {
//     connection.query('select * from erp.Invoice', (err, rows, fields) => {
//         // connection.end();
//         if(!err) {
//             res.send(rows)
//             console.log(rows);
//         } else {
//             console.log(err); 
//         }
//     })
//     // Handle the get for this route
//   });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(invoice);

app.get('/quotationCount', function(req, res, next) {
    connection.query('select * from erp.Quotation', (err, rows, fields) => {
        // connection.end();
        if(!err) {
            res.send(rows)
            console.log(rows);
        } else {
            console.log(err); 
        }
    })
    // Handle the get for this route
  });

// app.post('/quotationCount', (req, res) => {
//     connection.query('alter table erp.Invoices add createReceiptDate Date', (err, rows, fields) => {
//         // connection.end();
//         if(!err) {
//             res.send(rows)
//         } else {
//             console.log(err);
            
//         }
//     })
// })

app.get('/getQuotation', (req, res) => {
    connection.query('select')
})

app.listen(3333);