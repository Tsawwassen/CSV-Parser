//Using code from W3School (https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp)

const PORT = 8080;

const express = require('express');
const app = express();

//View Engine
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Form upload package
var formidable = require('formidable');
var fs = require('fs');

app.get('/', (req, res) => {

  	//Create view for user to upload a CSV file
  	//Parse the uploaded file on the server so that the information can be used

  	res.render('home');
  	
});

app.post('/fileupload', (req, res) => {
	//console.log("inside POST file upload");

	var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
     	var oldpath = files.filetoupload.path;
     	//Note, the folder must exist before saving to that folder
      	var newpath = './uploads/' + files.filetoupload.name;
      	fs.rename(oldpath, newpath, function (err) {
        	if (err) throw err;

        	//At this point, the file has been uploaded to the server, and saved in the uploads folder of this project
        	//Next step is to open the file on the server, and parse the information.
        	parseCSV(newpath);

        	res.write('File uploaded and moved!');
        	res.end();
        });
    });
});

app.listen(PORT, () => {
  	console.log('CSV Parser app listening on port ' + PORT);

});

function parseCSV(path){
	console.log('parseCSV');
}


