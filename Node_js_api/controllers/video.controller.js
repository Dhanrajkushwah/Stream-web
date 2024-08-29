const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Video = require('../models/video.model');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).single('video');

// Upload Video
exports.uploadVideo = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err });
    }

    const newVideo = new Video({ filename: req.file.filename });

    newVideo.save()
      .then(() => res.status(200).json({ message: 'File uploaded successfully!', fileName: req.file.filename }))
      .catch(error => res.status(500).json({ message: 'Error saving file info to database', error }));
  });
};

// Stream Video
exports.streamVideo = (req, res) => {
  const filePath = path.resolve(__dirname, '../uploads', req.params.filename);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const [start, end] = range.replace(/bytes=/, "").split("-").map(Number);
    const chunkSize = (end || fileSize - 1) - start + 1;
    const fileStream = fs.createReadStream(filePath, { start, end: end || fileSize - 1 });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end || fileSize - 1}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    fileStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4", // Ensure this matches the video file type
    });

    fs.createReadStream(filePath).pipe(res);
  }
};

// Get Video List
exports.getVideos = (req, res) => {
  Video.find({})
    .then(videos => res.json(videos))
    .catch(error => res.status(500).json({ message: 'Error fetching videos', error }));
};
