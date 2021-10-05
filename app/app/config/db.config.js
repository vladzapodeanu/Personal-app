const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        freezeTableName: true,
        timestamps: false,
        operatorsAliases: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Sequelize = Sequelize;


//Models/tables

db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.booking = require('../model/booking.model.js')(sequelize, Sequelize);
db.admin = require('../model/admin.model.js')(sequelize, Sequelize);
db.reviews = require('../model/reviews.model.js')(sequelize, Sequelize);


module.exports = db;
