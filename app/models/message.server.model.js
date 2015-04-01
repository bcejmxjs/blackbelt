'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({
    recipientId: {
        type: String
    },
    senderId: {
        type: String
    },
    submissionId: {
        type: String
    },
    title: {
        type: String,
        trim: true
    },
    body: {
        type: String,
        trim: true
    },
    read: {
        type: Boolean
    }
});

mongoose.model('Message', MessageSchema);