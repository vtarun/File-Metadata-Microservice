var express = require('express');
//const fileupload = require('express-fileupload');
var port = process.env.PORT || 3000	;

var multer = require('multer');
var app = express();

var storage = multer.diskStorage({
	destination : function(req, file, callback){
		callback(null, './uploaded-files');
	},
	filename : function(req, file, callback){
		callback(null, (file.originalname).substring(0,(file.originalname).lastIndexOf('.')) + '-' + Date.now()+(file.originalname).substr((file.originalname).lastIndexOf('.')));
	}
});

var upload = multer({ storage : storage}).single('sampleFile');

app.use(express.static(__dirname + '/'));

app.post('/upload', (req, res) => {	
	upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.send({'size' :req.file.size});
    });	
});

app.listen(port, () => {
	console.log('listening to port 3000')
});