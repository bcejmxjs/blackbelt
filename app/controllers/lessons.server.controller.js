'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Lesson = mongoose.model('Lesson'),
    _ = require('lodash'),
    ffmpeg = require('fluent-ffmpeg'),
    fs = require('fs'),
    exec = require('child_process').exec;


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

exports.readAll = function(req, res) {
    res.jsonp(req.lessons);
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
        courseId: 1
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
    }).sort({
        position: 1
    }).populate('user', 'displayName').exec(function(err, lessons) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.lessons = lessons;
            next();
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

exports.upload = function(req, res) {
    // Uses multer for uploads.
    var file = req.files.file;
    res.jsonp({
        filename: file.name
    });
    // var command = 'ffmpeg -i ./video/' + file.name + ' -vcodec libx264 -crf 20 output.mp4';
    // exec(command, function(error, stdout, stderr) {
    //     console.log(stdout);
    // });
};

exports.play = function(req, res, next, id) {
    if (req.isAuthenticated()) {
        var videocourse = id.split('-')[0];
        var isAuthorized = false;
        if (req.user.roles.indexOf('admin') > -1) {
            isAuthorized = true;
        } else if (id == "big_buck_bunny.mp4") {
            // Makes sure our test video plays for dummy courses
            isAuthorized = true;
        } else {
            req.user.coursesPurchased.forEach(function(course) {
                if (course.courseId == videocourse) {
                    isAuthorized = true;
                }
            });
        }
        if (isAuthorized) {
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
        } else {
            return res.status(403).send({
                message: 'User is not authorized'
            });
        }
    } else {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
};

exports.hasAuthorization = function(req, res, next) {
    var authorized = false;
    if (req.user.roles.indexOf('admin') > -1) {
        authorized = true;
    } else if (req.user.coursesPurchased) {
        if (req.lessons !== undefined) {
            req.user.coursesPurchased.forEach(function(course) {
                if (course.courseId == req.lessons[0].courseId) {
                    authorized = true;
                }
            });
        } else if (req.lesson !== undefined) {
            req.user.coursesPurchased.forEach(function(course) {
                if (course.courseId == req.lesson.courseId) {
                    authorized = true;
                }
            });
        }
    }
    if (!authorized) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};