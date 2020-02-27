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
    var name = req.body.name;
    var address = req.body.address;
    connection.query("insert into erp.Customer (customerName, address) values (?,?)",[name, address], function (err, rows, fields) {
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
      var name= req.body.name;
      var address = req.body.address;
      var cusId = req.body.cusId;
      console.log(req.body);
      
    connection.query("update erp.Customer set customerName = ?, address = ? where customerId = ?",[name,address,cusId], function (err, rows, fields) {
          // connection.end();
          if (!err) {
            res.send(rows);
            console.log(rows);
          } else {
            console.log(err);
          }
        });
  })

  router.route('/deletecustomer')
  .post(function (req,res){      
    console.log(req.body.cusId);
    var cusId = req.body.cusId;    
    connection.query("delete from erp.Customer where customerId = ?",[cusId], function (err, rows, fields) {
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