var express = require("express");
var app = express();
var connection = require("./db");
const router = express.Router();

router.route('/department')
  .get(function (req, res) {
    connection.query("select * from erp.Department, erp.Company", (err, rows, fields) => {
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
  .post(function (req, res) {
    var arr = [];
    var department = req.body.department;
    var value = "";
    var position = req.body.position;
    var p = JSON.parse(position);
    console.log(p);
    arr = p;
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 1) {
        value += arr[i].position;
      } else
        value += arr[i].position + ',';
      console.log(arr[i].position);
    }
    // console.log(position);
    // p.push(position);
    // }
    connection.query("insert into erp.Department (position, department) values (?,?)", [value, department], function (err, rows, fields) {
      // connection.end();
      // if (!err) {
      //     res.send(rows);
      //     console.log(rows);
      // } else {
      //     console.log(err);
      // }
    });
  })

  .patch(function (req, res) {
    var departmentId = req.body.departmentId;
    var arr = [];
    var department = req.body.department;
    var value = "";
    var position = req.body.position;
    var p = JSON.parse(position);
    console.log(p);
    arr = p;
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 1) {
        value += arr[i].position;
      } else
        value += arr[i].position + ',';
      console.log(arr[i].position);
    }
    // var position = req.body.position;
    // var department = req.body.department;

    connection.query("update erp.Department set position = ?, department = ? where departmentId = ?", [value, department, departmentId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/deletedepartment')
  .post(function (req, res) {
    console.log(req.body.cusId);
    var departmentId = req.body.departmentId;
    connection.query("delete from erp.Department where departmentId = ?", [departmentId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

module.exports = router;