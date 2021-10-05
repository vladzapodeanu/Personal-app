const { response } = require('express');

module.exports = function(app) {

    const reviews = require('./reviews.controller.js');

    app.get('/api/reviews', reviews.findAll);

    app.post('/api/reviews/create', reviews.create);

    app.get('/api/reviews/:id_user', reviews.findById);

}