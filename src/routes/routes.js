const { express } = require('../../app');
const router = express.Router();
const {addSleepLogsHandler, addFoodIntakeLogsHandler, getSleepLogsHandler,
  getSleepLogByIdHandler, getFoodIntakeLogByIdHandler, getFoodIntakeLogsHandler,
  deleteFoodIntakeLogByIdHandler, deleteSleepLogByIdHandler} = require('../controllers/logHandler')


// Menampilkan log makanan
router.get('/child-data/:childId/food-intake-logs', (req, res) => {
  getFoodIntakeLogsHandler(req, res);
});

router.get('/child-data/:childId/food-intake-logs/:logId', (req, res) => {
  getFoodIntakeLogByIdHandler(req, res);
});

// Menampilkan log tidur
router.get('/child-data/:childId/sleep-logs', (req, res) => {
  getSleepLogsHandler(req, res);
});

router.get('/child-data/:childId/sleep-logs/:logId', (req, res) => {
  getSleepLogByIdHandler(req, res);
});

// Menambahkan log makanan
router.post('/child-data/:childId/food-intake-logs' ,(req, res) => {
  addFoodIntakeLogsHandler(req, res);
});

// Menambahkan log tidur
router.post('/child-data/:childId/sleep-logs' ,(req, res) => {
  addSleepLogsHandler(req, res);
});

// Menghapus log makan
router.delete('/child-data/:childId/food-intake-logs/:logId', (req, res) => {
  deleteFoodIntakeLogByIdHandler(req, res);
});

// Menghapus log tidur
router.delete('/child-data/:childId/sleep-logs/:logId', (req, res) => {
  deleteSleepLogByIdHandler(req, res);
});



// // Menambah test name
// router.post('/test', (req, res) => {
//   addTestHandler(req, res);
// })

// Page Not Found Route (404)
router.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

module.exports = router;
