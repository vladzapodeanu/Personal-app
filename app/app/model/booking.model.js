module.exports = (sequelize, Sequelize) => {

    const booking = sequelize.define('booking', {
        id_booking: {
            type: 'INTEGER',
            autoIncrement: true,
            primaryKey: true
        },       
        id_user: {
            type: 'INTEGER'
        },
        from_address: {
            type: 'VARCHAR'
        },
        to_address: {
            type: 'VARCHAR'
        },
        distance: {
            type: 'FLOAT'
        },
        price: {
            type: 'FLOAT'
        },
        payment_method: {
            type: 'VARCHAR'
        },
        passenger: {
            type: 'INTEGER'
        },
        data: {
            type: 'DATETIME'
        }
    });
    booking.associate = function(models) {
        booking.belongsTo(models.User, {as: 'FK_id_user'});
      };  
    return booking;
}