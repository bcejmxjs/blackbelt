'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Lesson = mongoose.model('Lesson'),
    _ = require('lodash');

/**
 * Create a Lesson
 */
exports.create = function(req, res) {
    var lesson = new Lesson(req.body);

    lesson.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(lesson);
        }
    });
};

/**
 * Show the current Lesson
 */
exports.read = function(req, res) {
    res.jsonp(req.lesson);
};

/**
 * Update a Lesson
 */
exports.update = function(req, res) {
    var lesson = req.lesson;

    lesson = _.extend(lesson, req.body);

    lesson.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(lesson);
        }
    });
};

/**
 * Delete an Lesson
 */
exports.delete = function(req, res) {
    var lesson = req.lesson;

    lesson.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(lesson);
        }
    });
};

/**
 * List of Lessons
 */
exports.list = function(req, res) {
    Lesson.find().sort({
        date: 1
    }).populate('user', 'displayName').exec(function(err, lessons) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(lessons);
        }
    });
};

exports.courseByID = function(req, res, next, id) {
    Lesson.find({
        courseId: id
    }).populate('user', 'displayName').exec(function(err, lesson) {
        if (err) return next(err);
        if (!lesson) return next(new Error('Failed to load Lesson ' + id));
        req.lesson = lesson;
        next();
    });
};

exports.lessonByID = function(req, res, next, id) {
    Lesson.findById(id).populate('user', 'displayName').exec(function(err, lesson) {
        if (err) return next(err);
        if (!lesson) return next(new Error('Failed to load Lesson ' + id));
        req.lesson = lesson;
        next();
    });
};