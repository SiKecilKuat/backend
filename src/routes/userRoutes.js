const { express } = require('../../app');
const router = express.Router();
const {addParentHandler, addChildHandler, getParentHandler, getChildsHandler, 
    getChildByIdHandler, editParentByIdHandler, editChildByIdHandler, deleteChildByIdHandler } = require('../controllers/userHandler')

// Menambahkan User/Parent
router.post('/parent-data', (req, res) => {
    addParentHandler(req, res);
});

// Menambahkan Child
router.post('/child-data/:parentId', (req, res) => {
    addChildHandler(req, res);
});

// Mengambil user/parent by id
router.get('/parent-data/:parentId', (req, res) => {
    getParentHandler(req, res);
});

// Mengambil semua child list
router.get('/child-data', (req, res) => {
    getChildsHandler(req, res);
});

// Mengambil child by id
router.get('/child-data/:childId', (req, res) => {
    getChildByIdHandler(req, res);
});


// Edit user/parent
router.put('/parent-data/:parentId', (req, res) => {
    editParentByIdHandler(req, res);
});

// Edit child
router.put('/child-data/:childId', (req, res) => {
    editChildByIdHandler(req, res);
});


// Menghapus child 
router.delete('/child-data/:childId', (req, res) => {
    deleteChildByIdHandler(req, res);
});

module.exports = router;