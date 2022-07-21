const {DataTypes} = require('sequelize'); //импортим типы данных из секвалайза
const sequelize = require('../db') //мпотрим настройки БД
// ----------IMPORTS----------------------------

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    username: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
});

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    value: {type: DataTypes.STRING, unique: true, defaultValue: 'USER'}
});


Role.hasMany(User)
User.belongsTo(Role)


module.exports = {
    User,
    Role
}