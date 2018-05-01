const queryPromise = require('./lib/queryPromise.js');

function dml(qp) {
    const weddingList = `CREATE TABLE IF NOT EXISTS wedding (
        id INT AUTO_INCREMENT UNIQUE NOT NULL,
        name TEXT,
        PRIMARY KEY (id)
    )`;

    const brideAndGroom = `CREATE TABLE IF NOT EXISTS brideAndGroom (
          id INT AUTO_INCREMENT UNIQUE NOT NULL,
          name VARCHAR(10) UNIQUE NOT NULL, 
          password VARCHAR(100), 
          token VARCHAR(5),
          PRIMARY KEY (id)
      )`;


    const categories = `CREATE TABLE IF NOT EXISTS categories (
      name VARCHAR(50) UNIQUE NOT NULL,
      PRIMARY KEY (name)
    )`;


    const weddingXbirde = `CREATE TABLE IF NOT EXISTS weddingXbride (
        wedding_id INT,
        person_id INT,
        FOREIGN KEY (wedding_id) REFERENCES wedding(id),
        FOREIGN KEY (person_id) REFERENCES brideAndGroom(id),
        UNIQUE (wedding_id, person_id)
    )`


    const presents = `CREATE TABLE IF NOT EXISTS presents (
          id INT AUTO_INCREMENT UNIQUE NOT NULL,
          wedding_id INT,
          category VARCHAR(50),
          name VARCHAR(255), 
          description TEXT, 
          image VARCHAR(255), 
          price INT, 
          status TEXT,
          url TEXT,
          PRIMARY KEY (id),
          FOREIGN KEY (wedding_id) REFERENCES wedding(id),
          FOREIGN KEY (category) REFERENCES categories(name)
      )`;

    const gifts = `CREATE TABLE IF NOT EXISTS gifts (
          id INT AUTO_INCREMENT UNIQUE NOT NULL, 
          wedding_id INT,
          presentId INT, 
          message TEXT, 
          fromName VARCHAR(255), 
          transactionId TEXT,
          PRIMARY KEY (id),
          FOREIGN KEY (wedding_id) REFERENCES wedding(id),
          FOREIGN KEY (presentId) REFERENCES presents(id)
      )`;

    return Promise.all([qp(weddingList),qp(brideAndGroom), qp(categories)])
        .then(_ => Promise.all([qp(weddingXbirde),qp(presents)]))
        .then(_ => qp(gifts));
}

function ddl(qp) {
    const users = `INSERT IGNORE INTO brideAndGroom
      (id, name,password) VALUES 
      (0, "pablo", "000E02E40E441BE798211AAF86D037BACD3DEDBC8A6318CA5F9A5C72AD52FFBE"), 
      (1, "ana", "000E02E40E441BE798211AAF86D037BACD3DEDBC8A6318CA5F9A5C72AD52FFBE"),
      (2, "juancho", "000E02E40E441BE798211AAF86D037BACD3DEDBC8A6318CA5F9A5C72AD52FFBE")
    `; //anita

    const wedding = `INSERT IGNORE INTO wedding 
        (id, name) VALUES
        (0, "Boda Ana & Pablo"),
        (1, "Boda Pepe & Pepa")
    `;

    const weddingXusers = `INSERT IGNORE INTO weddingXbride
        (wedding_id,person_id) VALUES
        (0,0),
        (0,1),
        (1,2)
    `;

    const categories = `INSERT IGNORE INTO categories
        (name) VALUES
        ("Viajes"),
        ("Ropas"),
        ("Electrodomesticos")
        `

    const presents = `INSERT IGNORE INTO presents
        (id, wedding_id, category, name, description, image, price, status, url) VALUES
        (0, 0, "Viajes", "Avion para anita", "Viaje en avion para anita", 
            "https://images3.memedroid.com/images/UPLOADED37/581cbdf714c57.jpeg", 1300, "", 
            "https://images3.memedroid.com/images/UPLOADED37/581cbdf714c57.jpeg"),
        (1, 0, "Viajes", "Avion para pablito", "Viaje en avion para pablito", 
            "http://fotografias.lasexta.com/clipping/cmsimages02/2017/12/28/C9C10BE4-38BF-4C84-81F2-36E9F056470A/58.jpg", 2000, "", 
            "http://fotografias.lasexta.com/clipping/cmsimages02/2017/12/28/C9C10BE4-38BF-4C84-81F2-36E9F056470A/58.jpg"),
        (2, 0, "Ropas", "Perro para pantalon", "Dos modelos distintos!", 
            "http://cdn.smosh.com/sites/default/files/2016/01/dog-wore-pants-meme-reverse.jpg", 130, "", 
            "http://cdn.smosh.com/sites/default/files/2016/01/dog-wore-pants-meme-reverse.jpg")
    `;
    return Promise.all([
            qp(wedding).then(e => console.log("Wedding", e)),
            qp(users).then(e => console.log("Users", e)),
            qp(categories).then(e => console.log("Categories", e)
        ])
        .then(_ => qp(weddingXusers))
        .then(_ => qp(presents));
    ;

}

module.exports = function (connection) {
    const qp = queryPromise(connection);
    return dml(qp).then(ddl(qp)).then(e => console.log("fixture loaded!", e))
};
