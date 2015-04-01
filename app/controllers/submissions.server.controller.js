'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Submission = mongoose.model('Submission'),
    _ = require('lodash');

/**
 * Create a Submission
 */
exports.create = function(req, res) {
    var submission = new Submission(req.body);

    submission.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(submission);
        }
    });
};

/**
 * Show the current Submission
 */
exports.read = function(req, res) {
    res.jsonp(req.submission);
};

/**
 * Update a Submission
 */
exports.update = function(req, res) {
    var submission = req.submission;

    submission = _.extend(submission, req.body);

    submission.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(submission);
        }
    });
};

/**
 * Delete an Submission
 */
exports.delete = function(req, res) {
    var submission = req.submission;

    submission.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(submission);
        }
    });
};

/**
 * List of Submissions
 */
exports.list = function(req, res) {
    Submission.find().sort({
        position: 1
    }).populate('user', 'displayName').exec(function(err, submissions) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(submissions);
        }
    });
};

exports.submissionByID = function(req, res, next, id) {
    Submission.findById(id).populate('user', 'displayName').exec(function(err, submission) {
        if (err) return next(err);
        if (!submission) return next(new Error('Failed to load Submission ' + id));
        req.submission = submission;
        next();
    });
};
'use strict';