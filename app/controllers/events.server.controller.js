'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Event = mongoose.model('Event'),
    _ = require('lodash');

/**
 * Create a Event
 */
exports.create = function(req, res) {
    var event = new Event(req.body);

    event.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Show the current Event
 */
exports.read = function(req, res) {
    res.jsonp(req.event);
};

/**
 * Update a Event
 */
exports.update = function(req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * Delete an Event
 */
exports.delete = function(req, res) {
    event.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(event);
        }
    });
};

/**
 * List of Events
 */
exports.list = function(req, res) {
    Event.find().sort({
        date: 1
    }).populate('user', 'displayName').exec(function(err, events) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(events);
        }
    });
};

exports.eventByID = function(req, res, next, id) {
    Event.findById(id).populate('user', 'displayName').exec(function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load Event ' + id));
        req.event = event;
        next();
    });
};

// Checks if user is admin or instructor
exports.hasAuthorizationInstructor = function(req, res, next) {
    if (req.user.role.indexOf('admin') > -1 ||
        req.user.role.indexOf('instructor') > -1) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};