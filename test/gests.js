const assert = require('assert');
const should = require('should');
const mysql = require('mysql');

const initializeDB = require('../initializeDB');
const config = require('../config');
const queryPromise = require('../lib/queryPromise');
const connection = mysql.createConnection(config.db_test_connect);
const qp = queryPromise(connection);

const createPresent =   require('../services/controllers/createPresent');
const editPresent   =   require('../services/controllers/editPresent');
const removePresent =   require('../services/controllers/removePresent');
const getPresents   =   require('../services/controllers/getPresents');
const buyPresent    =   require('../services/controllers/buyPresent');
const getGifts      =   require('../services/controllers/getGifts');
const login         =   require('../services/login');
const registerGift  =   require('../services/controllers/registerGift');

describe('Como invitado quiero', function () {

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

  it('editar mi dedicatoria', function (done) {
    done('falta hacer')

  });

  it('conocer el estado de mi regalo', function (done) {
    done('falta hacer')
  });


});