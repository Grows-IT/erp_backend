var express = require('express');
var passwordHash = require('password-hash');
var connection = require('./db');

const router = express.Router();

router.route('/login')
  .post((req, res) => {
    connection.query('select * from erp.User, erp.Permission where erp.User.email = "' + req.body.email + '" and User.roleId = Permission.roleId limit 1', (err, rows, fields) => {
      // const p = passwordHash.generate(req.body.password);

      if (rows === null || rows === undefined || rows.length === 0) {
        res.send('email or password is not currect!!');
        return console.log(err);
      } else if (passwordHash.verify(req.body.password, rows[0].password)) {
        res.send(rows[0]);
        // res.status(200);
        // console.log(rows);
        return console.log('login success!!')
      } else {
        res.send('email or password is not currect!!');
      }
    })
  })

// router.route('/signup')
//   .post((req, res) => {
//     connection.query('insert into User(name) erp.Permission where erp.User.email = "' + req.body.email + '" and User.roleId = Permission.roleId limit 1', (err, rows, fields) => {

//     })
//   })

module.exports = router;