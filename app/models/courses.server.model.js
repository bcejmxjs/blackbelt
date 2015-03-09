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
    created:{
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Course', CourseSchema);