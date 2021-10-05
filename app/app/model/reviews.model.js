module.exports = (sequelize, Sequelize) => {

    const Reviews = sequelize.define('reviews', {
        id: {
            type: 'INTEGER',
            autoIncrement: true,
            primaryKey: true
        },
        review: {
            type: 'VARCHAR'
        },
        id_user: {
            type: 'VARCHAR'
        }
    });
    return Reviews;
}