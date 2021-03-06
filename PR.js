var express = require('express');
var connection = require('./db');

const router = express.Router();

router.route('/pr')
  .get(function (req, res) {
    connection.query("select * from erp.PR", (err, rows, fields) => {
      if (!err) {
        res.send(rows)
        // console.log(rows);
        return rows;
      } else {
        console.log(err);
      }
    });
    // connection.end();
  })
  .post((req, res) => {
    let PurchaseItemId;
    let sp;
    // console.log(req.body.items);
    connection.query('insert into erp.PurchaseItem (SiId, quantity, shippingCost, POid) values (?, ?, ?, ?)', [req.body.items.SiId, req.body.items.quantity, req.body.shippingCost, req.body.POid], (err, val, fields) => {
      PurchaseItemId = val.insertId;
      if (!err) {
        connection.query('select sId from erp.Supplier where name = ?', [req.body.spName], (err2, val2, fields2) => {
          sp = val2[0];
          if (!err2) {
            // console.log(req.body);
            connection.query('insert into erp.PR (sId, PiId, PRName, Status, AdditionalNotePR, createdBy, checkedBy, CreatedDate, CheckedDate, DeliveryAddress) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [sp.sId, PurchaseItemId, req.body.prName, req.body.status, req.body.addiNote, req.body.createdBy, req.body.checkedBy, new Date(), req.body.checkedDate, req.body.DeliveryAddress], (err3, val3, fields3) => {
                if (err3) {
                  console.log("error3 : " + err3);
                }
              })
          } else {
            console.log("error2: " + err2);
          }
        })
      } else {
        console.log("error1: " + err);
      }
    })
  })
  .patch((req, res) => {
    // console.log(req.body);
    connection.query('update erp.PR set PR.PRName = ?, PR.SId = ?, PR.AdditionalNotePR = ?, PR.DeliveryAddress = ? where PR.PRid = ?', [req.body.prName, req.body.sId, req.body.addiNote, req.body.DeliveryAddress, req.body.PRid], (err, val, fields) => {
      if (!err) {
        connection.query('update erp.PurchaseItem set PurchaseItem.SiId = ?, PurchaseItem.quantity = ?, PurchaseItem.shippingCost = ? where PurchaseItem.PiId = ?', [req.body.items.SiId, req.body.items.quantity, req.body.shippingCost, req.body.piId], (err2, val2, fields2) => {
          if (!err2) {
            console.log(val2);
            res.send(val2);
          } else {
            console.log(err2);
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

router.route('/updateStatusPr')
  .patch((req, res) => {
    connection.query("update erp.PR set PR.Status = ?, PR.checkedBy = ? where PR.PRId = ?", [req.body.status, req.body.checkedBy, req.body.PRid], (err, rows, fields) => {
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