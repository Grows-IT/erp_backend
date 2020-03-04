var express = require("express");
var app = express();
var connection = require("./db");
const router = express.Router();

router.route('/items')
  .get(function (req, res) {
    connection.query("select * from erp.Items", (err, rows, fields) => {
      // connection.end();
      if (!err) {
        res.send(rows)
        // console.log(rows);
        return rows;
      } else {
        console.log(err);
      }
    });
  })
  .post(function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var availableQuantity = req.body.availableQuantity;
    connection.query("insert into erp.Items (itemName, availableQuantity, price) values (?, ?, ?)", [name, availableQuantity, price], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  .patch(function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var availableQuantity = req.body.availableQuantity;
    var itemId = req.body.itemId;
    connection.query("update erp.Items set itemName = ?, availableQuantity = ?, price = ? where itemId = ?", [name, availableQuantity, price, itemId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/deleteitem')
  .post(function (req, res) {
    var itemId = req.body.itemId;
    connection.query("delete from erp.Items where itemId = ?", [itemId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

  router.route('/sellItem')
    .get(function (req,res){      
      var itemId = req.body.itemId;    
      connection.query("select * from erp.SellItems", function (err, rows, fields) {
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
