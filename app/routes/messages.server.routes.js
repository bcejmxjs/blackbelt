'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller'),
        messages = require('../../app/controllers/messages.server.controller');

    app.route('/messages')
        .get(messages.list)
        .post(users.requiresLogin, messages.create);

    app.route('/messages/:messageId')
        .delete(users.requiresLogin, users.hasAuthorization(['admin', 'instructor']), messages.delete);

    app.param('messageId', messages.messageByID);
};