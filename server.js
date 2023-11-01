require('dotenv').config();
const mysql = require('mysql2');

const { app, express } = require('./app');

// Import route files
const userRoutes = require('./src/routes/userRoutes');
const logRoutes = require('./src/routes/logRoutes');


// Kombinasi menjadi satu group route
const router = express.Router();

// Use the Routes
router.use('/', userRoutes);
router.use('/', logRoutes);

// Creating connection to MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json());
app.use('/', router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

module.exports =  { connection, router };
