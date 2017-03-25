const queryPromise = require('../lib/queryPromise');

module.exports = function (connection) {

const qp = queryPromise(connection);

return qp('SELECT presents.name, presents.category, gifts.fromName, gifts.message ' +
    'FROM gifts ' +
    'INNER JOIN presents ' +
    'ON gifts.presentId=presents.id')
};