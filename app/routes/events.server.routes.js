'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller'),
        events = require('../../app/controllers/events.server.controller');

    // Routing logic   
    // ...
    app.route('/events')
        .get(events.list)
        .post(users.requiresLogin, users.hasAuthorization(['admin', 'instructor']), events.create);

    app.route('/events/:eventId')
        .get(events.read)
        .put(users.requiresLogin, users.hasAuthorization(['admin']), events.update)
        .delete(users.requiresLogin, users.hasAuthorization(['admin', 'instructor']), events.delete);

    app.param('eventId', events.eventByID);
};