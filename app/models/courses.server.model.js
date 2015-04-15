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
        trim: true,
        required: 'Please fill in a name'
    },
    description: {
        type: String,
        default: '',
        trim: true,
        required: 'Please fill in a description'
    },
    price: {
        type: Number,
        min: 0,
        required: 'Please fill in a price'
    },
    instructor: {
        type: String,
        default: 'All',
        trim: true
    },
    demo: {
        type: String,
        default: 'https://www.youtube.com/embed/TEQnTv31SYo?rel=0&autoplay=1',
        trim: true,
        match: [/^http(s):\/\/(?:www\.)?www\.youtube\.com\/embed\/\S*$/, 'Please fill in a youtube url']
    },
    style: {
        type: String,
        enum: ['Karate', 'Kenpō', 'Jujitsu', 'Ninjitsu'],
        default: 'Karate',
        required: 'Please choose a style'
    },
    belt: {
        type: {
            color: {
                type: String,
                enum: ['White', 'Yellow', 'Gold', 'Orange', 'Green', 'Blue', 'Purple', 'Brown', 'Red', 'Black'],
                default: 'White'
            },
            level: {
                value: Number,
                default: 1,
                min: 1
            }
        },
        default: {
            color: 'White',
            level: 1
        },
        required: 'Please choose a belt'
    }
});

mongoose.model('Course', CourseSchema);