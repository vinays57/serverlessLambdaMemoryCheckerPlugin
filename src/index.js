'use strict';

class ServerlessPlugin {
    
    
  constructor(serverless, options) {
   this.serverless = serverless;
   this.mimeTypes = this.serverless.service.custom.apigwBinary.types;
   this.options = options || {};
   this.provider = this.serverless.getProvider(this.serverless.service.provider.name);
   this.stage = this.options.stage || this.serverless.service.provider.stage;

    this.commands = {
      welcome: {
        lifecycleEvents: [
          'hello',
          'world',
        ],
        options: {
          message: {},
        },
      },
    };
    
   this.hooks = {
       'before:welcome:hello': this.beforeWelcome.bind(this),
      'welcome:hello': this.welcomeUser.bind(this),
      'welcome:world': this.displayHelloMessage.bind(this),
      'after:welcome:world': this.afterHelloWorld.bind(this),
       'before:deploy:deploy': this.afterDeploy.bind(this)
   };
   
   afterDeploy() {
    this.serverless.cli.log(this.stage);
  }
  
  beforeWelcome() {
    this.serverless.cli.log('Hello from Serverless!');
  }

  welcomeUser() {
    this.serverless.cli.log('Your message:');
  }

  displayHelloMessage() {
    this.serverless.cli.log("msg");
  }

  afterHelloWorld() {
    this.serverless.cli.log('Please come again!');
  }
}
}

module.exports = ServerlessPlugin;
