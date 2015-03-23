'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: 'TBA... ～(￣▽￣～)(～￣▽￣)～',
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    level: {
        type: Number,
        min: 1
    },
    instructor: {
        type: String,
        default: 'TBA...',
        trim: true
    },
    demo: {
        type: String,
        default: 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1',
        trim: true
    }
});

mongoose.model('Course', CourseSchema);