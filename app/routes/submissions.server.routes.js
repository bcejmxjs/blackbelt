'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller'),
        submissions = require('../../app/controllers/submissions.server.controller');

    app.route('/submissions')
        .get(submissions.list)
        .post(users.requiresLogin, submissions.create);

    app.route('/submissions/:submissionId')
        .get(users.requiresLogin, submissions.read)
        .put(users.requiresLogin, users.hasAuthorization(['admin', 'instructor']), submissions.update)
        .delete(users.requiresLogin, users.hasAuthorization(['admin', 'instructor']), submissions.delete);

    app.param('submissionId', submissions.submissionByID);

};