'use strict'

const express = require('express');
const EmergencyController = require('../controllers/emergency');

const router = express.Router();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './uploads'});



router.get('/home', EmergencyController.home);
router.get('/test', EmergencyController.test);
router.post('/save-emergency', EmergencyController.saveEmergency);
router.get('/emergency/:id?', EmergencyController.getEmer);
router.get('/emergencies', EmergencyController.getEmergencies);

module.exports = router;        