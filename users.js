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
      connection.query("select erp.Department.department from erp.Department where User.departmentId = Department.departmentId", (err, val, fields) => {
      });

    });
  })
  .post(function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var role = req.body.role;
    var password = passwordHash.generate(req.body.password);
    var status = req.body.status;
    var company = req.body.company;
    var department = req.body.department;
    var position = req.body.position;
    connection.query('select erp.Permission.roleId from erp.Permission where role = ?', [role], (err, val, fields) => {
      roleId = val[0];

      connection.query('select erp.Company.companyId from erp.Company where companyName = ?', [company], (err, val1, fields) => {
        console.log(val1);

        comId = val1[0];

        connection.query('select erp.Department.departmentId from erp.Department where department = ?', [department], (err, val2, fields) => {
          console.log(val2);
          deId = val2[0];

          connection.query('insert into erp.User (companyId,name,email,roleId,userStatus,departmentId,password,position) values (?, ?, ?, ?, ?, ?, ?,?)',
            [comId.companyId, name, email, roleId.roleId, status, deId.departmentId, password, position]);
        })
      })
    })
  })
  .patch(function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var role = req.body.role;
    var status = req.body.status;
    var id = req.body.userId;
    var department = req.body.department;
    var position = req.body.position;
    connection.query('select erp.Permission.roleId from erp.Permission where role = ?', [role], (err, val, fields) => {
      console.log(val);
      roleId = val[0];

      connection.query('select erp.Department.departmentId from erp.Department where department = ?', [department], (err, val1, fields) => {
        console.log(val1);
        deId = val1[0];

        connection.query('update erp.User set roleId = ?, userStatus = ?, name = ?,email = ?,departmentId = ?, position = ? where User.userId = ?',
          [roleId.roleId, status, name, email, deId.departmentId, position, id]);
      })
    })
  })
router.route('/deleteuser')
  .post(function (req, res) {
    console.log(req.body.cusId);
    var userId = req.body.userId;
    connection.query("delete from erp.User where userId = ?", [userId], function (err, rows, fields) {
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
