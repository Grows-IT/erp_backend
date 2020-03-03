var express = require('express');
var app = express();
var connection = require('./db');
const router = express.Router();

router.route('/invoice')
  .get((req, res) => {
    connection.query('select * from erp.Quotation, erp.Invoices, erp.Customer, erp.SellItems, erp.Items, erp.SubInvoices, erp.InvoiceGroup, erp.User, erp.Company where Quotation.quotationId = Invoices.quotationId and Invoices.customerId = Customer.customerId and Invoices.sellItemId = SellItems.sellItemId and Invoices.invoiceGroupId = InvoiceGroup.invoiceGroupId and Quotation.sellItemId = SellItems.sellItemId and SellItems.sellItemId = SubInvoices.subInvoicesId and SubInvoices.sellItems = Items.itemId and Invoices.userId = User.userId and Invoices.companyId = Company.companyId', (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        // console.log(rows);
        return rows;
      } else {
        console.log(err);
      }
    })
  })
  .post((req, res) => {
    connection.query('select * from erp.Invoices', (err, rows, fields) => {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  .patch((req, res) => {
    connection.query('select * from erp.Invoices', (err, rows, fields) => {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  });


router.route('/invoiceGroup')
  .get((req, res) => {
    // console.log(req.query.id);

    connection.query('select * from erp.InvoiceGroup where invoiceId =' + req.query.id, (err, val, fields) => {
      // console.log(val);
      res.send(val);
    })
  })
  .post((req, res) => {
    console.log(req.body);
    // req.body.data.subInvoices
    connection.query('insert into erp.InvoiceGroup (groupName, invoiceId, subInvoicesId, invoiceGroupStatus) values (?, ?, ?, ?)', [req.body.data.name, req.body.invoiceId, 0, req.body.data.status], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  // cancel  invoice group
  .patch((req, res) => {
    connection.query('update erp.InvoiceGroup set invoiceGroupStatus = "cancel" where invoiceGroupId = ?', [req.body.index], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/changeGroupName')
  .patch((req, res) => {
    connection.query('update erp.InvoiceGroup set groupName = ? where invoiceGroupId = ?', [req.body.newName, req.body.id], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/subInvoice')
  .get((req, res) => {

  })
  .post((req, res) => {

  })
module.exports = router;
