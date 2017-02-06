const queryPromise = require('../lib/queryPromise');
const MP = require("mercadopago");
const c = require("../config");

module.exports = function (connection) {
  const mp = new MP(c.keys.Client_id, c.keys.Client_secret);

  const qp = queryPromise(connection);

  return qp('SELECT id, name, description, image, price, url FROM presents WHERE status="disponible"')
      .then(function (presents) {
          return Promise.all(presents.map(function (present) {
            const preference = {
              "items": [
                {
                  "id": present.id,
                  "title": present.name,
                  "quantity": 1,
                  "currency_id": "ARS", // Available currencies at: https://api.mercadopago.com/currencies
                  "unit_price": present.price,
                  "description": present.description,
                  "picture_url": 'http://e5421a6c.ngrok.io/images' + present.image
                }
              ],
              "back_urls": {
                "success": "http://e5421a6c.ngrok.io/payment/success",
                "failure": "http://e5421a6c.ngrok.io/payment/failure",
                "pending": "http://e5421a6c.ngrok.io/payment/pending"
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
      })
};