'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Course = mongoose.model('Course'),
    _ = require('lodash');

/**
 * Create a Course
 */
exports.create = function(req, res) {
    var course = new Course(req.body);

    course.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(course);
        }
    });
};

/**
 * Show the current Course
 */
exports.read = function(req, res) {
    res.jsonp(req.course);
};

/**
 * Update a Course
 */
exports.update = function(req, res) {
    var course = req.course;

    course = _.extend(course, req.body);

    course.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(course);
        }
    });
};

/**
 * Delete an Course
 */
exports.delete = function(req, res) {
    var course = req.course;

    course.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(course);
        }
    });
};

/**
 * List of Courses
 */
exports.list = function(req, res) {
    Course.find().sort({
        date: 1
    }).populate('user', 'displayName').exec(function(err, courses) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(courses);
        }
    });
};

exports.courseByID = function(req, res, next, id) {
    Course.findById(id).populate('user', 'displayName').exec(function(err, course) {
        if (err) return next(err);
        if (!course) return next(new Error('Failed to load Course ' + id));
        req.course = course;
        next();
    });
};