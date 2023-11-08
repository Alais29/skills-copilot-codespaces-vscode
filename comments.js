// create web server
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Member = require('../models/Member.js');

// GET /members route to retrieve all the members
router.get('/', function(req, res) {
  // Query the DB and if no errors, send all the members
  var query = Member.find({});
  query.exec(function(err, members) {
    if(err) res.send(err);
    // If no errors, send them back to the client
    res.json(members);
  });
});

// POST /members to save a new member
router.post('/', function(req, res) {
  // Creates a new member
  var newMember = new Member(req.body);
  // Save it into the DB.
  newMember.save(function(err,members) {
    if(err) {
      res.send(err);
    }
    else { // If no errors, send it back to the client
      res.json({message: "Member successfully added!", members });
    }
  });
});

// GET /members/:id route to retrieve a member given its id
router.get('/:id', function(req, res) {
  Member.findById(req.params.id, function(err, members) {
    if(err) res.send(err);
    // If no errors, send it back to the client
    res.json(members);
  });
});

// DELETE /members/:id to delete a member given its id
router.delete('/:id', function(req, res) {
  Member.remove({_id : req.params.id}, function(err, result) {
    res.json({ message: "Member successfully deleted!", result });
  });
});

// PUT /members/:id to updatea a member given its id
router.put('/:id', function(req, res) {
  Member.findById({_id: req.params.id}, function(err, members) {
    if(err) res.send(err);
    Object.assign(members, req.body).save(function(err, members) {
      if(err) res.send(err);
      res.json({ message: 'Member updated!', members });
    });
  });
});

// Exports all the routes to router variable
module.exports = router;