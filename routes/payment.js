const express = require('express');
const MP = require("mercadopago");
const c = require('../config');
const updateStatus = require('../services/updateStatus');

module.exports = function (connection) {
  const router = express.Router();

  router.get('/success', function (req, res) {
    res.redirect('/')
  });

  router.get('/failure', function (req, res) {
    res.redirect('/')
  });

  router.get('/pending', function (req, res) {
    res.redirect('/')
  });
  
  router.post('/statusUpdate', function (req, res) {
    const updateData = {
      itemId: req.body.id,
      status: req.body.status
    };
    updateStatus(connection, updateData)
    .then(function () {

      res.json({newStatus: 'selected'})
    })
    .catch(function (err) {
      console.error('falló update del regalo', err)
    });
  });

  router.post('/notification', function (req, res) {
    const mp = new MP(c.keys.Client_id, c.keys.Client_secret);

    res.status(200);
    res.send('ok');

    mp.get("/collections/notifications/" + req.query.id)
        .then(function (payment_info) {
          return mp.get ("/merchant_orders/" + payment_info.response.collection.merchant_order_id)
        })
        .then(function (mo) {
          console.log('devuelve la merchant_order');
          const status = mo.response.payments[0].status == 'rejected' ? 'disponible' : mo.response.payments[0].status;
          const updateData = {
            itemId: mo.response.items[0].id,
            status: mo.response.payments[0].status
          };

          return updateStatus(connection, updateData)
        })
        .catch(function (err) {
          console.error('falló update del regalo', err)
        });
  });

  return router
};