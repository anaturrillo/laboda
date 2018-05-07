const express = require('express');
const MP = require("mercadopago");
const c = require('../config');
const queryPromise = require('../lib/queryPromise');
const updateStatus = require('../services/updateStatus');

module.exports = function (connection) {
  const router = express.Router();
  const qp = queryPromise(connection);

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
    res.status(200);
    res.send('ok');
    const weddingId = req.query.weddingId;
    return qp('SELECT MP_clientId, MP_clientSecret FROM wedding WHERE id=?', weddingId)
      .then(function (MPdata) {
        const mp = new MP(MPdata[0].MP_clientId, MPdata[0].MP_clientSecret);
        if (!req.query.id) return;

        if (req.body.topic === 'merchant_order') {
          return mp.get (`/merchant_orders/${req.query.id}`)
        } else {
          return mp.get(`/v1/payments/${req.query.id}`)
            .then(function (paymentInfo) {
              return mp.get(`/merchant_orders/${paymentInfo.response.order.id}`)
            })
        }
      })
      .then(function (mo) {
        if (!mo || mo.response.payments.length === 0) return;
        const updateData = {
          transactionId: mo.response.preference_id,
          status: statusConverter[mo.response.payments[0].status]
        };

        return updateStatus(connection, updateData)
      })
      .catch(function (err) {
        console.error('falló update del regalo', err)
      });


  });

  return router
};

const statusConverter = {
  pending: 'pendiente',
  approved: 'aprobado',
  in_process: 'en proceso',
  in_mediation: 'mediacion',
  rejected: 'rechazado',
  cancelled: 'cancelado',
  refunded: 'devuelto',
  charged_back: 'recargado'

};