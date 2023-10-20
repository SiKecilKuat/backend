const { express } = require('../../app');
const router = express.Router();
const {addTestHandler, addSleepLogsHandler, addFoodIntakeLogsHandler} = require('../controllers/handler')


// Menampilkan log makanan
router.get('/child-data/:childId/food-intake-logs:logId', (req, res) => {
  getFoodIntakeLogsHandler(req, res);
});
// Menampilkan log tidur
router.get('/child-data/:childId/sleep-logs:logId', (req, res) => {
  getSleepLogsHandler(req, res);
});

// Menambahkan log makanan
router.post('/child-data/:childId/food-intake-logs' ,(req, res) => {
  addFoodIntakeLogsHandler(req, res);
});

// Menambahkan log tidur
router.post('/child-data/:childId/sleep-logs' ,(req, res) => {
  addSleepLogsHandler(req, res);
});

// Menambah test name
router.post('/test', (req, res) => {
  addTestHandler(req, res);
})

// Page Not Found Route (404)
router.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

module.exports = router;
