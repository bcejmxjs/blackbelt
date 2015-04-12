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
        default: '',
        trim: true
    },
    price: {
        type: Number,
        min: 0
    },
    instructor: {
        type: String,
        default: 'TBA',
        trim: true
    },
    demo: {
        type: String,
        default: 'https://www.youtube.com/embed/TEQnTv31SYo?rel=0&autoplay=1',
        trim: true
    },
    style: {
        type: String,
        enum: ['Karate', 'Kenpō', 'Jujitsu', 'Ninjitsu'],
        default: 'Karate'
    },
    belt: {
        type: String,
        enum: ['White', 'Yellow', 'Gold', 'Orange', 'Green', 'Blue', 'Purple', 'Brown', 'Red', 'Black'],
        default: 'White'
    }
});

mongoose.model('Course', CourseSchema);