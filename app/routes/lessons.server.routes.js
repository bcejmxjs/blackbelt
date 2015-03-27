'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var courses = require('../../app/controllers/courses.server.controller');
    var lessons = require('../../app/controllers/lessons.server.controller');

    app.route('/course/:courseId')
        .get(users.requiresLogin, lessons.courseByID)
        .post(users.requiresLogin, users.hasAuthorization(['admin']), lessons.create);

    app.route('/course/:courseId/:lessonId')
        .get(lessons.read)
        .put(users.requiresLogin, users.hasAuthorization(['admin']), lessons.update)
        .delete(users.requiresLogin, users.hasAuthorization(['admin']), lessons.delete);

    // Finish by binding the course middleware
    app.param('courseId', lessons.courseByID);
    app.param('lessonId', lessons.lessonByID);
};