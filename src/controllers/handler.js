// const connection = require('../../server')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

const addSleepLogsHandler = (req, res) => {
    try{
        const { childId } = req.params;
        //const dtcreated = new Date().toISOString().slice(0, 19);
        const { duration } = req.body;
        connection.query('INSERT INTO sleep_log (child_id, duration) VALUES (?, ?)',
        [childId, duration]);
        res.status(201).json({
            id: childId,
            message: 'sleep log successfuly created'
        });
    }
    catch (error){
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

const addFoodIntakeLogsHandler = (req, res) => {
    try {
        const { childId } = req.params;
        //const dtcreated = new Date().toISOString().slice(0, 19);
        const { mealType, foodItem,  calories } = req.body;
        connection.query('INSERT INTO food_intake_log (child_id, meal_type, food_item, calories) VALUES (?, ?, ?, ?)',
        [childId, mealType, foodItem, calories]);
        res.status(201).json({
            id: childId,
            message: 'food intake log successfuly created'
        });
    } catch {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

const addTestHandler = (req, res) => {
    try {
        const nama = req.body.nama;
        res.status(200).send('ok')
        const result = connection.query('INSERT INTO test (nama) VALUES (?)', nama);
        // console.log(result)
        res.status(201).json({
            id: '1',
            message: 'test name created'
        });
    } catch (error){
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

module.exports = {addTestHandler, addSleepLogsHandler, addFoodIntakeLogsHandler}