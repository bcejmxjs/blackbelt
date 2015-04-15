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
        trim: true,
        required: 'Please fill in a name'
    },
    description: {
        type: String,
        trim: true,
        required: 'Please fill in a description'
    },
    uri: {
        type: String,
        trim: true
    },
    position: {
        type: Number,
        required: 'Please fill in a position'
    },
    courseId: {
        type: String
    }
});

mongoose.model('Lesson', LessonSchema);