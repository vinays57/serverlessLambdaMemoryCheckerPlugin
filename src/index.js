'use strict';

class ServerlessPlugin {
    
    
  constructor(serverless, options) {
   this.serverless = serverless;

   this.options = options || {};
   this.provider = this.serverless.getProvider(this.serverless.service.provider.name) || "not-specified";
   this.stage = this.options.stage || this.serverless.service.provider.stage;

    this.commands = {
      lambdacheck: {
        lifecycleEvents: [
          'memory',
        ],
        options: {
          message: {},
        },
      },
    };
    
   this.hooks = {
       'lambdacheck:memory': function () { lambdacheck(serverless) },
       'before:deploy:deploy': function () { beforeDeploy(serverless) }
   };
  }
 
}

 
  function beforeDeploy(serverless){
    let f = serverless.service.provider.memorySize || 1024;
    let p = serverless.service.functions;
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
          console.log(key + " -> " + p[key]['memorySize']);
          let m = p[key]['memorySize'] || 0;
          if( m > 128 || ( m==0 && f > 128))
              throw `Memory allocation for lambda function ${key} exceed 128mb`;
      }
    }
    serverless.cli.log('Checks completed!');
  }
  
  function lambdacheck(serverless) {
    let f = serverless.service.provider.memorySize || 1024;
    let p = serverless.service.functions;
    for (var key in p) {
      if (p.hasOwnProperty(key)) {
          console.log(key + " -> " + p[key]['memorySize']);
          let m = p[key]['memorySize'] || 0;
          if( m > 128 || ( m==0 && f > 128))
              console.log(`Memory allocation for lambda function ${key} exceed 128mb`);
      }
    }
    serverless.cli.log('Checks completed!');
  }
module.exports = ServerlessPlugin;
