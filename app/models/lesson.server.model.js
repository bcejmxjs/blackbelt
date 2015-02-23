'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Lesson Schema
 */
var LessonSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    uri: {
        type: String,
        trim: true
    },
    course: {
        type: {
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        }
    }
});

mongoose.model('Lesson', LessonSchema);