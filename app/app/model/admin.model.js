module.exports = (sequelize, Sequelize) => {

    const Admin = sequelize.define('admin', {
        id: {
            type: 'INTEGER',
            primaryKey: true
        },
        name: {
            type: 'VARCHAR'
        },
        password: {
            type: 'VARCHAR'
        }
    });
    return Admin;
}