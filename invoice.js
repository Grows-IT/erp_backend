var express = require('express');
var app = express();
var connection = require('./db');
const router = express.Router();

router.route('/invoice')
  .get((req, res) => {
    // connection.query('select * from erp.Quotation, erp.Invoices, erp.Customer, erp.SellItems, erp.Items, erp.SubInvoices, erp.InvoiceGroup, erp.User, erp.Company where Quotation.quotationId = Invoices.quotationId and Invoices.customerId = Customer.customerId and Invoices.sellItemId = SellItems.sellItemId and Invoices.invoiceGroupId = InvoiceGroup.invoiceGroupId and Quotation.sellItemId = SellItems.sellItemId and SellItems.sellItemId = SubInvoices.subInvoicesId and SubInvoices.sellItems = Items.itemId and Invoices.userId = User.userId and Invoices.companyId = Company.companyId', (err, rows, fields) => {
    connection.query('select i.invoiceId, q.quotationId, c.customerId, c.customerName, c.address, i.sellItemId, i.invoiceStatus, i.creator, i.createReceiptDate, q.date, s.itemId, s.sellQuantity from erp.Quotation q, erp.Invoices i, erp.Customer c, erp.SellItems s where q.quotationId = i.quotationId and i.customerId = c.customerId and s.sellItemId = i.sellItemId', (err, rows, fields) => {
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
    // console.log(req.body);
    connection.query('insert into erp.Invoices(customerId, sellItemId, quotationId, userId, companyId, invoiceStatus, creator, createReceiptDate values (?, ?, ?, ?, ?, ?, ?, ?)', [req.body.customerId, req.body.sellItemId, req.body.quotationId, req.body.userId, req.body.companyId, req.body.status, req.body.email, req.body.createReceiptDate], (err, rows, fields) => {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);c
      } else {
        console.log(err);
      }
    });
  })
  .patch((req, res) => {
    // connection.query('select * from erp.Quotation q where q.invoiceId = ? and q.quotationId = ?', [req.body.invoiceId, req.body.quotationId], (err, rows, fields) => {
    // connection.end();
    connection.query('update erp.Invoices set invoiceStatus = "canceled" where invoiceId = ?', [req.body.invoiceId], (err, rows, fields) => {
      connection.query('update erp.Quotation set invoiceId = "0" where quotationId = ?', [req.body.quotationId]);
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
    connection.query('insert into erp.InvoiceGroup (groupName, invoiceId, invoiceGroupStatus) values (?, ?, ?)', [req.body.data.name, req.body.invoiceId, req.body.data.status], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  // canceled  invoice group
  .patch((req, res) => {
    connection.query('update erp.InvoiceGroup set invoiceGroupStatus = "canceled" where invoiceGroupId = ?', [req.body.index], (err, rows, fields) => {
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
    // console.log('--------- sub inv ---------');
    // console.log(req.query.groupId);
    connection.query('select * from erp.SubInvoices s where s.groupId = ?', [req.query.groupId], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })
  .post((req, res) => {
    // console.log(req.body.groupId);
    connection.query('insert into erp.SubInvoices(subInvoiceName, sellItems, subInvoiceStatus, groupId) values (?, ?, "active", ?)', [req.body.name, req.body.data, req.body.groupId], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })
  .patch((req, res) => {
    connection.query('update erp.SubInvoices s set s.subInvoiceStatus = "canceled" where s.subInvoicesId = ?', [req.body.subInvoicesId], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })

router.route('/getListItem')
  .get((req, res) => {
    // console.log(req.query.id);

    connection.query('select s.itemId, s.sellQuantity from erp.Invoices i, erp.SellItems s where invoiceId = ? and i.sellItemId = s.sellItemId', [req.query.id], (err, rows, fields) => {
      if (!err) {
        // console.log('--------------getListItem---------------');
        // console.log(rows);

        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })

// for pdf invoice page
router.route('/getItems')
  .get((req, res) => {
    // console.log(req.query.invoiceId);

    connection.query('select * from erp.SellItems s, erp.Invoices i where i.invoiceId = ? and i.sellItemId = s.sellItemId', [req.query.invoiceId], (err, rows, fields) => {
      if (!err) {
        // console.log(rows);
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })

router.route('/getRole')
  .get((req, res) => {
    connection.query('select p.role from erp.User u, erp.Permission p where u.email = ? and p.roleId = u.roleId', [req.query.email], (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })

module.exports = router;
