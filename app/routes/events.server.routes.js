'use strict';

var events = require('../../app/controllers/events.server.controller');

module.exports = function(app) {
	// Routing logic   
	// ...
    app.route('/events')
	    .get(events.list);
};
