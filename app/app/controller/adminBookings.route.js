module.exports = function(app) {

    const adminBook = require('./adminBookings.controller.js');
    
    app.get('/api/adminBookings', adminBook.findAll);

    app.get('/api/adminBookings/:id_booking', adminBook.findById);

    app.delete('/api/adminBookings/delete/:id_booking', adminBook.delete);
}