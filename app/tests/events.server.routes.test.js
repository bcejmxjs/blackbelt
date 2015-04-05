'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Event = mongoose.model('Event'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, event;

/**
 * Event routes tests
 */
describe('Event CRUD tests', function() {
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

        // Save a user to the test db and create new event
        user.save(function() {
            event = {
                title: 'Event Title',
                body: 'Event Body'
            };

            done();
        });
    });

    it('should be able to save an event if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new event
                agent.post('/events')
                    .send(event)
                    .expect(200)
                    .end(function(eventSaveErr, eventSaveRes) {
                        // Handle event save error
                        if (eventSaveErr) done(eventSaveErr);

                        // Get a list of events
                        agent.get('/events')
                            .end(function(eventsGetErr, eventsGetRes) {
                                // Handle event save error
                                if (eventsGetErr) done(eventsGetErr);

                                // Get events list
                                var events = eventsGetRes.body;

                                // Set assertions
                                (events[0].user._id).should.equal(userId);
                                (events[0].title).should.match('Event Title');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to save an event if not logged in', function(done) {
        agent.post('/events')
            .send(event)
            .expect(401)
            .end(function(eventSaveErr, eventSaveRes) {
                // Call the assertion callback
                done(eventSaveErr);
            });
    });

    it('should not be able to save an event if no title is provided', function(done) {
        // Invalidate title field
        event.title = '';

        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new event
                agent.post('/events')
                    .send(event)
                    .expect(400)
                    .end(function(eventSaveErr, eventSaveRes) {
                        // Set message assertion
                        (eventSaveRes.body.message).should.match('Title cannot be blank');

                        // Handle event save error
                        done(eventSaveErr);
                    });
            });
    });

    it('should be able to update an event if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new event
                agent.post('/events')
                    .send(event)
                    .expect(200)
                    .end(function(eventSaveErr, eventSaveRes) {
                        // Handle event save error
                        if (eventSaveErr) done(eventSaveErr);

                        // Update event title
                        event.title = 'WHY YOU GOTTA BE SO MEAN?';

                        // Update an existing event
                        agent.put('/events/' + eventSaveRes.body._id)
                            .send(event)
                            .expect(200)
                            .end(function(eventUpdateErr, eventUpdateRes) {
                                // Handle event update error
                                if (eventUpdateErr) done(eventUpdateErr);

                                // Set assertions
                                (eventUpdateRes.body._id).should.equal(eventSaveRes.body._id);
                                (eventUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should be able to get a list of events if not signed in', function(done) {
        // Create new event model instance
        var eventObj = new Event(event);

        // Save the event
        eventObj.save(function() {
            // Request events
            request(app).get('/events')
                .end(function(req, res) {
                    // Set assertion
                    res.body.should.be.an.Array.with.lengthOf(1);

                    // Call the assertion callback
                    done();
                });

        });
    });


    it('should be able to get a single event if not signed in', function(done) {
        // Create new event model instance
        var eventObj = new event(event);

        // Save the event
        eventObj.save(function() {
            request(app).get('/events/' + eventObj._id)
                .end(function(req, res) {
                    // Set assertion
                    res.body.should.be.an.Object.with.property('title', event.title);

                    // Call the assertion callback
                    done();
                });
        });
    });

    it('should be able to delete an event if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new event
                agent.post('/events')
                    .send(event)
                    .expect(200)
                    .end(function(eventSaveErr, eventSaveRes) {
                        // Handle event save error
                        if (eventSaveErr) done(eventSaveErr);

                        // Delete an existing event
                        agent.delete('/events/' + eventSaveRes.body._id)
                            .send(event)
                            .expect(200)
                            .end(function(eventDeleteErr, eventDeleteRes) {
                                // Handle event error error
                                if (eventDeleteErr) done(eventDeleteErr);

                                // Set assertions
                                (eventDeleteRes.body._id).should.equal(eventSaveRes.body._id);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete an event if not signed in', function(done) {
        // Set event user 
        event.user = user;

        // Create new event model instance
        var eventObj = new Event(event);

        // Save the event
        eventObj.save(function() {
            // Try deleting event
            request(app).delete('/events/' + eventObj._id)
                .expect(401)
                .end(function(eventDeleteErr, eventDeleteRes) {
                    // Set message assertion
                    (eventDeleteRes.body.message).should.match('User is not logged in');

                    // Handle event error error
                    done(eventDeleteErr);
                });

        });
    });

    afterEach(function(done) {
        User.remove().exec();
        Event.remove().exec();
        done();
    });
});