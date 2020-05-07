var express = require('express');
var connection = require('./db');

const router = express.Router();

router.route('/po')
  .get(function (req, res) {
    connection.query("select * from erp.PO", (err, rows, fields) => {
      // connection.end();
      if (!err) {
        res.send(rows)
        console.log(rows);
        return rows;
      } else {
        console.log(err);
      }
    });
  })

router.route('/createpo')
.post(function (req, res) {
  // console.log(req.body);
  connection.query("insert into erp.PO (PRId, SId, PRName, createdDate, status) values(?,?,?,?,?)", [req.body.PRid, req.body.SId, req.body.prName, new Date().getDate(), req.body.status], function (err, val, fields) {
    // POid = val.insertId;
    console.log(val);
    
    // connection.query('update erp.PR set POid = ?, ApprovedDate = ? where PRid = ?', [POid, new Date.getDate(), req.body.PRid], (err2, val2, fields2) => {
    if (!err) {
      res.send(val);
      console.log(val);
    } else {
      console.log(err);
    }
  // });
  });
})

router.route('/updatestatuspo')
  .patch(function (req, res) {
    connection.query("update erp.PO set Status = ? where POid = ?", [req.body.status, req.body.PRid], (err, rows, fields) => {
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