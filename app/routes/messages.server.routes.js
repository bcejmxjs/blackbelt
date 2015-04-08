'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller'),
        messages = require('../../app/controllers/messages.server.controller');

    app.route('/messages')
        .post(users.requiresLogin, messages.create);

    app.route('/messages/list/:recipientId')
        .get(users.requiresLogin, messages.hasAuthorization, messages.readAll);

    app.route('/messages/:messageId')
        .delete(users.requiresLogin, messages.hasAuthorization, messages.delete);

    app.param('messageId', messages.messageByID);
    app.param('recipientId', messages.messagesByRecipientID);
};