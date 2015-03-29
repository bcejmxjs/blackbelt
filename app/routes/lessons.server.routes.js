'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users.server.controller');
    var courses = require('../../app/controllers/courses.server.controller');
    var lessons = require('../../app/controllers/lessons.server.controller');

    app.route('/course/:parent_courseId')
        .get(users.requiresLogin, lessons.courseByID)
        .post(users.requiresLogin, users.hasAuthorization(['admin']), lessons.create);

    app.route('/course/:parent_courseId/:lessonId')
        .get(lessons.read)
        .put(users.requiresLogin, users.hasAuthorization(['admin']), lessons.update)
        .delete(users.requiresLogin, users.hasAuthorization(['admin']), lessons.delete);

    app.route('/video/:filepath')
        .get(users.requiresLogin, lessons.play);

    // Finish by binding the course middleware
    app.param('parent_courseId', lessons.courseByID);
    app.param('lessonId', lessons.lessonByID);
    app.param('filepath', lessons.play);
};