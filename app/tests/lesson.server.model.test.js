'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Lesson = mongoose.model('Lesson');

/**
 * Globals
 */
var user, lesson;

/**
 * Unit tests
 */
describe('Lesson Model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: 'username',
            password: 'password'
        });

        user.save(function() {
            lesson = new Lesson({
                name: 'Lesson Name',
                description: 'Lesson Description',
                uri: 'big_buck_bunny.mp4',
                position: 1
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            return lesson.save(function(err) {
                should.not.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Lesson.remove().exec();
        User.remove().exec();

        done();
    });
});