module.exports = function(app) {

    const adminEdit = require('./adminEdit.controller.js');

    app.get('/api/adminUser/edit', adminEdit.findAll);

    app.get('/api/adminUser/edit/:id_user', adminEdit.findById);

    app.put('/api/adminUser/edit/:id_user', adminEdit.update);

}