const express = require('express');
const router = express.Router();
const controller = require("./controller");
const multer = require("multer");

router.get('/projects', controller.get);
router.post('/projects', multer().none(), controller.store);
router.put('/projects/:id', multer().none(), controller.update);
router.delete('/projects/:id', controller.destroy);

module.exports = router;
