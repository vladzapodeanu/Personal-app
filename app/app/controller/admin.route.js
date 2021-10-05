const { response } = require('express');

module.exports = function(app) {

    const admin = require('./admin.controller.js');

    app.get('/api/admin', admin.findAll);

    app.get('/api/admin/:name', admin.findByName);

}