'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Submission Schema
 */
var SubmissionSchema = new Schema({
    userId: {
        type: String
    },
    userDisplayName: {
        type: String
    },
    instructorId: {
        type: String
    },
    lessonId: {
        type: String
    },
    courseId: {
        type: String
    },
    created: {
        type: Date
    },
    url: {
        type: String,
        required: true,
        match: [/^http(s):\/\/(?:www\.)?www\.youtube\.com\/embed\/\S*$/, 'Please fill in a youtube url']
    },
    reviewed: {
        type: Boolean
    }
});

mongoose.model('Submission', SubmissionSchema);