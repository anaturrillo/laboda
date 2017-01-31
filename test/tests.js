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
  
  it('comprar un regalo', function (done) {
    done('falta hacer')
  });
  
  it('editar mi dedicatoria', function (done) {
    done('falta hacer')

  });
  
  it('conocer el estado de mi regalo', function (done) {
    done('falta hacer')
  });

  
});

describe('Como sistema quiero', function () {
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
  
  it('registrar un regalo comprado con éxito por un invitado', function (done) {
    done('falta hacer')

  })
});

describe('Como uno de los novios quiero', function () {

  beforeEach(function (done) {

    connection.query('DROP TABLE IF EXISTS brideAndGroom, availablePresents, giftsReceived',  function (err, result) {
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
      "name": "flor",
      "password": "16ece45ed0201c414ef8efd66af2dc51354cd964"
    };

    login(connection, post)
        .then(function (response) {
          response.status.should.be.equal("logged_in");
          response.token.length.should.be.equal(5);
          response.token.should.be.type("string");
          done()
        })
        .catch(function (e) {
          done(e)
        })
  });

  it('loggearme con mi usuario y password, soy el novio', function (done) {
    const post = {
      "name": "lenny",
      "password": "16ece45ed0201c414ef8efd66af2dc51354cd964"
    };

    login(connection, post)
        .then(function (response) {
          response.status.should.be.equal("logged_in");
          response.token.length.should.be.equal(5);
          response.token.should.be.type("string");
          done()
        })
        .catch(function (e) {
          done(e)
        })
  });

  it('loggearme con mi usuario y password, no se la contraseña!', function (done) {
    const post = {
      "name": "Pepe",
      "password": "h00n3yM00n"
    };

    login(connection, post)
        .then(function (response) {
          response.status.should.be.equal("not_authorized");
          done()
        })
        .catch(function (e) {
          done(e)
        })
  });

  it('loggearme con mi usuario y password, no se el usuario!', function (done) {
    const post = {
      "name": "Florencia",
      "password": "pepe"
    };

    login(connection, post)
        .then(function (response) {
          response.status.should.be.equal("not_authorized");
          done()
        })
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
      "price": 65,
      "ammount": 3
    };

    createPresent(connection, present1)
        .then(_ => createPresent(connection, present2))
        .then(_ => getPresents(connection))
        .then(function (presents) {
          const p1 = presents[0];
          const p2 = presents[1];

          p1.status.should.be.equal('available');
          p1.id.should.be.equal(1);
          //p1.date.should.be.type('date');
          p1.name.should.be.equal('Present name');
          p1.description.should.be.equal('Present description bla bla bla');
          p1.ammount.should.be.equal(2);
          p1.price.should.be.equal(50);

          p2.status.should.be.equal('available');
          p2.id.should.be.equal(2);
          //p2.date.should.be.type('date');
          p2.name.should.be.equal('2 Present name');
          p2.description.should.be.equal('2 Present description bla bla bla');
          p2.ammount.should.be.equal(3);
          p2.price.should.be.equal(65);
        })
        .then(_ => done())
        .catch(function (e) {
          done(e)
        });


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
          const p1 = presents[0];

          p1.status.should.be.equal('available');
          p1.id.should.be.equal(1);
          //p1.date.should.be.type('date');
          p1.name.should.be.equal('Present name');
          p1.description.should.be.equal('Present description bla bla bla');
          p1.ammount.should.be.equal(2);
          p1.price.should.be.equal(100);
        })
        .then( _ => done() )
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
      "price": 65,
      "ammount": 3
    };

    const post = {
      id: 1
    };

    createPresent(connection, present1)
        .then(_ => createPresent(connection, present2))
        .then(_ => removePresent(connection, post))
        .then(_ => getPresents(connection))
        .then(function (presents) {
          const p2 = presents[0];

          p2.status.should.be.equal('available');
          p2.id.should.be.equal(2);
          //p2.date.should.be.type('date');
          p2.name.should.be.equal('2 Present name');
          p2.description.should.be.equal('2 Present description bla bla bla');
          p2.ammount.should.be.equal(3);
          p2.price.should.be.equal(65);

        })
        .then(_ => done() )
        .catch(done)
  });
  
  it('ver los regalos que me hicieron, con el detalle de quién me lo regaló y la dedicatoria que me escribieron', function (done) {
    const present1 = {
      "name": "Present name",
      "description": "Present description bla bla bla",
      "price": 50,
      "ammount": 2
    };

    const present2 = {
      "name": "2 Present name",
      "description": "2 Present description bla bla bla",
      "price": 65,
      "ammount": 3
    };

    const boughtPresent = {
      id: 1
    };

    createPresent(connection, present1)
        .then(_ => createPresent(connection, present2))
        .then(_ => registerGift(connection, boughtPresent))
        .then(_ => getGifts(connection))
        .then(function (gifts) {
          const p2 = gifts[0];

          p2.status.should.be.equal('available');
          p2.id.should.be.equal(2);
          //p2.date.should.be.type('date');
          p2.name.should.be.equal('2 Present name');
          p2.description.should.be.equal('2 Present description bla bla bla');
          p2.ammount.should.be.equal(3);
          p2.price.should.be.equal(65);

        })
        .then(_ => done() )
        .catch(done)
  });
  
  it('descargar un documento con la información de los regalos que me hicieron', function (done) {
    done('falta hacer')

  })
});