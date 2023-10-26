// const connection = require('../../server')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

// Food log Handlers

const addFoodIntakeLogsHandler = (req, res) => {
    try {
        const { childId } = req.params;
        const { mealType, foodItem,  calories } = req.body;

        if (!mealType || !foodItem || !calories) {
            return res.status(400).json({ error: 'Invalid request body. Please provide mealType, foodItem, and calories.' });
        }

        connection.query('INSERT INTO food_intake_log (child_id, meal_type, food_item, calories) VALUES (?, ?, ?, ?)',
        [childId, mealType, foodItem, calories],
        (error) => {
            if (error) {
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(201).json({
                    status: 'success',
                    childId: childId,
                    message: 'food intake log successfully created'
                });
            }
        });
        
    } catch {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

const getFoodIntakeLogsHandler = (req, res) => {
    try {
        const { childId } = req.params;
        connection.query(
            'SELECT * FROM food_intake_log WHERE child_id = ?',
            [childId],
            (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (results.length === 0) {
                    res.status(404).json({ error: 'Food intake log not found' });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: results,
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getFoodIntakeLogByIdHandler = (req, res) => {
    try {
        const { childId, logId } = req.params;
        connection.query(
            'SELECT * FROM food_intake_log WHERE child_id = ? AND log_id = ?',
            [childId, logId],
            (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (results.length === 0) {
                    res.status(404).json({ error: 'Food intake log not found' });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: results,
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteFoodIntakeLogByIdHandler = (req, res) => {
    try{
        const { logId } = req.params;
        connection.query('DELETE FROM food_intake_log WHERE log_id = ?',
        [logId],
        (error, results) => {
            if (error) {
                res.status(500).json({ error: 'Database error' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Food intake log not found' });
            } else {
                res.status(200).json({
                    logId: logId,
                    message: 'Log deleted successfully'
                });
            }
        });
    }
    catch {
        res.status(500).json({ error: 'Internal server error' });
    }

    
}

// Sleep log Handlers

const addSleepLogsHandler = (req, res) => {
    try{
        const { childId } = req.params;
        const { duration } = req.body;
        
        if (!duration) {
            res.status(400).json({ error: 'Invalid request body. Please provide sleep duration.' })
        };

        connection.query('INSERT INTO sleep_log (child_id, duration) VALUES (?, ?)',
        [childId, duration],
        (error) => {
            if(error){
                res.status(500).json({error: 'Database error'});
            } else{
                res.status(201).json({
                    status: 'success',
                    childId: childId,
                    message: 'sleep log successfully created'
                });
            }
        });
        
    }
    catch (error){
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

const getSleepLogsHandler = (req, res) => {
    try {
        const { childId } = req.params;
        connection.query(
            'SELECT * FROM sleep_log WHERE child_id = ?',
            [childId],
            (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (results.length === 0) {
                    res.status(404).json({ error: 'Sleep log not found' });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: results,
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSleepLogByIdHandler = (req, res) => {
    try {
        const { childId, logId } = req.params;
        connection.query(
            'SELECT * FROM sleep_log WHERE child_id = ? AND log_id = ?',
            [childId, logId],
            (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (results.length === 0) {
                    res.status(404).json({ error: 'Sleep log not found' });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: results,
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteSleepLogByIdHandler = (req, res) => {
    try{
        const { logId } = req.params;
        connection.query('DELETE FROM sleep_log WHERE log_id = ?',
        [logId],
        (error, results) => {
            console.log(results)
            if (error) {
                res.status(500).json({ error: 'Database error' });
            } else if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Sleep log not found' });
            } else {
                res.status(200).json({
                    logId: logId,
                    message: 'Log deleted successfully'
                });
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    
}

// const addTestHandler = (req, res) => {
//     try {
//         const nama = req.body.nama;
//         res.status(200).send('ok')
//         const result = connection.query('INSERT INTO test (nama) VALUES (?)', nama);
//         // console.log(result)
//         res.status(201).json({
//             id: '1',
//             message: 'test name created',
//             result: result
//         });
//     } catch (error){
//         res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// }

module.exports = {addSleepLogsHandler, addFoodIntakeLogsHandler, getFoodIntakeLogsHandler, getFoodIntakeLogByIdHandler,
getSleepLogsHandler, getSleepLogByIdHandler, deleteFoodIntakeLogByIdHandler, deleteSleepLogByIdHandler}