'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var courses = require('../../app/controllers/courses.server.controller');

	app.route('/courses')
		.get(courses.list)
		.post(users.requiresLogin, courses.create);

	app.route('/courses/:courseId')
		.get(courses.read)
		.put(users.requiresLogin, users.hasAuthorization(['admin']), courses.update)
		.delete(users.requiresLogin, users.hasAuthorization(['admin']), courses.delete);

		// Finish by binding the course middleware
	app.param('courseId', courses.courseByID);
};