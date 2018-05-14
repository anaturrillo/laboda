const queryPromise = require('../lib/queryPromise');
const MP = require("mercadopago");
const c = require("../config");
const dom = 'http://f523cad9.ngrok.io' //'http://casorio.com.ar';

module.exports = connection => function (weddingId) {


  const qp = queryPromise(connection);

  return qp('SELECT MP_clientId, MP_clientSecret FROM wedding WHERE id=?', weddingId)
    .then(function (MPdata) {

      const mp = new MP(MPdata[0].MP_clientId, MPdata[0].MP_clientSecret);
      const backUrl = `${dom}/boda/${weddingId}/gracias`;

      return qp('SELECT id, name, description, image, price, url FROM presents WHERE wedding_id=? AND deleted =\'N\' ORDER BY price', weddingId)
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
                  "picture_url": `${dom}/uploads/images/${present.image}`
                }
              ],
              "auto_return": 'approved',
              "back_urls": {
                "success": backUrl,
                "pending": backUrl
              },
              "notification_url": `${dom}/payment/notification?weddingId=${weddingId}`
            };

            return mp.createPreference(preference)
              .then(function (data) {
                present.url = data.response.init_point;
                present.transaction_id = data.response.id;
                return present
              }, function (err) {
                console.error(err);
                throw new Error(err)
              })
          }));
        })
    });
};