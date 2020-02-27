// var express = require("express");
// var app = express();
// var connection = require("./db");
// const router = express.Router();

// router.route('/items')
//   .get(function (req,res){
//     connection.query("select * from erp.Items", (err, rows, fields) => {
//           // connection.end();
//           if (!err) {
//             res.send(rows)
//             console.log(rows);
//             return rows;
//           } else {
//             console.log(err);
//           }
//         });
//   })
//   .post(function (req,res){
//     var email = req.body.email;
//     var password = req.body.password;
//     var role = req.body.role;
//     var status = req.body.status;
//     connection.query("insert into erp.User (name, availableQuantity, price) values (?, ?, ?)",[name, availableQuantity, price], function (err, rows, fields) {
//           // connection.end();
//           if (!err) {
//             res.send(rows);
//             console.log(rows);
//           } else {
//             console.log(err);
//           }
//         });  
//   })