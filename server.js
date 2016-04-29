var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.post('/api', upload.single('videoFile'), function (req, res) {
  console.log("GOT IT", req.file);

  res.send(200)



});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});