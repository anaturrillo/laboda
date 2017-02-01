const queryPromise = require('../../lib/queryPromise');
const MP = require ("mercadopago");
const c = require("../../config");

module.exports = function (connection) {
  const mp = new MP (c.keys.Client_id, c.keys.Client_secret);

  const qp = queryPromise(connection);

  return qp('SELECT * FROM availablePresents')
      .then(function (presents) {
        return Promise.all(presents.map(function (present) {
          const preference = {
            "items": [
              {
                "title": present.name,
                "quantity": 1,
                "currency_id": "ARS", // Available currencies at: https://api.mercadopago.com/currencies
                "unit_price": present.price,
                "description": present.description
              }
            ]
          };

          return mp.createPreference(preference)
              .then(function (data) {
                present.url = data.response.init_point;
                return present
              }, function (err) {
                console.error(err)
              })
        }))
      })

};