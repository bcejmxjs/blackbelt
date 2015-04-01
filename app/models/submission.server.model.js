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
    instructorId: {
        type: String
    },
    lessonId: {
        type: String
    },
    url: {
        type: String
    }
});

mongoose.model('Submission', SubmissionSchema);