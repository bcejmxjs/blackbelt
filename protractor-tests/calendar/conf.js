// An example configuration file.
exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: [
    //'user_signin.spec.js',
    //'user.spec.js',
    //'signout.spec.js',
    'instructor_signin.spec.js',
    'instructor.spec.js',
    'signout.spec.js',
    'admin_signin.spec.js',
    'admin.spec.js',
    'signout.spec.js'
  ],
  baseUrl: 'http://localhost:3000',

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter
    jasmine.getEnv().addReporter(new
    SpecReporter({displayFailuresSummary: false}));
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};