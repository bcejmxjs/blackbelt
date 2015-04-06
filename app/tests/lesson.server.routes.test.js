'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Lesson = mongoose.model('Lesson'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, lesson;

/**
 * Lesson routes tests
 */
describe('Lesson CRUD tests', function() {
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

        // Save a user to the test db and create new lesson
        user.save(function() {
            lesson = {
                name: 'Lesson Name',
                description: 'Lesson Description'
            };

            done();
        });
    });

    it('should be able to save an lesson if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new lesson
                agent.post('/lessons')
                    .send(lesson)
                    .expect(200)
                    .end(function(lessonSaveErr, lessonSaveRes) {
                        // Handle lesson save error
                        if (lessonSaveErr) done(lessonSaveErr);

                        // Get a list of lessons
                        agent.get('/lessons')
                            .end(function(lessonsGetErr, lessonsGetRes) {
                                // Handle lesson save error
                                if (lessonsGetErr) done(lessonsGetErr);

                                // Get lessons list
                                var lessons = lessonsGetRes.body;

                                // Set assertions
                                (lessons[0].name).should.match('Lesson Name');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to save an lesson if not logged in', function(done) {
        agent.post('/lessons')
            .send(lesson)
            .expect(401)
            .end(function(lessonSaveErr, lessonSaveRes) {
                // Call the assertion callback
                done(lessonSaveErr);
            });
    });

    // it('should not be able to save an lesson if no name is provided', function(done) {
    //     // Invalidate name field
    //     lesson.name = '';

    //     agent.post('/auth/signin')
    //         .send(credentials)
    //         .expect(200)
    //         .end(function(signinErr, signinRes) {
    //             // Handle signin error
    //             if (signinErr) done(signinErr);

    //             // Get the userId
    //             var userId = user.id;

    //             // Save a new lesson
    //             agent.post('/lessons')
    //                 .send(lesson)
    //                 .expect(400)
    //                 .end(function(lessonSaveErr, lessonSaveRes) {
    //                     // Set message assertion
    //                     (lessonSaveRes.body.message).should.match('Name cannot be blank');

    //                     // Handle lesson save error
    //                     done(lessonSaveErr);
    //                 });
    //         });
    // });

    it('should be able to update an lesson if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new lesson
                agent.post('/lessons')
                    .send(lesson)
                    .expect(200)
                    .end(function(lessonSaveErr, lessonSaveRes) {
                        // Handle lesson save error
                        if (lessonSaveErr) done(lessonSaveErr);

                        // Update lesson name
                        lesson.name = 'WHY YOU GOTTA BE SO MEAN?';

                        // Update an existing lesson
                        agent.put('/lessons/' + lessonSaveRes.body._id)
                            .send(lesson)
                            .expect(200)
                            .end(function(lessonUpdateErr, lessonUpdateRes) {
                                // Handle lesson update error
                                if (lessonUpdateErr) done(lessonUpdateErr);

                                // Set assertions
                                (lessonUpdateRes.body._id).should.equal(lessonSaveRes.body._id);
                                (lessonUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of lessons if not signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Create new lesson model instance
                var lessonObj = new Lesson(lesson);

                // Save the lesson
                lessonObj.save(function() {
                    // Request lessons
                    agent.get('/lessons')
                        .end(function(req, res) {
                            // Set assertion
                            res.body.should.be.an.Array.with.lengthOf(1);

                            // Call the assertion callback
                            done();
                        });
                });
            });
    });


    it('should be able to get a single lesson if not signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Create new lesson model instance
                var lessonObj = new Lesson(lesson);

                // Save the lesson
                lessonObj.save(function() {
                    agent.get('/lessons/' + lessonObj._id)
                        .end(function(req, res) {
                            // Set assertion
                            res.body.should.be.an.Object.with.property('name', lesson.name);

                            // Call the assertion callback
                            done();
                        });
                });
            });
    });

    it('should be able to delete an lesson if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new lesson
                agent.post('/lessons')
                    .send(lesson)
                    .expect(200)
                    .end(function(lessonSaveErr, lessonSaveRes) {
                        // Handle lesson save error
                        if (lessonSaveErr) done(lessonSaveErr);

                        // Delete an existing lesson
                        agent.delete('/lessons/' + lessonSaveRes.body._id)
                            .send(lesson)
                            .expect(200)
                            .end(function(lessonDeleteErr, lessonDeleteRes) {
                                // Handle lesson error error
                                if (lessonDeleteErr) done(lessonDeleteErr);

                                // Set assertions
                                (lessonDeleteRes.body._id).should.equal(lessonSaveRes.body._id);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete an lesson if not signed in', function(done) {
        // Set lesson user 
        lesson.user = user;

        // Create new lesson model instance
        var lessonObj = new Lesson(lesson);

        // Save the lesson
        lessonObj.save(function() {
            // Try deleting lesson
            request(app).delete('/lessons/' + lessonObj._id)
                .expect(401)
                .end(function(lessonDeleteErr, lessonDeleteRes) {
                    // Set message assertion
                    (lessonDeleteRes.body.message).should.match('User is not logged in');

                    // Handle lesson error error
                    done(lessonDeleteErr);
                });
        });
    });

    afterEach(function(done) {
        User.remove().exec();
        Lesson.remove().exec();
        done();
    });
});