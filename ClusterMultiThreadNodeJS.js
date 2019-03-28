var cluster = require('cluster');
//importar o module de multi-thread

var os = require('os');
//import o modulo com as funcoes do sistema operacional

var cpus = os.cpus();
//converter para uma variavel as informacoes sobre a CPU

if(cluster.isMaster == true){
  console.log('thread master');
  console.log(cpus);
  //imprimi os detalhes de todas CPU

  cpus.forEach(function(){
      cluster.fork();
  });
  //usar a quantidade total de CPU's disponiveis

  cluster.on('listening', function(worker){
    console.log('connected cluster ' + worker.process.pid );
  });
  //quando uma nova thread se conectar,mostre um mensagem de sucesso

  cluster.on('exit', worker => {
    console.log('desconnected cluster', worker.process.pid);
    cluster.fork();
  })
  //quando uma nova thread se desconectar,mostre um mensagem de falha
  //e recrie novamente essa thread

} else {
  console.log('thread slave');
  require('./mainApplication.js')
  //nome do programa que quero que seja multi-threaded
}
