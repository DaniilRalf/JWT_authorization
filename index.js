const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const authRoute = require('./authRouter');
const Models = require('./models/Models');


// CONSTANTS---------------------------------------
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use('/auth', authRoute);
// CONSTANTS---------------------------------------


// START APP----------------------------------------
const start = async () => {
    try {
        await sequelize.authenticate(); //подключение к БД
        await sequelize.sync();  //сверяем БД с теми моделями что мы описали
        await app.listen(PORT, () => console.log(`SERVER START ON PORT - ${PORT}`));  //запуск сервера
    } catch (e) {
        console.log(`ERROR - ${e}`) //отлавливаем ошибку при подключении
    }
}
start();
// START APP----------------------------------------