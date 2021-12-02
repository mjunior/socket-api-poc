var express = require('express');
const { newProcessedLine } = require('../controllers/massive.controller');
var router = express.Router();
const { getSocketIO } = require('../socket');

/* GET home page. */
router.post('/', function(req, res, next) {
  io = getSocketIO()
  
  req.body.to.forEach(to => {
    to = req.body.to
    io.to(to).emit(req.body.action, req.body.payload)
  })
  
  res.send('Sending...');
});

module.exports = router;
