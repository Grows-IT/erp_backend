var express = require('express');
var connection = require('./db');

const router = express.Router();

router.route('/pr')
  .get(function (req, res) {
    connection.query("select * from erp.PR", (err, rows, fields) => {
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
  .post((req, res) => {
    let PurchaseItemId;
    let sp;
    connection.query('insert into erp.PurchaseItem (SiId, quantity, shippingCost, POid) values (?, ?, ?, ?)', [req.body.items.SiId, req.body.items.quantity, req.body.shippingCost, req.body.POid], (err, val, fields) => {
      console.log(req.body);
      console.log(val);
      

      PurchaseItemId = val.insertId;

      connection.query('select supplierId from erp.Supplier where name = ?', [req.body.spName], (err2, val2, fields2) => {
        sp = val2[0];

        connection.query('insert into erp.PR (POid, supplierId, PiId, PRName, Status, AdditionalNotePR, createdBy, approvedBy,  CreatedDate, ApprovedDate, DeliveryAddress) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [req.body.POid, sp.supplierId, PurchaseItemId, req.body.prName, req.body.status, req.body.addiNote, req.body.createdBy, req.body.approvedBy, new Date().getDate(), req.body.approvedDate, req.body.DeliveryAddress], (err2, val3, fields2) => {
            // prid = val3.insertId;
            // console.log(val3);
            
            // connection.query('insert into erp.PurchaseItem (PRid) values (?)', [prid]);

            })
          })
      })
    })

    router.route('/deletepr')
      .post(function (req, res) {
        var prId = req.body.prId;
        connection.query("delete from erp.PR where PRid = ?", [prId], function (err, rows, fields) {
          // connection.end();
          if (!err) {
            res.send(rows);
            console.log(rows);
          } else {
            console.log(err);
          }
        });
      })

    router.route('/purchaseitem')
      .get(function (req, res) {
        connection.query("select * from erp.PurchaseItem", (err, rows, fields) => {
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

    router.route('/updatestatuspr')
      .patch(function (req, res) {
        connection.query("update erp.PR set Status = ? where PRid = ?", [req.body.status, req.body.PRid], (err, rows, fields) => {
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

    module.exports = router;