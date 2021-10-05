module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define('user', {
        id_user: {
            type: 'INTEGER',
            primaryKey: true
        },
        name: {
            type: 'VARCHAR'
        },     
        email: {
            type: 'VARCHAR'
        },
        phone_number: {
            type: 'VARCHAR'
        },
        password: {
            type: 'VARCHAR'
        },
        address: {
            type: 'VARCHAR'
        }
    });
    User.associate = function(models) {
        User.hasMany(models.Booking, {as: 'booking', foreignKey: 'bookingId', onDelete: 'CASCADE'
    });
    };
    return User;
}