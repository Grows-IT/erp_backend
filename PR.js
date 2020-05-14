var express = require('express');
var connection = require('./db');

const router = express.Router();

router.route('/pr')
  .get(function (req, res) {
    connection.query("select * from erp.PR", (err, rows, fields) => {
      // console.log(fields);

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
      PurchaseItemId = val.insertId;
      if (!err) {
        connection.query('select sId from erp.Supplier where name = ?', [req.body.spName], (err2, val2, fields2) => {
          sp = val2[0];
          if (!err2) {
            console.log(req.body);
            connection.query('insert into erp.PR (sId, PiId, PRName, Status, AdditionalNotePR, createdBy, approvedBy, CreatedDate, ApprovedDate, DeliveryAddress) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [sp.sId, PurchaseItemId, req.body.prName, req.body.status, req.body.addiNote, req.body.createdBy, req.body.approvedBy, new Date(), req.body.approvedDate, req.body.DeliveryAddress], (err3, val3, fields3) => {


              })
          }
        })
      }
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