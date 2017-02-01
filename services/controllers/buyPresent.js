const MP = require ("mercadopago");
const c = require("../../config");

module.exports = function () {
  const mp = new MP (c.keys.Client_id, c.keys.Client_secret);

  const preference = {
    "items": [
      {
        "title": "Multicolor kite",
        "quantity": 1,
        "currency_id": "ARS", // Available currencies at: https://api.mercadopago.com/currencies
        "unit_price": 10.0,
        "otro_campo":'pepe'
      }
    ]
  };
  /*mp.getPreference ("31679429-3f3561d9-ca24-4be6-8589-0d19c10874a1").then(function (a) {
    console.log(a)

  });
  mp.createPreference (preference, function (err, data){
    if (err) {
      res.send (err);
    } else {
      res.render ("button", {"preference": data});
    }
  });*/
};

//31679429-3f3561d9-ca24-4be6-8589-0d19c10874a1