'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Submission = mongoose.model('Submission'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, submission;

/**
 * Submission routes tests
 */
describe('Submission CRUD tests', function() {
    beforeEach(function(done) {
        // Create user credentials
        credentials = {
            username: 'username',
            password: 'password'
        };

        // Create a new user
        user = new User({
            firstName: 'Full',
            lastName: 'Name',
            displayName: 'Full Name',
            email: 'test@test.com',
            username: credentials.username,
            password: credentials.password,
            provider: 'local',
            roles: ['admin']
        });

        // Save a user to the test db and create new submission
        user.save(function() {
            submission = {
                url: 'Submission Description'
            };

            done();
        });
    });

    it('should be able to save an submission if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new submission
                agent.post('/submissions')
                    .send(submission)
                    .expect(200)
                    .end(function(submissionSaveErr, submissionSaveRes) {
                        // Handle submission save error
                        if (submissionSaveErr) done(submissionSaveErr);

                        // Get a list of submissions
                        agent.get('/submissions')
                            .end(function(submissionsGetErr, submissionsGetRes) {
                                // Handle submission save error
                                if (submissionsGetErr) done(submissionsGetErr);

                                // Get submissions list
                                var submissions = submissionsGetRes.body;

                                // Set assertions
                                (submissions[0].url).should.match('Submission Description');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to save an submission if not logged in', function(done) {
        agent.post('/submissions')
            .send(submission)
            .expect(401)
            .end(function(submissionSaveErr, submissionSaveRes) {
                // Call the assertion callback
                done(submissionSaveErr);
            });
    });

    // it('should not be able to save an submission if no name is provided', function(done) {
    //     // Invalidate name field
    //     submission.name = '';

    //     agent.post('/auth/signin')
    //         .send(credentials)
    //         .expect(200)
    //         .end(function(signinErr, signinRes) {
    //             // Handle signin error
    //             if (signinErr) done(signinErr);

    //             // Get the userId
    //             var userId = user.id;

    //             // Save a new submission
    //             agent.post('/submissions')
    //                 .send(submission)
    //                 .expect(400)
    //                 .end(function(submissionSaveErr, submissionSaveRes) {
    //                     // Set message assertion
    //                     (submissionSaveRes.body.message).should.match('Name cannot be blank');

    //                     // Handle submission save error
    //                     done(submissionSaveErr);
    //                 });
    //         });
    // });

    it('should be able to update an submission if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new submission
                agent.post('/submissions')
                    .send(submission)
                    .expect(200)
                    .end(function(submissionSaveErr, submissionSaveRes) {
                        // Handle submission save error
                        if (submissionSaveErr) done(submissionSaveErr);

                        // Update submission name
                        submission.name = 'WHY YOU GOTTA BE SO MEAN?';

                        // Update an existing submission
                        agent.put('/submissions/' + submissionSaveRes.body._id)
                            .send(submission)
                            .expect(200)
                            .end(function(submissionUpdateErr, submissionUpdateRes) {
                                // Handle submission update error
                                if (submissionUpdateErr) done(submissionUpdateErr);

                                // Set assertions
                                (submissionUpdateRes.body._id).should.equal(submissionSaveRes.body._id);
                                (submissionUpdateRes.body.url).should.match('WHY YOU GOTTA BE SO MEAN?');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of submissions if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Create new submission model instance
                var submissionObj = new submission(submission);

                // Save the submission
                submissionObj.save(function() {
                    // Request submissions
                    agent.get('/submissions')
                        .end(function(req, res) {
                            // Set assertion
                            res.body.should.be.an.Array.with.lengthOf(1);

                            // Call the assertion callback
                            done();
                        });
                });
            });
    });

    it('should not be able to get a list of submissions if not signed in', function(done) {

        // Create new submission model instance
        var submissionObj = new Submission(submission);

        // Save the submission
        submissionObj.save(function() {
            // Request submissions
            request(app).get('/submissions')
                .expect(401)
                .end(function(submissionGetErr, submissionGetRes) {
                    // Set message assertion
                    (submissionGetRes.body.message).should.match('User is not logged in');


                    // Call the assertion callback
                    done(submissionGetErr);
                });
        });
    });

    it('should be able to get a single submission if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Create new submission model instance
                var submissionObj = new Submission(submission);

                // Save the submission
                submissionObj.save(function() {
                    agent.get('/submissions/' + submissionObj._id)
                        .end(function(req, res) {
                            // Set assertion
                            res.body.should.be.an.Object.with.property('name', submission.name);

                            // Call the assertion callback
                            done();
                        });
                });
            });


    });

    it('should not be able to get a single submission if not signed in', function(done) {
        // Create new submission model instance
        var submissionObj = new Submission(submission);

        // Save the submission
        submissionObj.save(function() {
            request(app).get('/submissions/' + submissionObj._id)
                .expect(401)
                .end(function(submissionGetErr, submissionGetRes) {
                    // Set message assertion
                    (submissionGetRes.body.message).should.match('User is not logged in');


                    // Call the assertion callback
                    done(submissionGetErr);
                });

        });


    });

    it('should be able to delete an submission if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new submission
                agent.post('/submissions')
                    .send(submission)
                    .expect(200)
                    .end(function(submissionSaveErr, submissionSaveRes) {
                        // Handle submission save error
                        if (submissionSaveErr) done(submissionSaveErr);

                        // Delete an existing submission
                        agent.delete('/submissions/' + submissionSaveRes.body._id)
                            .send(submission)
                            .expect(200)
                            .end(function(submissionDeleteErr, submissionDeleteRes) {
                                // Handle submission error error
                                if (submissionDeleteErr) done(submissionDeleteErr);

                                // Set assertions
                                (submissionDeleteRes.body._id).should.equal(submissionSaveRes.body._id);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete an submission if not signed in', function(done) {
        // Set submission user 
        submission.user = user;

        // Create new submission model instance
        var submissionObj = new Submission(submission);

        // Save the submission
        submissionObj.save(function() {
            // Try deleting submission
            request(app).delete('/submissions/' + submissionObj._id)
                .expect(401)
                .end(function(submissionDeleteErr, submissionDeleteRes) {
                    // Set message assertion
                    (submissionDeleteRes.body.message).should.match('User is not logged in');

                    // Handle submission error error
                    done(submissionDeleteErr);
                });
        });
    });

    afterEach(function(done) {
        User.remove().exec();
        Submission.remove().exec();
        done();
    });
});