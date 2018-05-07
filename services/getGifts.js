const queryPromise = require('../lib/queryPromise');

module.exports = connection => function (weddingId) {

const qp = queryPromise(connection);

return qp('SELECT presents.name, presents.category, gifts.fromName, gifts.message, gifts.wedding_id, gifts.payment_status ' +
    'FROM gifts ' +
    'INNER JOIN presents ' +
    'ON gifts.present_id=presents.id ' +
    'WHERE gifts.wedding_id=? ', weddingId)
};