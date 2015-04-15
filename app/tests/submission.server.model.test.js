'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Submission = mongoose.model('Submission');

/**
 * Globals
 */
var user, submission;

/**
 * Unit tests
 */
describe('Submission Model Unit Tests:', function() {
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
            submission = new Submission({
                url: 'https://www.youtube.com/embed/OmcQZD_LIAE'
            });

            done();
        });
    });

    describe('Method Save', function() {
        it('should be able to save without problems', function(done) {
            return submission.save(function(err) {
                should.not.exist(err);
                done();
            });
        });
    });

    afterEach(function(done) {
        Submission.remove().exec();
        User.remove().exec();

        done();
    });
});