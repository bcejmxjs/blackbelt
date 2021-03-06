'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Course = mongoose.model('Course');

/**
 * Globals
 */
var user, course;

/**
 * Unit tests
 */
describe('Course Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password',
            roles: ['admin']
        });

        user.save(function() {
            course = new Course({
                name: 'Course Name',
                description: 'Course Description',
                price: 12,
                instructor: 'Bruce Lee',
                style: 'Karate',
                belt: {
                    color: 'White',
                    level: 1
                }
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            return course.save(function(err) {
                should.not.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Course.remove().exec();
        User.remove().exec();

        done();
    });
});