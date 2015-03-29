'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Lesson = mongoose.model('Lesson'),
    _ = require('lodash'),
    ffmpeg = require('fluent-ffmpeg'),
    fs = require('fs');

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

exports.lessonByID = function(req, res, next, id) {
    Lesson.findById(id).populate('user', 'displayName').exec(function(err, lesson) {
        if (err) return next(err);
        if (!lesson) return next(new Error('Failed to load Lesson ' + id));
        req.lesson = lesson;
        next();
    });
};

exports.play = function(req, res, next, id) {
    res.contentType('flv');
    console.log(id);
    // make sure you set the correct path to your video file storage
    var path = 'videos/' + id;
    var stat = fs.statSync(path);
    var total = stat.size;
    if (req.headers['range']) {
        var range = req.headers.range;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;
        console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

        var file = fs.createReadStream(path, {
            start: start,
            end: end
        });
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        });
        file.pipe(res);
    } else {
        console.log('ALL: ' + total);
        res.writeHead(200, {
            'Content-Length': total,
            'Content-Type': 'video/mp4'
        });
        fs.createReadStream(path).pipe(res);
    }
};