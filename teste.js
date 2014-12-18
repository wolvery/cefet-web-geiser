 var fs=require('fs');
var _ = require('underscore');
function arquivoLido(callback) {
  var count = 0;
  var data = new Array();
  var handler = function(error, content){
    count++;
    if (error){
      console.log(error);
    }
    else{
      content = JSON.parse(content);
      data.push(content);
    }

    if (count == 2) {
      callback(data);
    }
  }

  fs.readFile('server/data/jogadores.json', handler);
  fs.readFile('server/data/jogosPorJogador.json', handler);
};

arquivoLido(function(data){

var jogosDesteJogador = _.find(data[1], function(el) {
  return el.key === '76561198036476656';
});

console.log(jogosDesteJogador);
});

