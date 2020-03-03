var express = require("express");
var app = express();
var connection = require("./db");
const router = express.Router();

router.route('/user')
  .get((req, res) => {
    connection.query("select * from erp.User", (err, rows, fields) => {
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
  .post(function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var status = req.body.status;
    connection.query("insert into erp.User (name, availableQuantity, price) values (?, ?, ?)", [name, availableQuantity, price], (err, rows, fields) => {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/role')
  .post((req, res) => {
    connection.query('select role from erp.Permission where role = ?', [req.body.roldId], (err, val) => {
      console.log(val);
      
      return val.role;
    })
  })


module.exports = router;
