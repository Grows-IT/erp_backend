var express = require("express");
var app = express();
var connection = require("./db");
const router = express.Router();

router.route('/items')
  .get(function (req, res) {
    connection.query("select * from erp.Items", (err, rows, fields) => {
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
    var name = req.body.name;
    var price = req.body.price;
    var availableQuantity = req.body.availableQuantity;
    var type = req.body.type;
    connection.query("insert into erp.Items (itemName, availableQuantity, price, itemType) values (?, ?, ?, ?)", [name, availableQuantity, price, type], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  .patch(function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var availableQuantity = req.body.availableQuantity;
    var itemId = req.body.itemId;
    var type = req.body.type;
    console.log(req.body);

    connection.query("update erp.Items set itemName = ?, availableQuantity = ?, price = ?, itemType = ? where itemId = ?", [name, availableQuantity, price, type, itemId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/deleteitem')
  .post(function (req, res) {
    var itemId = req.body.itemId;
    connection.query("delete from erp.Items where itemId = ?", [itemId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
router.route('/sellItem')
  .get(function (req, res) {
    var itemId = req.body.itemId;
    connection.query("select * from erp.SellItems", function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

router.route('/flower')
  .get(function (req, res) {
    var itemId = req.body.itemId;
    connection.query("select * from erp.Items where Items.itemType = 'Flower'", function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  .post(function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var availableQuantity = req.body.availableQuantity;
    connection.query("insert into erp.Items (itemName, availableQuantity, price, itemType) values (?, ?, ?,'Flower')", [name, availableQuantity, price], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })
  .patch(function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var availableQuantity = req.body.availableQuantity;
    var itemId = req.body.itemId;
    var type = req.body.type;
    console.log(req.body);

    connection.query("update erp.Items set itemName = ?, availableQuantity = ?, price = ?, itemType = ? where itemId = ?", [name, availableQuantity, price, type, itemId], function (err, rows, fields) {
      // connection.end();
      if (!err) {
        res.send(rows);
        // console.log(rows);
      } else {
        console.log(err);
      }
    });
  })

module.exports = router;
