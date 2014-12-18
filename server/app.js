var express = require('express'),
    app = express();
var fs = require('fs');
var _ = require('underscore');



// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// dica: 3-4 linhas de código (você deve usar o módulo de filesystem (fs))
 
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
  console.log('data: '+JSON.stringify(data[0]));
  app.get('/',function(req,res){
   res.render('index',data[0]);
  });

  app.get('/jogador/:numero_identificador/',function(req,res){
    res.render('jogador',
      data[0],data[1]
    );
  })
});

// configurar qual templating engine usar. Sugestão: hbs (handlebars)
app.set('view engine', 'hbs');
app.set('views','server/views');

// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json

// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter umas 15 linhas de código


// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static('client/'));

// abrir servidor
// dica: 1-3 linhas de código
app.listen(3000);