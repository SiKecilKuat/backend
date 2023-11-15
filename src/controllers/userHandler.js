const service = require('../services/service');
// const connection = require('../../server')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

// parent

const addParentHandler = (req, res) => {
    try {
        const { name } = req.body; // Assuming you send the parent data in the request body
        connection.query(
            'INSERT INTO parent (name) values (?) ',
            [name],
            (error) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else {
                    res.status(200).json({ status: 'success', message: 'Parent added successfully' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getParentHandler = (req, res) => {
    try {
        const { parentId } = req.params;
        connection.query(
            'SELECT * FROM parent WHERE id = ?',
            [parentId],
            (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (results.length === 0) {
                    res.status(404).json({ error: 'Parent not found' });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: results[0],
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


const editParentByIdHandler = (req, res) => {
    try {
        const { parentId } = req.params;
        const updatedData = req.body; // Updated parent data
        connection.query(
            'UPDATE parent SET ? WHERE id = ?',
            [updatedData, parentId],
            (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Parent not found' });
                } else {
                    res.status(200).json({ status: 'success', message: 'Parent edited successfully' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}




// child

const addChildHandler = (req, res) => {
    try {
        const { name, birthDate, gender, birthPlace, orderOfBirth, weight } = req.body; // brithDate format yyyy-MM-dd
        const { parentId } = req.params;
        connection.query(
           
            'INSERT INTO child (name, parent_id, birth_date, gender, birth_place, order_of_birth, weight) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, parentId, birthDate, gender, birthPlace, orderOfBirth, weight],
            (error, result) => {
                console.log(gender)
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else {
                    res.status(200).json({ status: 'success', message: 'Child added successfully' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


const getChildsHandler = (req, res) => {
    try {
        connection.query(
            'SELECT * FROM child',
            (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
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


const getChildByIdHandler = (req, res) => {
    try {
        const { childId } = req.params;
        connection.query(
            'SELECT * FROM child WHERE child_id = ?',
            [childId],
            (error, results) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (results.length === 0) {
                    res.status(404).json({ error: 'Child not found' });
                } else {
                    res.status(200).json({
                        status: 'success',
                        data: results[0],
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


const editChildByIdHandler = (req, res) => {
    try {
        const { childId } = req.params;
        const updatedData = req.body; // Updated child data
        connection.query(
            'UPDATE child SET ? WHERE id = ?',
            [updatedData, childId],
            (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Child not found' });
                } else {
                    res.status(200).json({ status: 'success', message: 'Child edited successfully' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteChildByIdHandler = (req, res) => {
    try {
        const { childId } = req.params;
        connection.query(
            'DELETE FROM child WHERE id = ?',
            [childId],
            (error, result) => {
                if (error) {
                    res.status(500).json({ error: 'Database error' });
                } else if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Child not found' });
                } else {
                    res.status(200).json({ status: 'success', message: 'Child deleted successfully' });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {addParentHandler,addChildHandler, getParentHandler, getChildsHandler, getChildByIdHandler,
    editParentByIdHandler, editChildByIdHandler, deleteChildByIdHandler}