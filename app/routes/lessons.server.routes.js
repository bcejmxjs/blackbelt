'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var courses = require('../../app/controllers/courses.server.controller');
    var lessons = require('../../app/controllers/lessons.server.controller');

    app.route('/courses/:parentCourseId/lessons')
        .get(users.requiresLogin, lessons.read)
        .post(users.requiresLogin, users.hasAuthorization(['admin']), lessons.create);

    app.route('/lessons')
        .get(lessons.list);

    app.route('/lessons/:lessonId')
        .get(lessons.read)
        .put(users.requiresLogin, users.hasAuthorization(['admin']), lessons.update)
        .delete(users.requiresLogin, users.hasAuthorization(['admin']), lessons.delete);

    app.route('/videos/:filepath')
        .get(users.requiresLogin, lessons.play);

    // Finish by binding the course middleware
    app.param('parentCourseId', lessons.courseByID);
    app.param('lessonId', lessons.lessonByID);
    app.param('filepath', lessons.play);
};