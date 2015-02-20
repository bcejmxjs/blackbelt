'use strict';

var users = require('../../app/controllers/users.server.controller'),
    events = require('../../app/controllers/events.server.controller');

module.exports = function(app) {
    // Routing logic   
    // ...
    app.route('/events')
        .get(events.list)
        .post(users.requiresLogin, events.create);
};