var express = require('express');
var connection = require('./db');

const router = express.Router();

router.route('/quotation')
  .get((req, res) => {
    connection.query('select * from erp.Quotation, erp.Customer, erp.User where Quotation.customerId = Customer.customerId and Quotation.userId = User.userId', (err, rows, fields) => {
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

module.exports = router;