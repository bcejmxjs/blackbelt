'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EventSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Please fill in a title'
    },
    date: {
        type: Date,
        required: 'Please choose a date'
    },
    body: {
        type: String,
        trim: true,
        required: 'Please fill in a description'
    }
    // ...
});

mongoose.model('Event', EventSchema);