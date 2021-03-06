var express = require('express');
var app = express();
var connection = require('./db');
var mysqlAdmin = require('node-mysql-admin');
var customer = require('./customer');
var invoice = require('./invoice');
var signin = require('./signin')
var supplier = require('./supplier')
var quotation = require('./quotation')
var items = require('./items');
var users = require('./users');
var department = require('./department');
var supplieritem = require('./supplieritem');
var pr = require('./PR');
var po = require('./PO')

var router = express.Router();
var Koa = require('koa');
const convert = require('koa-convert');
const bodyParser = require('body-parser')

const appKoa = module.exports = new Koa();
const expressApp = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

module.exports = router;
expressApp.use(mysqlAdmin(expressApp));
appKoa.use(convert(function* (next) {
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, PUT, DELETE, OPTIONS");
    res.header('Content-Type: application/json');
    next();
});

app.use(supplier);
app.use(invoice);
app.use(customer);
app.use(signin);
app.use(quotation);
app.use(items);
app.use(users);
app.use(department);
app.use(supplieritem);
app.use(pr);
app.use(po);


app.get('/quotationCount', function (req, res, next) {
    connection.query('select * from erp.Quotation', (err, rows, fields) => {
        // connection.end();
        if (!err) {
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