//file for handling taking a pic with webcam
var spawn = require('child_process').spawn;
var child = {};

function takePic(){
	child = spawn('fswebcam', ['./images/imageCap.jpg']);
}

takePic();