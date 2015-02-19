'use strict';

var events = require('../../app/controllers/event.server.controller');

module.exports = function(app) {
	// Routing logic   
	// ...
    app.route('/events')
	    .get(events.list);
};
