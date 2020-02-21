var express = require('express');
var app = express();
var connection  = require('./db');
var mysqlAdmin = require('node-mysql-admin');
var Koa = require('koa');
const convert = require('koa-convert');
const appKoa = module.exports = new Koa();
const expressApp = express();

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

app.get('/quotationCount', (req, res) => {
    connection.query('select * from erp.Customer', (err, rows, fields) => {
        // connection.end();
        if(!err) {
            res.send(rows)
        } else {
            console.log(err);
            
        }
    })
})

app.listen(3333);