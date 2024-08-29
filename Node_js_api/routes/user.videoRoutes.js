const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');

// Upload video
router.post('/upload', videoController.uploadVideo);

// Stream video
router.get('/stream/:filename', videoController.streamVideo);

// Get all videos
router.get('/list', videoController.getVideos);

module.exports = router;
