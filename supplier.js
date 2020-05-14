var express = require("express");
var app = express();
var connection = require("./db");
const router = express.Router();

router.route('/supplier')
  .get(function (req, res) {
    connection.query("select * from erp.Supplier", (err, rows, fields) => {
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
    connection.query("insert into erp.Supplier (name, contactPerson, address, taxId) values (?, ?, ?, ?)", [req.body.name, req.body.address, req.body.contactPerson, req.body.taxId], function (err, rows, fields) {
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
    console.log(req.body.taxId);
    
    connection.query("update erp.Supplier set name = ?, contactPerson = ?, address = ?, taxId = ? where supplierId = ?", [req.body.name, req.body.address, req.body.contactPerson, req.body.taxId, req.body.supplierId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/deletesupplier')
  .post(function (req, res) {
    connection.query("delete from erp.Supplier where supplierId = ?", [req.body.supplierId], function (err, rows, fields) {
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