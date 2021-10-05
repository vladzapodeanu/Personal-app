module.exports = function(app) {

    const adminUser = require('./adminUser.controller.js');
    
    app.get('/api/adminUser', adminUser.findAll);

    app.get('/api/adminUser/:id_user', adminUser.findById);

    app.delete('/api/adminUser/delete/:id_user', adminUser.delete);
}