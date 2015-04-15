'use strict';

var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Message = mongoose.model('Message'),
    agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, message;

/**
 * Message routes tests
 */
describe('Message CRUD tests', function() {
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

        // Save a user to the test db and create new message
        user.save(function() {
            message = {
                title: 'Message Title',
                body: 'Message Body',
                recipientId: user._id
            };

            done();
        });
    });

    it('should be able to save an message if logged in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new message
                agent.post('/messages')
                    .send(message)
                    .expect(200)
                    .end(function(messageSaveErr, messageSaveRes) {
                        // Handle message save error
                        if (messageSaveErr) done(messageSaveErr);

                        // Get a list of messages
                        agent.get('/messages/list/' + userId)
                            .end(function(messagesGetErr, messagesGetRes) {
                                // Handle message save error
                                if (messagesGetErr) done(messagesGetErr);

                                // Get messages list
                                var messages = messagesGetRes.body;

                                // Set assertions
                                (messages[0].title).should.match('Message Title');

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to save an message if not logged in', function(done) {
        agent.post('/messages')
            .send(message)
            .expect(401)
            .end(function(messageSaveErr, messageSaveRes) {
                // Call the assertion callback
                done(messageSaveErr);
            });
    });

    // it('should not be able to save an message if no title is provided', function(done) {
    //     // Invalidate title field
    //     message.title = '';

    //     agent.post('/auth/signin')
    //         .send(credentials)
    //         .expect(200)
    //         .end(function(signinErr, signinRes) {
    //             // Handle signin error
    //             if (signinErr) done(signinErr);

    //             // Get the userId
    //             var userId = user.id;

    //             // Save a new message
    //             agent.post('/messages')
    //                 .send(message)
    //                 .expect(400)
    //                 .end(function(messageSaveErr, messageSaveRes) {
    //                     // Set message assertion
    //                     (messageSaveRes.body.message).should.match('Title cannot be blank');

    //                     // Handle message save error
    //                     done(messageSaveErr);
    //                 });
    //         });
    // });

    it('should be able to get a list of own messages if signed in', function(done) {
        // Create new message model instance
        var messageObj = new Message(message);

        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save the message
                messageObj.save(function() {
                    // Request messages
                    agent.get('/messages/list/' + user._id)
                        .end(function(req, res) {
                            // Set assertion
                            res.body.should.be.an.Array.with.lengthOf(1);

                            // Call the assertion callback
                            done();
                        });

                });
            });
    });

    it('should be able to delete an message if signed in', function(done) {
        agent.post('/auth/signin')
            .send(credentials)
            .expect(200)
            .end(function(signinErr, signinRes) {
                // Handle signin error
                if (signinErr) done(signinErr);

                // Get the userId
                var userId = user.id;

                // Save a new message
                agent.post('/messages')
                    .send(message)
                    .expect(200)
                    .end(function(messageSaveErr, messageSaveRes) {
                        // Handle message save error
                        if (messageSaveErr) done(messageSaveErr);

                        // Delete an existing message
                        agent.delete('/messages/' + messageSaveRes.body._id)
                            .send(message)
                            .expect(200)
                            .end(function(messageDeleteErr, messageDeleteRes) {
                                // Handle message error error
                                if (messageDeleteErr) done(messageDeleteErr);

                                // Set assertions
                                (messageDeleteRes.body._id).should.equal(messageSaveRes.body._id);

                                // Call the assertion callback
                                done();
                            });
                    });
            });
    });

    it('should not be able to delete an message if not signed in', function(done) {
        // Set message user 
        message.user = user;

        // Create new message model instance
        var messageObj = new Message(message);

        // Save the message
        messageObj.save(function() {
            // Try deleting message
            request(app).delete('/messages/' + messageObj._id)
                .expect(401)
                .end(function(messageDeleteErr, messageDeleteRes) {
                    // Set message assertion
                    (messageDeleteRes.body.message).should.match('User is not logged in');

                    // Handle message error error
                    done(messageDeleteErr);
                });

        });
    });

    afterEach(function(done) {
        User.remove().exec();
        Message.remove().exec();
        done();
    });
});