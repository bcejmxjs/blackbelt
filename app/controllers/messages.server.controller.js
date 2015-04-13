'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Message = mongoose.model('Message'),
    _ = require('lodash');

/**
 * Create a Message
 */
exports.create = function(req, res) {
    var message = new Message(req.body);

    message.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(message);
        }
    });
};

/**
 * Show the current Message
 */
exports.read = function(req, res) {
    res.jsonp(req.message);
};

exports.readAll = function(req, res) {
    res.jsonp(req.messages);
};

/**
 * Update a Message
 */
exports.update = function(req, res) {
    var message = req.message;

    message = _.extend(message, req.body);

    message.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(message);
        }
    });
};

/**
 * Delete an Message
 */
exports.delete = function(req, res) {
    var message = req.message;

    message.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(message);
        }
    });
};

/**
 * List of Messages
 */
exports.list = function(req, res) {
    Message.find().sort({
        position: 1
    }).populate('user', 'displayName').exec(function(err, messages) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(messages);
        }
    });
};

exports.messagesByRecipientID = function(req, res, next, id) {
    Message.find({
        recipientId: id
    }).populate('user', 'displayName').exec(function(err, messages) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.messages = messages;
            next();
        }
    });
};

exports.messageByID = function(req, res, next, id) {
    Message.findById(id).populate('user', 'displayName').exec(function(err, message) {
        if (err) return next(err);
        if (!message) return next(new Error('Failed to load Message ' + id));
        req.message = message;
        next();
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.messages && req.messages.length) {
        if (req.messages[0].recipientId !== req.user.id) {
            return res.status(403).send({
                message: 'User is not authorized'
            });
        }
    } else if (req.message) {
        if (req.message.recipientId !== req.user.id) {
            return res.status(403).send({
                message: 'User is not authorized'
            });
        }
    }
    next();
};