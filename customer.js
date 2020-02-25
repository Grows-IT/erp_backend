var express = require("express");
var app = express();
var connection = require("./db");
const router = express.Router();

router.route('/customer')
  .get(function (req,res){
    connection.query("select * from erp.Customer", (err, rows, fields) => {
          // connection.end();
          if (!err) {
            res.send(rows)
            console.log(rows);
            return rows;
          } else {
            console.log(err);
          }
        });
  })
  .post(function (req,res){
    connection.query("insert into erp.Customer (customerName, address) values ('a', 'b');", (err, rows, fields) => {
          // connection.end();
          if (!err) {
            res.send(rows);
            console.log(rows);
          } else {
            console.log(err);
          }
        });
  })
  .delete(function (req,res){
    connection.query("select * from erp.Invoices", (err, rows, fields) => {
          // connection.end();
          if (!err) {
            res.send(rows);
            console.log(rows);
          } else {
            console.log(err);
          }
        });
  })
  .patch(function (req,res){
    connection.query("select * from erp.Invoices", (err, rows, fields) => {
          // connection.end();
          if (!err) {
            res.send(rows);
            console.log(rows);
          } else {
            console.log(err);
          }
        });
  })

  module.exports = router;