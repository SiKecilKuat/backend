const { express } = require('../../app');
const router = express.Router();

// Page Not Found Route (404)
router.get('*', (req, res) => {
  res.status(404).send('Page Not Found Sir');
});

module.exports = router;
