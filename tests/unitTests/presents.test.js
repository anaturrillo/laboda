const getAvailablePresents = require("../../services/getAvailablePresents");

describe('En la seccion lista de regalos', function() {
  it('muestra una leyenda cuando no hay regalos cargados', function(done) {
    done()
  });

  it('se genera el link de compra a partir de los regalos creados en la db', function(done) {
    const connection = {
      query: function(query, input,callback){
        const presents = [{
          id: 1,
          name: "banana",
          description: "fruta amarilla",
          image: "fñaksdnfas.png"
        },{},{}];
        callback(null, presents)
      }
    };


    const mp = {
      _spyCalls: [],
      _responses : [],
      createPreference: function(objPreference){
        this._spyCall.push(objPreference);
        const data = {
          response: {
            init_point: "http://nada.com/" + objPreference.items[0].title,
            id: objPreference.items[0].id + "-" + objPreference.items[0].title
          }
        };

        this._responses.push(data);
        return Promise.resolve(data)
      }
    };

    getAvailablePresents(connection, mp);

    done()
  });

});
