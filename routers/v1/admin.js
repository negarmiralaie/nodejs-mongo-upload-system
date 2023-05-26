const express = require('express');
const router = express.Router();
const { fileUploadController } = require('../../controllers/v1/index');
const {upload} = require('../../middlewares/upload');
// -------------------------------> END OF IMPORTS <-------------------------------

/* GET home page. */
router.get('/', (req, res) => {
    res.send('Admin home routes');
});

router.post('/upload', upload.array('files'), fileUploadController.create);

module.exports = router;