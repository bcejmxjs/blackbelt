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
	title : {
        type: String,
        trim: true
    },
    date : {
        type: Date
    },
    body : {
        type: String,
        trim: true
    }
	// ...
});

mongoose.model('Event', EventSchema);
