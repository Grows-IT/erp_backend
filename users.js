var express = require("express");
var app = express();
var connection = require("./db");
var passwordHash = require('password-hash');
const router = express.Router();

router.route('/user')
  .get((req, res) => {
    connection.query("select * from erp.User, erp.Permission where User.roleId = Permission.roleId", (err, rows, fields) => {
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
    var name = req.body.name;
    var email = req.body.email;
    var role = req.body.role;
    var password = passwordHash.generate(req.body.password);
    var status = req.body.status;
    connection.query('select erp.Permission.roleId from erp.Permission where role = ?', [role], (err, val, fields) => {
      console.log(val);
      
    roleId = val[0];
        connection.query('insert into erp.User (companyId,name,email,roleId,userStatus,departmentId,password) values (1, ?, ?, ?, ?, 1, ?)',
          [name, email, roleId.roleId, status, password]);
      })
   
  })

router.route('/role')
  .post((req, res) => {
    connection.query('select role from erp.Permission where role = ?', [req.body.roldId], (err, val) => {
      console.log(val);
      
      return val.role;
    })
  })


module.exports = router;
