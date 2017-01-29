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
const removePresent =   require('../services/controllers/removePresent.js');
const getPresents =     require('../services/controllers/getPresents.js');

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
  
  it('hacer un regalo escribiendo una dedicatoria', function (done) {
    
  });
  
  it('editar mi dedicatoria', function (done) {
    
  });
  
  it('conocer el estado de mi regalo', function (done) {
    
  });

  
});

describe('Como uno de los novios quiero', function () {

  beforeEach(function (done) {

    connection.query('DROP TABLE IF EXISTS brideAndGroom',  function (err, result) {
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

  it('loggearme con mi usuario y password, soy la novia', function (done) {
    const post = {
      "name": "Florencia",
      "password": "h00n3yM00n"
    };

    const expected = {
      "status": "logged_in",
      "token": "random string"
    };

    login(connection, weddingUser)
        .then(function (response) {
          response.should.be.eql(expected)
        })
  });

  it('loggearme con mi usuario y password, soy el novio', function (done) {
    const post = {
      "name": "Leandro",
      "password": "h00n3yM00n"
    };

    const expected = {
      "status": "logged_in",
      "token": "random string"
    };

    login(connection, weddingUser)
        .then(function (response) {
          response.should.be.eql(expected)
        })
  });

  it('loggearme con mi usuario y password, no se la contraseña!', function (done) {
    const post = {
      "name": "Pepe",
      "password": "h00n3yM00n"
    };

    const expected = {
      "status": "no autorizado"
    };

    login(connection, weddingUser)
        .then(function (response) {
          response.should.be.eql(expected)
        })
  });

  it('loggearme con mi usuario y password, no se el usuario!', function (done) {
    const post = {
      "name": "Florencia",
      "password": "pepe"
    };

    const expected = {
      "status": "no autorizado"
    };

    login(connection, weddingUser)
        .then(function (response) {
          response.should.be.eql(expected)
        })
  });

  it('crear un regalo', function (done) {
    const present1 = {
      "token": "aaaa",
      "name": "Present name",
      "description": "Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };

    const present2 = {
      "token": "aaaa",
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
      "token": "aaaa",
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
            Object.assign({
              date: presents[0].date
            }, modification)
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
      "token": "aaaa",
      "name": "Present name",
      "description": "Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };

    const present2 = {
      "token": "aaaa",
      "name": "2 Present name",
      "description": "2 Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };

    const post = {
      "token": "aaaa",
      "id": 1
    };

    createPresent(connection, present1)
        .then(_ => createPresent(connection, present2))
        .then(_ => removePresent(connection, post))
        .then(_ => getPresents(connection))
        .then(function (presents) {
          const expected = [
            Object.assign(present2, {
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
  
  it('ver los regalos que me hicieron, con el detalle de quién me lo regaló y la dedicatoria que me escribieron', function (done) {
    
  });
  
  it('descargar un documento con la información de los regalos que me hicieron', function (done) {
    
  })
});