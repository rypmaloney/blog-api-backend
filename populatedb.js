#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: '
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var User = require('./models/User');
var Post = require('./models/Post');
require('dotenv').config();

var mongoose = require('mongoose');
const mongoDB = `${process.env.DB_URI}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let users = [];

function createUser() {
    var user = new User({
        username: 'Ryan',
        password: 'ryan',
        permissions: 'admin',
        date: new Date(),
    });

    user.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('New user: ' + user);
        users.push(user);
    });
}

function createPost() {
    postDetail = {
        title: 'Sample Post',
        body_text: 'This is the body of the sample post.',
        author: users[0],
        date: new Date(),
        stage: 'live',
        labels: [],
    };

    var post = new Post(postDetail);
    post.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('New post: ' + post);
    });
}

async.series(
    [createUser, createPost],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        } else {
            console.log('post: ' + post);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    }
);
