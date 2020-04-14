var express = require("express");
var app = express();
var connection = require("./db");
const router = express.Router();

router.route('/supplieritem')
  .get(function (req, res) {
    connection.query("select * from erp.SupplierItem ", (err, rows) => {
      // connection.end();
      if (!err) {
        res.send(rows)
        console.log(rows);
        console.log(req.body);
        
        return rows;
      } else {
        console.log(err);
      }
    });
  })
  .patch(function (req, res) {
    
    connection.query("update erp.SupplierItem set type = ?,name = ?, price = ?, description = ? where SiId = ?", [req.body.type, req.body.name, req.body.price, req.body.description, req.body.SiId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  .post(function (req, res) {
    connection.query("insert into erp.SupplierItem (type, name, price, description) values (?, ?, ?, ?)", [req.body.type, req.body.name, req.body.price, req.body.description], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

  router.route('/deletesupIt')
  .post(function (req, res) {
    connection.query("delete from erp.SupplierItem where SiId = ?", [req.body.SiId], function (err, rows, fields) {
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