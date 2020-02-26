//Using code from W3School (https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp)

const PORT = 8080;

const express = require('express');
const app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {


  	
  	//Create view for user to upload a CSV file
  	//Parse the uploaded file on the server so that the information can be used

  	res.render('home');
  	
});

app.listen(PORT, () => {
  	console.log('CSV Parser app listening on port ' + PORT);

});


