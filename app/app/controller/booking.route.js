module.exports = function (app) {

    const booking = require('./booking.controller.js');

    // Retrieve all Companies
    app.get('/api/booking', booking.findAll);

    app.post('/api/booking/create', booking.create);

    app.get('/api/booking/:id_user', booking.findById);
}