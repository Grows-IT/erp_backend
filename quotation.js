var express = require('express');
var connection = require('./db');

const router = express.Router();

router.route('/quotation')
  .get((req, res) => {
    connection.query('select * from erp.Quotation, erp.Customer, erp.User where Quotation.customerId = Customer.customerId and Quotation.userId = User.userId', (err, rows, fields) => {
      if (err) {
        return console.log(err)
      } else {
        console.log(rows);
        res.send(rows);
      }
    })
  })

module.exports = router;