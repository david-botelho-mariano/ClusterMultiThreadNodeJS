var cluster = require('cluster');
//import the multi-thread module

var os = require('os');
//import the module with the OS avaliable functions

var cpus = os.cpus();
//convert to a variable the information about the CPU


if(cluster.isMaster){
  console.log('thread master');
  console.log(cpus);

  cpus.forEach(function(){
      cluster.fork();
  });
  //use all avaliable CPU(forking the same amount of CPUS)

  cluster.on('listening', function(worker){
    console.log('connected cluster ' + worker.process.pid );
  });
  //when the cluster connects,show sucess message

  cluster.on('exit', worker => {
    console.log('desconnected cluster', worker.process.pid);
    cluster.fork();
  })
  //reconnect the thread when it dies

} else {
  console.log('thread slave');
  require('./mainApplication.js')
  //change the file name with the one that you want to multi-thread
}
