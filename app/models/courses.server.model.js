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
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    level: {
        type: Number,
        min: 1
    }
});

mongoose.model('Course', CourseSchema);