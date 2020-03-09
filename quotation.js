var express = require('express');
var connection = require('./db');

const router = express.Router();

router.route('/quotation')
  .get((req, res) => {
    connection.query('select s.sellQuantity, s.itemId, q.quotationStatus,c.customerId, s.sellItemId, u.userId, u.companyId, u.email, q.quotationId,q.date, q.expirationDate, q.invoiceId from erp.Quotation q, erp.Customer c, erp.User u, erp.SellItems s, erp.Items i where q.customerId = c.customerId and q.userId = u.userId and q.sellItemId = s.sellitemId and s.itemId = i.itemId', (err, rows, fields) => {
      if (err) {
        return console.log(err)
      } else {
        // console.log(rows);
        res.send(rows);
      }
    })
  })
  .post((req, res) => {
    let sellItemId;
    let user;
    connection.query('insert into erp.SellItems (itemId, sellQuantity) values (?, ?)', [req.body.items.itemId, req.body.items.quantity], (err, val, fields) => {
      sellItemId = val.insertId;

      connection.query('select userId, companyId from erp.User where email = ?', [req.body.email], (err2, val2, fields2) => {
        user = val2[0];

        connection.query('insert into erp.Quotation (customerId, sellItemId, invoiceId, userId, companyId, date, expirationDate, quotationStatus, creator) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [req.body.customerId, sellItemId, req.body.invoiceId, user.userId, user.companyId, new Date(req.body.date), new Date(req.body.expirationDate), req.body.status, req.body.email]);
      })
    })
  })
  .patch((req, res) => {
    connection.query('update erp.SellItems set SellItems.itemId = ?, SellItems.sellQuantity = ? where SellItems.sellItemId = ?', [req.body.items.itemId, req.body.items.quantity, req.body.sellItemId], (err, val, fields) => {

      connection.query('update erp.Quotation set Quotation.customerId = ?, Quotation.date = ?, Quotation.expirationDate = ? where Quotation.quotationId = ?',
        [req.body.customerId, req.body.date, req.body.expirationDate, req.body.quotationId], function (err, rows, fields) {

          if (!err) {
            res.send(rows);
            console.log(rows);
          } else {
            console.log(err);
          }
        })
    })
  })

router.route('/deletequotation')
  .patch(function (req, res) {
    console.log(req.body);

    var id = req.body.quotationId;
    var invoiceId = req.body.invoiceId;

    connection.query("update erp.Quotation set Quotation.quotationStatus = 'canceled' where quotationId = ?", [id], (err, rows, fields) => {
      connection.query('update erp.Invoices set invoiceStatus = "canceled" where invoiceId = ?', [invoiceId], (err2, rows2, fields2) => {
        if (!err2) {
          res.send(rows2);
        } else {
          console.log(err2);
        }
      })
    });
  })

router.route('/updateQuotation')
  .patch((req, res) => {
    connection.query("update erp.Quotation set Quotation.invoiceId = ? where quotationId = ?", [req.body.invoiceId, req.body.quotationId], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })

module.exports = router;