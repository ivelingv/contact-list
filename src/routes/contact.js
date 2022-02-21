const express = require('express');
const controller = require('../controllers/contact');
const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.details);

module.exports = router;