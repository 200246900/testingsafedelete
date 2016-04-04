var express = require('express');
var router = express.Router();
var ticketModel = require('../models/ticket');
var Ticket = ticketModel.Ticket;
/* Utility Function to check if user is authenticated */
function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
// GET - show main aritcles page
router.get('/', requireAuth, function (req, res, next) {
    // use the Ticket model to query the Tickets collection
    Ticket.find(function (error, tickets) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            // no error, we found a list of tickets
            res.render('tickets/index', {
                title: 'Tickets',
                tickets: tickets
            });
        }
    });
});
// GET add page - show the blank form
router.get('/add', function (req, res, next) {
    res.render('tickets/add', {
        title: 'Add a New Ticket'
    });
});
// POST add page - save the new ticket
router.post('/add', function (req, res, next) {
    Ticket.create({
        ticketNum: req.body.ticketNum,
        ticketOwner: req.body.ticketOwner,
        ticketStatus: req.body.ticketStatus,
        ticketPriority: req.body.ticketPriority,
        ticketDesc: req.body.ticketDesc,
        ticketCreated: req.body.ticketCreated,
        ticketLastUpdate: req.body.ticketLastUpdate,
        ticketLife: req.body.ticketLife,
        ticketUpdate: req.body.ticketUpdate,
        ticketUser: req.body.ticketUser,
        ticketUserContact: req.body.ticketUserContact
    }, function (error, Ticket) {
        // did we get back an error or valid Ticket object?
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/tickets');
        }
    });
});
// GET edit page - show the current ticket in the form
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Ticket.findById(id, function (error, Ticket) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            //show the edit view
            res.render('tickets/edit', {
                title: 'Ticket Details',
                ticket: Ticket
            });
        }
    });
});
// POST edit page - update the selected ticket
router.post('/:id', function (req, res, next) {
    // grab the id from the url parameter
    var id = req.params.id;
    // create and populate an ticket object
    var ticket = new Ticket({
        _id: id,
        ticketNum: req.body.ticketNum,
        ticketOwner: req.body.ticketOwner,
        ticketStatus: req.body.ticketStatus,
        ticketPriority: req.body.ticketPriority,
        ticketDesc: req.body.ticketDesc,
        ticketCreated: req.body.ticketCreated,
        ticketLastUpdate: req.body.ticketLastUpdate,
        ticketLife: req.body.ticketLife,
        ticketUpdate: req.body.ticketUpdate,
        ticketUser: req.body.ticketUser,
        ticketUserContact: req.body.ticketUserContact
    });
    // run the update using mongoose and our model
    Ticket.update({ _id: id }, ticket, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/tickets');
        }
    });
});
// GET delete ticket
router.get('/delete/:id', function (req, res, next) {
    // get the id from the url
    var id = req.params.id;
    // use the model and delete this record
    Ticket.remove({ _id: id }, function (error) {
        if (error) {
            console.log(error);
            res.end(error);
        }
        else {
            res.redirect('/tickets');
        }
    });
});
// make this public
module.exports = router;

//# sourceMappingURL=tickets.js.map
