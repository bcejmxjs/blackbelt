'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var lessons = require('../../app/controllers/lessons.server.controller');

    app.route('/courses/lessons/:parentCourseId')
        .get(users.requiresLogin, lessons.hasAuthorization, lessons.readAll);

    app.route('/lessons')
        .get(users.requiresLogin, lessons.list)
        .post(users.requiresLogin, users.hasAuthorization(['admin']), lessons.create);

    app.route('/lessons/:lessonId')
        .get(users.requiresLogin, lessons.hasAuthorization, lessons.read)
        .put(users.requiresLogin, users.hasAuthorization(['admin']), lessons.update)
        .delete(users.requiresLogin, users.hasAuthorization(['admin']), lessons.delete);

    app.route('/videos/upload')
        .put();

    app.route('/videos/:filepath')
        .get(users.requiresLogin, lessons.play);

    // Finish by binding the course middleware
    app.param('parentCourseId', lessons.courseByID);
    app.param('lessonId', lessons.lessonByID);
    app.param('filepath', lessons.play);
};