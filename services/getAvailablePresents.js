const queryPromise = require('../lib/queryPromise');
const MP = require("mercadopago");
const c = require("../config");

module.exports = function (connection) {
  const mp = new MP(c.keys.Client_id, c.keys.Client_secret);

  const qp = queryPromise(connection);

  return qp('SELECT name, description, image, price, url FROM presents WHERE status="disponible"')
      .then(function (presents) {
        if (presents.length >= 1) {
          const mpPresents = Promise.all(presents.map(function (present) {
            const preference = {
              "items": [
                {
                  "title": present.name,
                  "quantity": 1,
                  "currency_id": "ARS", // Available currencies at: https://api.mercadopago.com/currencies
                  "unit_price": present.price,
                  "description": present.description
                }
              ],
              "back_urls": {
                "success": "/success",
                "failure": "",
                "pending": ""
              }
            };

            return mp.createPreference(preference)
                .then(function (data) {
                  present.url = data.response.init_point;
                  return present
                }, function (err) {
                  console.error(err)
                })
          }));

          return {
            status: 'ok',
            response: mpPresents
          }
        }
        return notOk;
      })

};

const notOk = {
  status: 'not_ok',
  response: 'no hay regalos disponibles'
};