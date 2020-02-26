const PORT = 8080;

const express = require('express');
const app = express();

//View Engine
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Used to receive files from client
var formidable = require('formidable');

//Use to parse CSV files
var csv = require('csv-parser');

//used for file system (create, edit, move, delete files )
var fs = require('fs');

//Basic homepage with form to upload CSV file
app.get('/', (req, res) => {
  	res.render('home');
});

//Start server
app.listen(PORT, () => {
  	console.log('CSV Parser app listening on port ' + PORT);
});

app.post('/fileupload', (req, res) => {

	var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
     	var oldpath = files.filetoupload.path;
     	//Note, the folder must exist before saving to that folder
      	var newpath = './uploads/' + files.filetoupload.name;
      	fs.rename(oldpath, newpath, function (err) {
        	if (err) throw err;
			
			//At this point, the file has been uploaded to the server, and saved in the uploads folder of this project
        	//Next step is to open the file on the server, and parse the information.
        	parseCSV(newpath)

        	//Let user know the file has been uploaded/parsed
        	res.write("Content has been parsed");
    		res.end();
        	
        	
        });
    });
});




function parseCSV(path){
	//Code found on https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
	console.log('parseCSV');

	var fileContent = []
	var i = 0

	//Note, the below code assumes that headers are in the file.
	//ie, the first row are the keys for JSON objects
	fs.createReadStream(path)
  		.pipe(csv())
  			.on('data', (row) => {
  				fileContent.push(row);
  			})
  			//The below code is called when the all rows have been read.
  			//It will call a function to use the data and delete the file
	  		.on('end', () => {
	    		useFileData(fileContent);
	    		deleteFile(path);
	  		});
  	
}

//Use the CSV file data here( ie add to database or do something with the data)
function useFileData(data){
	console.log(JSON.stringify(data)); 
}

//Delete the file after it has been parsed
function deleteFile(path){
	fs.unlinkSync(path);
}

