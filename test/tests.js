const assert = require('assert');
const should = require('should');
const mysql = require('mysql');

const initializeDB = require('../initializeDB');
const config = require('../config');
const queryPromise = require('../lib/queryPromise');
const connection = mysql.createConnection(config.db_test_connect);
const qp = queryPromise(connection);

const createPresent =   require('../services/controllers/createPresent.js');
const editPresent =     require('../services/controllers/editPresent.js');
const removePresents =  require('../services/controllers/removePresent.js');
const getPresents =     require('../services/controllers/getPresents.js');

describe('Con los regalos puedo', function () {

  beforeEach(function (done) {

    connection.query('DROP TABLE IF EXISTS availablePresents',  function (err, result) {
      if(err){
        console.error(err);
        done(err)
      }else{
        initializeDB(connection)
            .then(function () {
              done()
            })
            .catch(done)
      }
    });
  });

  it('ver los regalos cargados', function (done) {

    getPresents(connection)
        .then(function (presentList) {
          presentList.should.be.instanceof(Array);
          presentList.length.should.be.equal(0);
        })
        .then(done)
        .catch(function (e) {
          done(e)
        })
  });

  it('crear un regalo', function (done) {
    const present1 = {
      "name": "Present name",
      "description": "Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };

    const present2 = {
      "name": "2 Present name",
      "description": "2 Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };



    createPresent(connection, present1)
        .then(_ => createPresent(connection, present2))
        .then(_ => getPresents(connection))
        .then(function (presents) {
          const expected = [
            Object.assign(present1, {
              status: 'available',
              id: 1,
              date: presents[0].date
            }),
            Object.assign(present2, {
              status: 'available',
              id: 2,
              date: presents[1].date
            })
          ];
          presents
              .map(e => Object.assign({}, e))
              .should.be.eql(expected);
        })
        .then(done)
        .catch(function (e) {
          done(e)
        })
  });
  
  it('editar un regalo', function (done) {
    const present1 = {
      "name": "Present name",
      "description": "Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };

    const modification = {
      "id": 1,
      "name": "Present name",
      "description": "Present description bla bla bla",
      "price": 100,
      "ammount": 2,
      "status": 'available'
    };

    createPresent(connection, present1)
        .then(_ => editPresent(connection, modification))
        .then(_ => getPresents(connection))
        .then(function (presents) {
          const expected = [
            Object.assign(modification, {
              date: presents[0].date
            })
          ];

          presents
              .map(e => Object.assign({}, e))
              .should.be.eql(expected);
        })
        .then(done)
        .catch(done)
  });

  it('borrar un regalo', function (done) {
    const present1 = {
      "name": "Present name",
      "description": "Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };

    const present2 = {
      "name": "2 Present name",
      "description": "2 Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };



    createPresent(connection, present1)
        .then(_ => createPresent(connection, present2))
        .then(_ => removePresent(connection, 1))
        .then(_ => getPresents(connection))
        .then(function (presents) {
          const expected = [
            Object.assign(present1, {
              status: 'available',
              date: presents[0].date,
              id: 2
            })
          ];

          presents
              .map(e => Object.assign({}, e))
              .should.be.eql(expected);
        })
        .then(done)
        .catch(done)
  });
});